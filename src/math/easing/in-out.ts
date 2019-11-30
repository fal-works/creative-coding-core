import { integrate } from "./composite";
import * as In from "./in";
import * as Out from "./out";

/**
 * "easeInOutQuad" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quad = integrate(In.quad, Out.quad);

/**
 * "easeInOutCubic" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const cubic = integrate(In.cubic, Out.cubic);

/**
 * "easeInOutQuart" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const quart = integrate(In.quart, Out.quart);

/**
 * "easeInOutExpo" function.
 * @param x Any ratio.
 * @returns Eased ratio. `0` if x=0, `1` if x=1.
 */
export const expo = integrate(In.expo, Out.expo);

/**
 * Creates a new "easeInOutBack" function with `coefficient`.
 * @param coefficient Defaults to 1.70158
 * @returns "easeInOutBack" function.
 */
export const createBack = (coefficient: number) =>
  integrate(In.createBack(coefficient), Out.createBack(coefficient));
