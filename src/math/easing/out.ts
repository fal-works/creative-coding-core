import { square, cube, pow, pow4 } from "../numeric";

/**
 * "easeOutQuad" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quad = (x: number) => -square(x - 1) + 1;

/**
 * "easeOutCubic" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const cubic = (x: number) => cube(x - 1) + 1;

/**
 * "easeOutQuart" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quart = (x: number) => -pow4(x - 1) + 1;

/**
 * "easeOutExpo" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const expo = (x: number) => (x < 1 ? -pow(2, -10 * x) + 1 : 1);

/**
 * Creates a new "easeOutBack" function with `coefficient`.
 * @param coefficient Defaults to 1.70158
 * @returns "easeOutBack" function.
 */
export const createBack = (coefficient = 1.70158) => {
  return (x: number) => {
    const r = x - 1;
    const r2 = r * r;
    return (coefficient + 1) * (r * r2) + coefficient * r2 + 1;
  };
};
