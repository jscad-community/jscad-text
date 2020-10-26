const opentype = require('./loadOpentype')

const loadFontAsync = (url) => {
  opentype.load(url, (err, font) => {
    if (err) {
      console.alert('font could not be loaded: ' + err)
    } else {
      console.log('font loaded',font)
    }
  })
}

/**
 * Load the font description from the given URL.
 * @param {String} url - URL of remote or local font file
 * @returns {Font} new font object with contents of font available
 */
const loadFont = (url) => {
  if (typeof module === "object" && typeof module.exports === "object") {
    return opentype.loadSync(url)
  }
  console.alert('support for browsers TBD')
}

/**
 * Load the font description from the given data.
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object with contents of font available
 */
const loadFontFromData = (data) => {
  return opentype.parse(data)
}

module.exports = {
  loadFont,
  loadFontAsync,
  loadFontFromData
}
