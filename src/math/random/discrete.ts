import { floor } from "./../numeric";
import { PI, TWO_PI } from "../../geometry/angle";
import { random } from "./base";

/**
 * Returns a random value at intervals of `step` from `0` up to (but not including) `1`.
 * @param step - E.g. if `0.25`, the result is either `0`, `0.25`, `0.5` or `0.75`.
 * @returns A random value.
 */
export const ratio = (step: number) => floor(random() / step) * step;

/**
 * Returns a random value at intervals of `step` from `0` up to (but not including) `max`.
 * @param step
 * @param max
 * @returns A random value.
 */
export const value = (step: number, max: number) =>
  floor(random() * (max / step)) * step;

/**
 * Returns a random value at intervals of `step` from `min` up to (but not including) `max`.
 * @param step
 * @param min
 * @param max
 * @returns A random value.
 */
export const between = (step: number, min: number, max: number) =>
  min + floor(random() * ((max - min) / step)) * step;

/**
 * Returns a positive or negative value randomly at intervals of `step`
 * with a magnitude from `0` up to (but not including) `maxMagnitude`.
 * @param step
 * @param maxMagnitude
 * @returns A random signed value.
 */
export const signed = (step: number, maxMagnitude: number) =>
  (random() < 0.5 ? 1 : -1) * floor(random() * (maxMagnitude / step)) * step;

/**
 * Returns a random value at intervals of `step` from `0` to (but not including) `2 * PI`.
 * @param step - Interval angle.
 * @returns A random radians value.
 */
export const angle = (step: number) => floor(random() * (TWO_PI / step)) * step;

/**
 * Returns a positive or negative value randomly at intervals of `step`
 * with a magnitude from `0` up to (but not including) `PI`.
 * @param step - Interval angle.
 * @returns A random signed radians value.
 */
export const signedAngle = (step: number) =>
  (random() < 0.5 ? 1 : -1) * floor(random() * (PI / step)) * step;
