import test from "ava"

import { geom2 } from "@jscad/modeling"

import { textToGeom2 } from "../src/index.js"

const createMockFont = (commands) => ({
  getPath: () => ({
    commands,
    fill: "black",
  }),
})

test("textToGeom2 builds a geom2 from an unclosed contour", (t) => {
  const font = createMockFont([
    { type: "M", x: 0, y: 0 },
    { type: "L", x: 10, y: 0 },
    { type: "L", x: 10, y: 10 },
    { type: "L", x: 0, y: 10 },
  ])

  const geometry = textToGeom2({ font }, "A")

  t.true(geom2.isA(geometry))
  t.is(geom2.toSides(geometry).length, 8)
  // geom2.toSides() returns each edge twice (forward and reverse), so a square with 4 sides results in 8 entries.
})

test("textToGeom2 supports multiple unclosed contours", (t) => {
  const font = createMockFont([
    { type: "M", x: 0, y: 0 },
    { type: "L", x: 12, y: 0 },
    { type: "L", x: 12, y: 12 },
    { type: "L", x: 0, y: 12 },
    { type: "M", x: 4, y: 4 },
    { type: "L", x: 8, y: 4 },
    { type: "L", x: 8, y: 8 },
    { type: "L", x: 4, y: 8 },
  ])

  const geometry = textToGeom2({ font }, "O")

  t.true(geom2.isA(geometry))
  t.is(geom2.toSides(geometry).length, 16)
})
