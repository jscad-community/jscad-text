import fs from 'fs'

import opentype from "opentype.js"

/**
 * Load the font description from the given file path.
 * @param {String} path - path to local file, i.e. font
 * @returns {Font} new font object which contains the contents of the font
 */
export const loadFont = (path) => {
  return opentype.parse(fs.readFileSync(path))
}

/**
 * Load the font description from the given data.
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object which contains the contents of the font
 */
export const loadFontFromData = (data) => {
  return opentype.parse(data)
}
