import { path2, colorize, colorNameToRgb, geom2 } from "@jscad/modeling"

const SVGpxPmm = 1 / 0.2822222 // used for scaling SVG coordinates(PX) to JSCAD coordinates(MM)

/**
 * Convert the given text to a set of outline paths.
 *
 * @param {Object} options - options for the conversion
 * @param {Font} options.font] - the font representing a loaded OpenType font file
 * @param {Number} [options.fontSize=14] - size of the text in pixels
 * @param {Number} [options.xOffset=0] - horizontal position of the beginning of the text
 * @param {Number} [options.xOffset=0] - vertical position of the baseline of the text
 * @param {Boolean} [options.fontKerning=true] - if true takes kerning information into account aa
 * @param {Boolean} [options.fontHinting=true] - if true uses TrueType font hinting if available
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {String} text - text of which to convert to outlines
 * @return {Array} list of outline paths, i.e. path2
 *
 * @example
 * const font = await loadWebFont(fontFileUrl, fetchFunc)
 * let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
 */
export const textToPaths = (options = {}, text) => {
  const {
    font,
    fontSize = 14,
    xOffset = 0,
    yOffset = 0, // position of the baseline
    fontKerning = true,
    fontHinting = true,
    segments = 32, // for interpretation to JSCAD paths
    pxPmm = SVGpxPmm, // for interpretation to JSCAD paths
  } = options

  if (!font) throw new Error("font is a required option")

  let pathoptions = {
    kerning: fontKerning,
    hinting: fontHinting,
    features: { liga: false, rlig: false },
  }
  let fontpath = font.getPath(text, xOffset, yOffset, fontSize, pathoptions)

  let pathcolor = [0, 0, 0, 1] // black
  if (fontpath.stroke) {
    pathcolor = colorNameToRgb(fontpath.stroke)
  } else {
    if (fontpath.fill) {
      pathcolor = colorNameToRgb(fontpath.fill)
    }
  }

  let paths = interpretCommands({ pathcolor, segments, pxPmm }, fontpath.commands)
  return paths
}

/**
 * Convert the given text to a geom2 object
 *
 * @param {Object} options - options for the conversion
 * @param {Font} options.font] - the font representing a loaded OpenType font file
 * @param {Number} [options.fontSize=14] - size of the text in pixels
 * @param {Number} [options.xOffset=0] - horizontal position of the beginning of the text
 * @param {Number} [options.xOffset=0] - vertical position of the baseline of the text
 * @param {Boolean} [options.fontKerning=true] - if true takes kerning information into account aa
 * @param {Boolean} [options.fontHinting=true] - if true uses TrueType font hinting if available
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {String} text - text of which to convert to geom2
 * @return {Object} A geom2 object
 *
 * @example
 * const font = await loadWebFont(fontFileUrl, fetchFunc)
 * let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
 */
export const textToGeom2 = (options = {}, text) => pathsToGeom2(textToPaths(options, text));

const interpretCommands = (options, commands) => {
  const { pathcolor, segments, pxPmm } = options
  // Note: All values are SVG values
  let sx = 0 // starting position
  let sy = 0
  let cx = 0 // current position
  let cy = 0
  let pi = 0 // current path index
  let pc = false // current path closed
  let bx = 0 // 2nd control point from previous C command
  let by = 0 // 2nd control point from previous C command
  let qx = 0 // 2nd control point from previous Q command
  let qy = 0 // 2nd control point from previous Q command

  let paths = []
  let path = undefined
  for (let j = 0; j < commands.length; j++) {
    let command = commands[j]
    switch (command.type) {
      case "M": // absolute move to
        if (path) {
          path = path2.close(path)
          if (pathcolor) colorize(pathcolor, path)
          paths.push(path)
        }
        cx = command.x
        cy = command.y
        path = path2.fromPoints({}, [
          [convX(cx, pxPmm), convY(cy, pxPmm)],
        ])
        sx = cx
        sy = cy
        break
      case "L": // absolute line to
        if (cx !== command.x || cy !== command.y) {
          cx = command.x
          cy = command.y
          if (path) {
            path = path2.appendPoints(
              [[convX(cx, pxPmm), convY(cy, pxPmm)]],
              path
            )
          }
        }
        break
      case "C": // absolute cubic Bezier
        let x1 = command.x1
        let y1 = command.y1
        bx = command.x2
        by = command.y2
        cx = command.x
        cy = command.y
        if (path) {
          path = path2.appendBezier(
            {
              controlPoints: [
                [convX(x1, pxPmm), convY(y1, pxPmm)],
                [convX(bx, pxPmm), convY(by, pxPmm)],
                [convX(cx, pxPmm), convY(cy, pxPmm)],
              ],
              segments,
            },
            path
          )
        }
        let rf = reflect(bx, by, cx, cy)
        bx = rf[0]
        by = rf[1]
        break
      case "Q": // absolute quadratic Bezier
        qx = command.x1
        qy = command.y1
        cx = command.x
        cy = command.y
        if (path) {
          path = path2.appendBezier(
            {
              controlPoints: [
                [convX(qx, pxPmm), convY(qy, pxPmm)],
                [convX(cx, pxPmm), convY(cy, pxPmm)],
              ],
              segments,
            },
            path
          )
        }
        let rp = reflect(qx, qy, cx, cy)
        qx = rp[0]
        qy = rp[1]
        break
      case "Z": // close
        if (path) {
          path = path2.close(path)
          if (pathcolor) colorize(pathcolor, path)
          paths.push(path)
          path = undefined
        }
        break
      default:
        console.log(`Warning: unknown command (${j}): ${command}`)
        break
    }
  }
  // Some fonts omit the trailing Z on the last subpath
  if (path) {
    path = path2.close(path);
    if (pathcolor) colorize(pathcolor, path);
    paths.push(path);
  }
  return paths
}

// utility functions for converting SVG coordinates to JSCAD coordinates

const reflect = (x, y, px, py) => {
  let ox = x - px
  let oy = y - py
  if (x === px && y === px) return [x, y]
  if (x === px) return [x, py + -oy]
  if (y === py) return [px + -ox, y]
  return [px + -ox, py + -oy]
}

const convX = (x, units) => {
  return x / units
}

const convY = (y, units) => {
  return 0 - y / units


// Shoelace formula: positive = CCW, negative = CW (in Y-up space)
const signedArea = (points) => {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i][0] * points[j][1];
    area -= points[j][0] * points[i][1];
  }
  return area / 2;
};

// Convert path2 array to a single geom2 that correctly models holes.
// TrueType fonts after the Y-flip produce CW outer contours (negative area);
// JSCAD geom2 expects CCW outers and CW holes, so we detect the convention
// from the largest path and reverse all paths if needed.
const pathsToGeom2 = (paths) => {
  const outlines = paths.map((p) => path2.toPoints(p));
  const areas = outlines.map(signedArea);
  const maxAbsIdx = areas.reduce((mi, a, i) =>
    Math.abs(a) > Math.abs(areas[mi]) ? i : mi, 0);
  const shouldReverse = areas[maxAbsIdx] < 0;

  const allSides = outlines.flatMap((points) => {
    const pts = shouldReverse ? [...points].reverse() : points;
    return pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
  });
  return geom2.create(allSides);
};}

