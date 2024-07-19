import { geometries } from "@jscad/modeling";
import { Font } from "opentype.js";
/**
 * Convert the given text to a set of outline paths.
 * @return {[path2]} set of outline paths
 */
interface TextToPathsOptions {
    font: Font;
    fontSize?: number;
    xOffset?: number;
    yOffset?: number;
    fontKerning?: boolean;
    fontHinting?: boolean;
    segments?: number;
    pxPmm?: number;
}
declare const textToPaths: ({ font, fontSize, xOffset, yOffset, fontKerning, fontHinting, segments, pxPmm, }: TextToPathsOptions, text: string) => geometries.path2.Path2[];
export { textToPaths };
