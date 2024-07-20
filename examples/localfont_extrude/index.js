/*
 * This is an example JSCAD design that loads a font from a local file system,
 * and then uses the font to extrude text, and saves the result as an STL file.
 */

const stlSerializer = require('@jscad/stl-serializer')
const fs = require('fs')
const { loadFont, extrudeText } = require('../../dist/src/index.js')

function concatenateArrayBuffers(arrayBuffers) {
  // Calculate the total length
  const totalLength = arrayBuffers.reduce((acc, curr) => acc + curr.byteLength, 0);

  // Create a new Uint8Array with the total length
  const result = new Uint8Array(totalLength);

  // Copy each ArrayBuffer into the result
  let offset = 0;
  for (const arrayBuffer of arrayBuffers) {
    result.set(new Uint8Array(arrayBuffer), offset);
    offset += arrayBuffer.byteLength;
  }

  return Buffer.from(result.buffer);
}

const main = async () => {
  // load a font
  // NOTE: Relative paths are relative to where CLI is invoked. If having issues then try a full path.
  let font = loadFont('./fonts/Habana.ttf')
  // Extrude the text 
  let geometry = extrudeText({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!', 50)
  // Convert to an STL
  const rawData = stlSerializer.serialize({binary: true}, [geometry])

  // Concatenate all ArrayBuffers in rawData
  const buffer = concatenateArrayBuffers(rawData);

  const outputFileName = 'test.stl'
  await fs.writeFile(outputFileName, buffer,
    (err) => {
      if (err) {
        console.log('error writing file:', err)
      } else {
        console.log(`success: see ${outputFileName}`)
      }
    }
  )
}

main().then(() => {
  console.log('done')
})
