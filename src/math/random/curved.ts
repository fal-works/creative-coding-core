import { Range } from "../../types/range";
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
