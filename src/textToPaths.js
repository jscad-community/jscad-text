import {
  path2,
  colorize,
  colorNameToRgb,
  measureAggregateBoundingBox,
  translate,
} from "@jscad/modeling"

/**
 * Convert the given text to a set of outline paths using the given options.
 *
 * The paths are created based on the original Font glyphs, and scaled to the fontSize.
 *
 * The paths may or may not be closed. See textToGeom2 for additional options.
 *
 * @see Font.getPath() at https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options
 *
 * @param {Object} options - options for the conversion
 * @param {Font} options.font] - the font representing a loaded OpenType font file
 * @param {Number} [options.fontSize=72] - size of the text in pixels
 * @param {Object} [options.fontOptions={}] - options passed through to Font.getPath(),
 *   e.g. kerning, features (liga, rlig, etc.), hinting. The opentype.js defaults apply.
 *   See https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options
 *   Note: hinting is only needed for rasterization from vector data; it should not be
 *   needed for vector output such as JSCAD paths.
 * @param {Array} [options.center=[false, false]] - centering options for the X and Y axes;
 *   true, false, or the center coordinate in mm. Y centering is based on the font cap height.
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Boolean} [options.forceClose=false] - force closure of paths, as some fonts do not
 * @param {String} text - text of which to convert to outlines
 * @return {Array} list of outline paths, i.e. Path2
 *
 * @example
 * const font = await loadWebFont(fontFileUrl, fetchFunc)
 * let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
 */
export const textToPaths = (options = {}, text) => {
  const {
    font,
    fontSize = 72,
    fontOptions = {}, // passed through to Font.getPath()
    center: centerOption = [false, false],
    segments = 32, // for interpretation to JSCAD paths
    forceClose = false, // for interpretation to JSCAD paths
    pxPmm = 1, // pixels per millimeter, used for interpretation to JSCAD paths
  } = options

  if (!font) throw new Error("font is a required option")

  let baseline = 0;
  if (centerOption[1] !== false) {
    // Center based on font cap height
    const capHeight = (getCapHeight(font) * fontSize) / font.unitsPerEm
    baseline += capHeight / -2 + (centerOption[1] === true ? 0 : Number(centerOption[1]))
  }

  // svg coordinates and JSCAD coordinates are flipped on the Y axis
  let fontpath = font.getPath(text, 0, -baseline, fontSize, fontOptions)

  let pathcolor = [0, 0, 0, 1] // black
  if (fontpath.stroke) {
    pathcolor = colorNameToRgb(fontpath.stroke)
  } else {
    if (fontpath.fill) {
      pathcolor = colorNameToRgb(fontpath.fill)
    }
  }

  let paths = interpretCommands({ pathcolor, segments, forceClose, pxPmm }, fontpath.commands)

  if (centerOption[0] !== false && paths.length > 0) {
    const relativeTo = centerOption[0] === true ? 0 : Number(centerOption[0])
    // center() centers each geometry individually, so translate all paths as a group
    const bounds = measureAggregateBoundingBox(paths)
    const offset = relativeTo - (bounds[0][0] + bounds[1][0]) / 2
    paths = paths.map((path) => translate([offset, 0, 0], path))
  }
  return paths
}

const getCapHeight = (font) => {
  const os2CapHeight = font.tables?.os2?.sCapHeight;
  if (Number.isFinite(os2CapHeight)) return os2CapHeight;

  // fallback: measure uppercase H
  const glyph = font.charToGlyph("H");
  if (glyph && Number.isFinite(glyph.yMax)) return glyph.yMax;

  // last fallback
  return font.ascender;
}

const interpretCommands = (options, commands) => {
  const { pathcolor, segments, forceClose, pxPmm } = options
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
          if (forceClose) path = path2.close(path)
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
    if (forceClose) path = path2.close(path);
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
}
