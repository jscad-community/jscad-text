/**
 * Based on https://3d.hrg.hr/jscad/jscad_text/
 */
import { geometries } from "@jscad/modeling";
import { TextToPathsOptions } from "./textToPaths";
export declare function extrudeText(options: TextToPathsOptions, text: string, height: number): geometries.geom3.Geom3;
