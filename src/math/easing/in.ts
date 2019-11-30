import { square, cube, pow, pow4 } from "../numeric";

/**
 * "easeInQuad" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quad = square;

/**
 * "easeInCubic" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const cubic = cube;

/**
 * "easeInQuart" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quart = pow4;

/**
 * "easeInExpo" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const expo = (x: number) => (x ? pow(2, 10 * (x - 1)) : 0);

/**
 * Creates a new "easeInBack" function with `coefficient`.
 * @param coefficient Defaults to 1.70158
 * @returns "easeInBack" function.
 */
export const createBack = (coefficient = 1.70158) => (x: number) =>
  x * x * ((coefficient + 1) * x - coefficient);
