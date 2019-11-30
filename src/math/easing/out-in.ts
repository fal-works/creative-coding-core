import { integrate } from "./composite";
import * as In from "./in";
import * as Out from "./out";

/**
 * "easeOutInQuad" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quad = integrate(Out.quad, In.quad);

/**
 * "easeOutInCubic" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const cubic = integrate(Out.cubic, In.cubic);

/**
 * "easeOutInQuart" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quart = integrate(Out.quart, In.quart);

/**
 * "easeOutInExpo" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const expo = integrate(Out.expo, In.expo);

/**
 * Creates a new "easeOutInBack" function with `coefficient`.
 * @param coefficient Defaults to 1.70158
 * @returns "easeOutInBack" function.
 */
export const createBack = (coefficient: number) =>
  integrate(Out.createBack(coefficient), In.createBack(coefficient));
