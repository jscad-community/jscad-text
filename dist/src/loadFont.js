"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFontFromData = exports.loadFont = exports.loadFontAsync = void 0;
const opentype_js_1 = __importDefault(require("opentype.js"));
const loadFontAsync = (url) => {
    opentype_js_1.default.load(url, (err, font) => {
        if (err) {
            console.error("font could not be loaded: " + err);
        }
        else {
            console.log("font loaded", font);
        }
    });
};
exports.loadFontAsync = loadFontAsync;
/**
 * Load the font description from the given URL.
 * @param {String} url - URL of remote or local font file
 * @returns {Font} new font object with contents of font available
 */
const loadFont = (url) => {
    return opentype_js_1.default.loadSync(url);
};
exports.loadFont = loadFont;
/**
 * Load the font description from the given data.
 * @param {ArrayBuffer} data - raw data from font file
 * @returns {Font} new font object with contents of font available
 */
const loadFontFromData = (data) => {
    return opentype_js_1.default.parse(data);
};
exports.loadFontFromData = loadFontFromData;
