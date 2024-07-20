"use strict";
/**
 * Based on https://3d.hrg.hr/jscad/jscad_text/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extrudeText = extrudeText;
const modeling_1 = require("@jscad/modeling");
const textToPaths_1 = require("./textToPaths");
const { extrudeLinear } = modeling_1.extrusions;
const { subtract, union } = modeling_1.booleans;
// geometry or points array
const isCCW = (points) => {
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
const toSides = (points) => {
    let length = points.length;
    let prevpoint = points[length - 1];
    let out = [];
    for (let i = 0; i < length; i++) {
        const point = points[i];
        out.push([prevpoint, point]);
        prevpoint = point;
    }
    return out;
};
const toSidesInv = (points) => {
    let length = points.length;
    let prevpoint = points[0];
    let out = [];
    for (let i = length - 1; i >= 0; i--) {
        const point = points[i];
        out.push([prevpoint, point]);
        prevpoint = point;
    }
    return out;
};
function extrudeText(options, text, height) {
    let paths = (0, textToPaths_1.textToPaths)(options, text);
    let areas = []; // areas must be each a geom, su union can be made for overlaps
    let holes = [];
    paths.forEach((path) => {
        let { points, transforms } = path;
        if (transforms)
            points = points.map((p) => modeling_1.maths.vec2.transform([0, 0], p, transforms));
        if (isCCW(points)) {
            holes.push(...toSides(points));
        }
        else {
            areas.push(modeling_1.geometries.geom2.create(toSidesInv(points)));
        }
    });
    return extrudeLinear({
        height,
    }, subtract(union(areas), modeling_1.geometries.geom2.create(holes)));
}
