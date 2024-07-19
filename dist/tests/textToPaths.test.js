"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const modeling_1 = require("@jscad/modeling");
const src_1 = require("../src");
(0, ava_1.default)("textToPaths (japanese)", (t) => {
    t.pass();
    let font = (0, src_1.loadFont)("./examples/localfont/fonts/Habana.ttf");
    let paths = (0, src_1.textToPaths)({ font }, "JSCAD Rocks!");
    t.is(paths.length, 15);
    let path3 = paths[3];
    let pts = modeling_1.geometries.path2.toPoints(path3);
    t.is(pts.length, 39);
});
