import opentype from "opentype.js";

export const loadFontAsync = (url: string) => {
  opentype.load(url, (err, font) => {
    if (err) {
      console.error("font could not be loaded: " + err);
    } else {
      console.log("font loaded", font);
    }
  });
};

/**
 * Load the font description from the given URL.
 * @param {String} url - URL of remote or local font file
 * @returns {Font} new font object with contents of font available
 */
export const loadFont = (url: string) => {
  return opentype.loadSync(url);
};

/**
 * Load the font description from the given data.
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object with contents of font available
 */
export const loadFontFromData = (data: ArrayBuffer) => {
  return opentype.parse(data);
};
