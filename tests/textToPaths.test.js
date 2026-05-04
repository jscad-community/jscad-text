import test from "ava"

import { path2 } from "@jscad/modeling"

import { loadFont, textToPaths } from "../src/index.js"

test("textToPaths", (t) => {
  let font = loadFont("./examples/localfont/fonts/Habana.ttf")
  let paths = textToPaths({ font }, "JSCAD Rocks!")
  t.is(paths.length, 14)

  let path3 = paths[3]
  let pts = path2.toPoints(path3)

  t.is(pts.length, 39)
})
