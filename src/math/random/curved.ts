import { Range } from "../../types/range";
import { PI, TWO_PI } from "../../geometry/angle";
import { random } from "./base";

/**
 * Similar to `ratio()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @returns A random value.
 */
export const ratio = (curve: (ratio: number) => number) => curve(random());

/**
 * Similar to `value()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param magnitude
 * @returns A random value.
 */
export const value = (curve: (ratio: number) => number, magnitude: number) =>
  curve(random()) * magnitude;

/**
 * Similar to `between()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param start
 * @param end
 * @returns A random value.
 */
export const between = (
  curve: (x: number) => number,
  start: number,
  end: number
) => start + curve(random()) * (end - start);

/**
 * Similar to `inRange()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param range
 * @returns A random value.
 */
export const inRange = (curve: (x: number) => number, range: Range) =>
  between(curve, range.start, range.end);

/**
 * Similar to the normal `angle()`, but remaps the result by `curve`.
 * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
 * @returns A random radians value.
 */
export const angle = (curve: (ratio: number) => number) =>
  curve(random()) * TWO_PI;

/**
 * Similar to the normal `signed()`, but remaps the result by `curve`.
 * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
 * @param magnitude
 * @returns A random signed value.
 */
export const signed = (curve: (ratio: number) => number, magnitude: number) =>
  (random() < 0.5 ? 1 : -1) * curve(random()) * magnitude;

/**
 * Similar to the normal `signedAngle()`, but remaps the result by `curve`.
 * @param curve Any function that takes a random value between [0, 1) and returns a remapped value.
 * @param magnitude
 * @returns A random signed radians value.
 */
export const signedAngle = (curve: (ratio: number) => number) =>
  (random() < 0.5 ? 1 : -1) * curve(random()) * PI;
