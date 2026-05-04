import { loadFontFromData } from './loadFont.js'

// Google Fonts information
// See https://developers.google.com/fonts/
const apiKey = 'AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc';
const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

/*
 * Select a font and a variant from the given font list.
 *
 * Note: Uncomment the console statements to see the list of families, etc.
 */
const selectFont = (choice, variant, fontList) => {
  const family = fontList.items.find((item) => item.family === choice)
  //console.log(family)

  const files = family.files
  console.log('font variants(files)', files)
  const fontUrl = files[variant]
  if (!fontUrl) {
    console.table(files)
    throw new ReferenceError(`Variant not found; ${variant}`)
  }
  //console.log('font url', fontUrl)
  return fontUrl
}

/*
 * This is the main processing, which is asycronous (waiting is required).
 * This is required due to the fetching of data across the internet via HTTP protocols.
 *
 * Nothing is ever easy.
 */
export const loadGoogleFont = async (family, variant, fetch) => {
  // fetch the list of families, variants, etc.
  const response = await fetch(apiUrl)
  const fontList = await response.json()
  // console.log(fontList)

  // choose one of the fonts from the list (see above)
  const fontUrl = selectFont(family, variant, fontList)
  //console.log(fontUrl)

  // fetch the font (raw data)
  const response2 = await fetch(fontUrl)
  // console.log(response2)
  const fontData = await response2.arrayBuffer()
  // console.log(fontData)

  // convert the data received to FONT information
  const font = loadFontFromData(fontData)
  //console.log(font)

  return font
}
