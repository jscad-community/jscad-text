const opentype = require('opentype.js')

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
 */
const loadFont = (url) => {
  if (typeof module === "object" && typeof module.exports === "object") {
    return opentype.loadSync(url)
  }
  console.alert('support for browsers TBD')
}

module.exports = {
  loadFont,
  loadFontAsync
}
