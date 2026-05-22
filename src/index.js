/**
 * Create Outlines of Text using TTF fonts
 *
 * The JSCAD project does not provide the ability to use TTF fonts when creating outlines of text (It only supports SIMPLEX fonts.)
 * Therefore, a special set of functionality has been created to suppliment JSCAD.
 *
 * @license MIT
 * @namespace jscad-text
 */
export * from "./textToPaths.js";
export * from "./textToGeom2.js";
export * from "./loadFont.js";
export * from "./loadGoogleFont.js";
export * from "./loadWebFont.js";
