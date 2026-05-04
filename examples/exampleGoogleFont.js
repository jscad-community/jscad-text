import { loadGoogleFont, textToPaths } from '../src/index.js'

// errors
//const family = 'Roboto';
//const variant = '300';

//const family = 'Tangerine';
//const variant = 'regular';

//const family = 'Open Sans';
//const variant = '300';

//const family = 'Bpmf Iansui';
//const variant = 'regular';

const family = 'Zen Tokyo Zoo';
const variant = 'regular';

export const main = async () => {
  // determine which version of fetch to use
  const fetchFunc = typeof fetch === 'function' ? fetch : (await import('node-fetch')).default;

  // load the font from Google
  const font = await loadGoogleFont(family, variant, fetchFunc)

  // use the font to convert text to outline paths
  let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
  console.log(paths)

  return paths
}

main()
