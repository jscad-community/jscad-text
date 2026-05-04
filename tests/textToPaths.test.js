import test from "ava"

import fetch from 'node-fetch'

import { path2 } from "@jscad/modeling"

import { loadFont, loadGoogleFont, textToPaths } from "../src/index.js"

test("textToPaths (local)", (t) => {
  let font = loadFont("./examples/localfont/fonts/Habana.ttf")
  let paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 14)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 39)
})

test("textToPaths (google)", async (t) => {
  const family = 'Open Sans';
  const variant = '300';

  const font = await loadGoogleFont(family, variant, fetch)

  const paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 15)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 8)
})

