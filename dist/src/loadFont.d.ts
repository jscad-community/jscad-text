import opentype from "opentype.js";
export declare const loadFontAsync: (url: string) => void;
/**
 * Load the font description from the given URL.
 * @param {String} url - URL of remote or local font file
 * @returns {Font} new font object with contents of font available
 */
export declare const loadFont: (url: string) => opentype.Font;
/**
 * Load the font description from the given data.
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object with contents of font available
 */
export declare const loadFontFromData: (data: ArrayBuffer) => opentype.Font;
