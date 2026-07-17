import { loadFontFromData } from './loadFont.js'

/**
 * Load the font from a website using the given URL.
 *
 * This function is asycronous, and fetchs the data via the given fetch function.
 * This is required due to the fetching of data across the internet via HTTP protocols.
 *
 * @param {String} fontUrl - URL of font file to load
 * @param {Function} fetch - function to use for fetching the font from Google
 * @returns {Font} new font object which contains the contents of the font
 *
 * @example
 * // see the examples for additional information
 * const fontUrl = "http://72.62.112.88/v3/docs/fonts/Montserrat/Montserrat-Regular.ttf"
 * const font = await loadWebFont(fontUrl, fetchFunc)
 */
export const loadWebFont = async (fontUrl, fetch) => {
  // fetch the font (raw data)
  const response = await fetch(fontUrl)
  // console.log(response)
  const fontData = await response.arrayBuffer()
  // console.log(fontData)

  // convert the data received to FONT information
  const font = loadFontFromData(fontData)
  //console.log(font)

  return font
}
