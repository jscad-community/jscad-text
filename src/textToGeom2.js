import { geom2, path2 } from "@jscad/modeling"
import { textToPaths } from "./textToPaths.js"
/**
 * Convert the given text to a geom2 object.
 *
 * The paths are created based on the original Font glyphs, and scaled to the fontSize.
 *
 * @see Font.getPath() at https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options
 *
 * @param {Object} options - options for the conversion
 * @param {Font} options.font] - the font representing a loaded OpenType font file
 * @param {Number} [options.fontSize=72] - size of the text in pixels
 * @param {Object} [options.fontOptions={}] - options passed through to Font.getPath(),
 *   e.g. kerning, features (liga, rlig, etc.), hinting. The opentype.js defaults apply.
 *   See https://github.com/opentypejs/opentype.js#fontgetpathtext-x-y-fontsize-options
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.center=[true, true]] - centering options for the X and Y axes;
 *   true, false, or the center coordinate in mm. Y centering is based on the font cap height.
 * @param {String} text - text of which to convert to geom2
 * @return {Object} A geom2 object
 *
 * @example
 * const font = await loadWebFont(fontFileUrl, fetchFunc)
 * let paths = textToGeom2({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')
 */
export const textToGeom2 = (options = {}, text) => {
  const { font, fontSize, fontOptions, center = [true, true], segments } = options;
  const paths = textToPaths({ font, fontSize, fontOptions, center, segments, forceClose: true }, text);
  return pathsToGeom2(paths);
};

// Shoelace formula: positive = CCW, negative = CW (in Y-up space)
const signedArea = (points) => {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i][0] * points[j][1];
    area -= points[j][0] * points[i][1];
  }
  return area / 2;
};

// Convert path2 array to a single geom2 that correctly models holes.
// TrueType fonts after the Y-flip produce CW outer contours (negative area);
// JSCAD geom2 expects CCW outers and CW holes, so we detect the convention
// from the largest path and reverse all paths if needed.
const pathsToGeom2 = (paths) => {
  const outlines = paths.map((p) => path2.toPoints(p));
  const areas = outlines.map(signedArea);
  const maxAbsIdx = areas.reduce((mi, a, i) =>
    Math.abs(a) > Math.abs(areas[mi]) ? i : mi, 0);
  const shouldReverse = areas[maxAbsIdx] < 0;

  const allSides = outlines.flatMap((points) => {
    const pts = shouldReverse ? [...points].reverse() : points;
    return pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
  });
  return geom2.create(allSides);
};
