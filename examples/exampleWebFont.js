import { loadWebFont, textToPaths } from '../src/index.js'

const fontFileUrl = "http://72.62.112.88/v3/docs/fonts/Montserrat/Montserrat-Regular.ttf"

export const main = async () => {
  // determine which version of fetch to use
  const fetchFunc = typeof fetch === 'function' ? fetch : (await import('node-fetch')).default;

  // load the font from Google
  const font = await loadWebFont(fontFileUrl, fetchFunc)

  // use the font to convert text to outline paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
  // console.log(paths)

  return paths
}

console.log(main())
