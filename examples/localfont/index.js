const { transforms, colors } = require('@jscad/modeling')

const { loadFont, textToPaths } = require('../../dist/src/index.js')

/*
 * This is an example JSCAD design that loads a font from a local file system,
 * and then uses the font to create 2D paths.
 *
 * The paths can be converted to SVG, DXF, or JSON using the CLI options.
 * See package.json
 */
const main = () => {
  // load a font
  // NOTE: Relative paths are relative to where CLI is invoked. If having issues then try a full path.
  let font = loadFont('./fonts/Habana.ttf')
  // convert text to 2D paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
  // Color in the paths
  paths = colors.colorize([0, 0, 0], paths)
  // adjust the paths
  paths = transforms.rotate([0, 0, Math.PI/4], paths)

  return paths
}

module.exports = {main}
