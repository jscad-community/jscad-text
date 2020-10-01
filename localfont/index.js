const { transforms } = require('@jscad/modeling')

// FIXME create a file system link to use the following require path
//   ln -s ../../jscad-text ./jscad-text
const { loadFont, textToPaths } = require('./jscad-text')

/*
 * This is an example JSCAD design that loads a font from a local file system,
 * and then uses the font to create 2D paths.
 *
 * The paths can be converted to SVG, DXF, or JSON using the CLI options.
 */
const main = () => {
  // load a font
  // NOTE: Relative paths are relative to where CLI is invoked. If having issues then try a full path.
  let font = loadFont('./localfont/fonts/Habana.ttf')
  // convert text to 2D paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
  // adjust the paths
  paths = transforms.rotate([0, 0, Math.PI/4], paths)
  return paths
}

module.exports = {main}
