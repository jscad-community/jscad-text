const fs = require('fs')
const fetch = require('node-fetch');
const opentype = require('opentype.js');
const { transforms, colors } = require('@jscad/modeling');
const { solidsAsBlob } = require('@jscad/io');
const { textToPaths } = require('../../dist/src/index.js')

// Google Fonts information
// See https://developers.google.com/fonts/
const apiKey = 'AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc';
const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

const familyChoice = 'Roboto';
const familyVariant = '300';

/*
 * Select a font and a variant from the given font list.
 *
 * Note: Uncomment the console statements to see the list of families, etc.
 */
const selectFont = (fontList) => {
  const family = fontList.items.find((item) => item.family === familyChoice)
  // console.log(family)

  const files = family.files
  // console.log('font variants(files)', fontUrl)
  const fontUrl = files[familyVariant]
  // console.log('font url', fontUrl)
  return fontUrl
}

/*
 * This is the main processing, which is asycronous (waiting is required).
 * This is required due to the fetching of data across the internet via HTTP protocols.
 *
 * Nothing is ever easy.
 */
(async () => {
  // fetch the list of families, variants, etc.
  const response = await fetch(apiUrl)
  const fontList = await response.json()
  // console.log(fontList)

  // choose one of the fonts from the list (see above)
  const fontUrl = selectFont(fontList)

  // fetch the font (raw data)
  const response2 = await fetch(fontUrl)
  const fontData = await response2.buffer()

  // convert the data received to FONT information
  const font = opentype.parse(fontData.buffer)
  // console.log(font)

  // convert text to outline paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')

  // adjust the paths
  paths = transforms.rotate([0, 0, Math.PI/4], paths)

  // Color the paths
  paths = colors.colorize([0, 0, 0], paths);

  // convert the paths to SVG
  const outputData = solidsAsBlob(paths, {format: 'svg'})
  //console.log(outputData)

  // write the data to file
  const outputFileName = 'test.svg'
  await fs.writeFile(outputFileName, outputData.asBuffer(),
    (err) => {
      if (err) {
        console.log('error writing file:', err)
      } else {
        console.log(`success: see ${outputFileName}`)
      }
    }
  )
})();
