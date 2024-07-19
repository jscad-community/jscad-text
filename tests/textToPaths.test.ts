import test from "ava";
import { geometries } from "@jscad/modeling";
import { loadFont, textToPaths } from "../src";

test("textToPaths (japanese)", (t) => {
  t.pass();
  let font = loadFont("./examples/localfont/fonts/Habana.ttf");
  let paths = textToPaths({ font }, "JSCAD Rocks!");
  t.is(paths.length, 15);

  let path3 = paths[3];
  let pts = geometries.path2.toPoints(path3);

  t.is(pts.length, 39);
});
