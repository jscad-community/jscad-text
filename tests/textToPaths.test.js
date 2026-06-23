import test from "ava"

import fetch from 'node-fetch'

import { path2 } from "@jscad/modeling"

import { loadFont, loadGoogleFont, loadWebFont, textToPaths } from "../src/index.js"

test("textToPaths (local)", (t) => {
  // closed glyphs
  let font = loadFont("./examples/localfont/fonts/Habana.ttf")
  let paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 15)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 39)

  // single outline glyphs
  font = loadFont("./examples/localfont/fonts/QuicklyReplacedSingleLine-rgZXL.ttf")
  paths = textToPaths({ font, forceClose: false }, "J")
  t.is(paths.length, 1)

  let path0 = paths[0]
  t.true(path0.isClosed)

  pts = path2.toPoints(path0)
  t.is(pts.length, 133)
})

test("textToPaths: yOffset shifts Y up in JSCAD space (SVG Y-axis flip)", (t) => {
  // SVG Y increases downward, JSCAD Y increases upward.
  // textToPaths passes -yOffset to font.getPath and negates Y in convY,
  // so a positive yOffset must move all path points up (higher Y in JSCAD).
  let font = loadFont("./examples/localfont/fonts/Habana.ttf")
  const delta = 50

  let paths0 = textToPaths({ font, yOffset: 0 }, "I")
  let pathsD = textToPaths({ font, yOffset: delta }, "I")

  t.is(paths0.length, pathsD.length, "same number of paths")

  for (let i = 0; i < paths0.length; i++) {
    let pts0 = path2.toPoints(paths0[i])
    let ptsD = path2.toPoints(pathsD[i])
    t.is(pts0.length, ptsD.length, `path ${i}: same point count`)
    for (let j = 0; j < pts0.length; j++) {
      t.is(pts0[j][0], ptsD[j][0], `path ${i} point ${j}: X unchanged`)
      t.is(Math.round(ptsD[j][1] - pts0[j][1]), delta, `path ${i} point ${j}: Y shifted up by yOffset`)
    }
  }
})

test("textToPaths (google)", async (t) => {
  const family = 'Open Sans';
  const variant = '300';

  const font = await loadGoogleFont(family, variant, fetch)

  const paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 16)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 8)
})

test("textToPaths (web)", async (t) => {
  const fontFileUrl = "http://72.62.112.88/v3/docs/fonts/Montserrat/Montserrat-Regular.ttf"

  const font = await loadWebFont(fontFileUrl, fetch)

  const paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 16)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 8)
})
