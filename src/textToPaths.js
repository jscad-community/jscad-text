const opentype = require('./loadOpentype')

const { colors, geometries } = require('@jscad/modeling')

const SVGpxPmm = 1 / 0.2822222 // used for scaling SVG coordinates(PX) to JSCAD coordinates(MM)

/**
 * Convert the given text to a set of outline paths.
 * @return {[path2]} set of outline paths
 */
const textToPaths = (options, text) => {
  const defaults = {
    font: undefined,
    fontSize: 14,
    xOffset: 0,
    yOffset: 0, // position of the baseline
    fontKerning: true,
    fontHinting: true,
    segments: 32, // for interpretation to JSCAD paths
    pxPmm: SVGpxPmm // for interpretation to JSCAD paths
  }
  let {font, fontSize, xOffset, yOffset, fontKerning, fontHinting, segments, pxPmm} = Object.assign({}, defaults, options)

  if (!font) throw new Error('font is a required option')

  let pathoptions = {
    kerning: fontKerning,
    hinting: fontHinting,
    features: {liga: false, rlig: false}
  }
  let fontpath = font.getPath(text, xOffset, yOffset, fontSize, pathoptions)

  let pathcolor = [0, 0, 0, 1] // black
  if (fontpath.stroke) {
    pathcolor = colors.colorNameToRgb(fontpath.stroke)
  } else {
    if (fontpath.fill) {
      pathcolor = colors.colorNameToRgb(fontpath.fill)
    }
  }

  let paths = interpretCommands({pathcolor, segments, pxPmm}, fontpath.commands)
  return paths
}

const interpretCommands = (options, commands) => {
  let {pathcolor, segments, pxPmm} = options

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
  let path = null
  for (let j = 0; j < commands.length; j++) {
    let command = commands[j]
    let type = command.type
    switch (type) {
      case 'M': // absolute move to
        if (path) {
          path = geometries.path2.close(path)
          if (pathcolor) color.color(pathcolor, path)
          paths.push(path)
        }
        cx = command.x
        cy = command.y
        path = geometries.path2.fromPoints({}, [[convX(cx, pxPmm), convY(cy, pxPmm)]])
        sx = cx; sy = cy
        break
      case 'L': // absolute line to
        if (cx !== command.x || cy !== command.y) {
          cx = command.x
          cy = command.y
          path = geometries.path2.appendPoints([[convX(cx, pxPmm), convY(cy, pxPmm)]], path)
        }
        break
      case 'C': // absolute cubic Bezier
        let x1 = command.x1
        let y1 = command.y1
        bx = command.x2
        by = command.y2
        cx = command.x
        cy = command.y
        path = geometries.path2.appendBezier({controlPoints: [[convX(x1, pxPmm), convY(y1, pxPmm)], [convX(bx, pxPmm), convY(by, pxPmm)], [convX(cx, pxPmm), convY(cy, pxPmm)]], segments}, path)
        let rf = reflect(bx, by, cx, cy)
        bx = rf[0]
        by = rf[1]
        break
      case 'Q': // absolute quadratic Bezier
        qx = command.x1
        qy = command.y1
        cx = command.x
        cy = command.y
        path = geometries.path2.appendBezier({controlPoints: [[convX(qx, pxPmm), convY(qy, pxPmm)], [convX(cx, pxPmm), convY(cy, pxPmm)]], segments}, path)
        let rp = reflect(qx, qy, cx, cy)
        qx = rp[0]
        qy = rp[1]
        break
      case 'Z': // close
        if (path) {
          path = geometries.path2.close(path)
          if (pathcolor) colors.colorize(pathcolor, path)
          paths.push(path)
          path = null
        }
        break
      default:
        console.log(`Warning: unknown command (${j}): ${type}`)
        break
    }
  }
  return paths
}

// utility functions for converting SVG coordinates to JSCAD coordinates

const reflect = (x, y, px, py) => {
  let ox = x - px
  let oy = y - py
  if (x === px && y === px) return [x, y]
  if (x === px) return [x, py + (-oy)]
  if (y === py) return [px + (-ox), y]
  return [px + (-ox), py + (-oy)]
}

const convX = (x, units) => {
  return (x / units)
}

const convY = (y, units) => {
  return 0 - (y / units)
}

module.exports = textToPaths
