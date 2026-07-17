import fs from 'fs'

// import the ESM build directly: the bare "opentype.js" specifier resolves to
// the CJS build in Node but the ESM build in Rollup, with incompatible exports
import { parse } from 'opentype.js/dist/opentype.mjs'

/**
 * Load the font description from the given file path.
 *
 * @param {String} path - path to local file, i.e. font
 * @returns {Font} new font object which contains the contents of the font
 *
 * @example
 * const filePath = "./fonts/Habana.ttf"
 * const font = loadFont(filePath)
 */
export const loadFont = (path) => {
  return parse(fs.readFileSync(path))
}

/**
 * Load the font description from the given data.
 *
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object which contains the contents of the font
 *
 * @example
 * const fontData = await response.arrayBuffer()
 * const font = loadFontFromData(fontData)
 */
export const loadFontFromData = (data) => {
  return parse(data)
}
