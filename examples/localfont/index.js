import { colorize, rotate } from '@jscad/modeling'

import { loadFont, textToPaths } from '../../src/index.js'

/*
 * This is an example JSCAD design that loads a font from a local file system,
 * and then uses the font to create 2D paths.
 */
export const main = () => {
  // load a font
  // NOTE: Relative paths are relative to where CLI is invoked. If having issues then try a full path.
  let font = loadFont('./fonts/Habana.ttf')
  // convert text to 2D paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
  // color in the paths
  // paths = colorize([0, 0, 0], paths)
  // adjust the paths
  paths = rotate([0, 0, Math.PI/4], paths)
  console.log(paths)

  return paths
}

main()
