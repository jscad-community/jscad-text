/**
 * Based on https://3d.hrg.hr/jscad/jscad_text/
 */

import { extrusions, geometries, maths, booleans } from "@jscad/modeling";
import { textToPaths, TextToPathsOptions } from "./textToPaths";

const { extrudeLinear } = extrusions;
const { subtract, union } = booleans;

// geometry or points array
const isCCW = (points: maths.vec2.Vec2[]) => {
  let area = 0;
  let j;
  const length = points.length;
  points.forEach((v, i) => {
    j = (i + 1) % length;
    area += v[0] * points[j][1];
    area -= points[j][0] * v[1];
  });

  return area >= 0;
};

const toSides = (points: maths.vec2.Vec2[]) => {
  let length = points.length;
  let prevpoint = points[length - 1];
  let out: [maths.vec2.Vec2, maths.vec2.Vec2][] = [];
  for (let i = 0; i < length; i++) {
    const point = points[i];
    out.push([prevpoint, point]);
    prevpoint = point;
  }
  return out;
};

const toSidesInv = (points: maths.vec2.Vec2[]) => {
  let length = points.length;
  let prevpoint = points[0];
  let out: [maths.vec2.Vec2, maths.vec2.Vec2][] = [];
  for (let i = length - 1; i >= 0; i--) {
    const point = points[i];
    out.push([prevpoint, point]);
    prevpoint = point;
  }
  return out;
};

export function extrudeText(
  options: TextToPathsOptions,
  text: string,
  height: number
) {
  let paths = textToPaths(options, text);
  let areas: geometries.geom2.Geom2[] = []; // areas must be each a geom, su union can be made for overlaps
  let holes: [maths.vec2.Vec2, maths.vec2.Vec2][] = [];

  paths.forEach((path) => {
    let { points, transforms } = path;
    if (transforms)
      points = points.map((p) => maths.vec2.transform([0, 0], p, transforms));
    if (isCCW(points)) {
      holes.push(...toSides(points));
    } else {
      areas.push(geometries.geom2.create(toSidesInv(points)));
    }
  });

  return extrudeLinear(
    {
      height,
    },
    subtract(union(areas), geometries.geom2.create(holes))
  );
}
