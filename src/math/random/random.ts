import { Range } from "../../types/range";
import { TWO_PI, PI } from "../../geometry/angle";
import { random } from "./base";

/**
 * Returns random value from `0` up to (but not including) `max`.
 * @param max
 * @returns A random value.
 */
export const value = (max: number) => random() * max;

/**
 * Returns random value from `0` to (but not including) `2 * PI`.
 * @returns A random radians value.
 */
export const angle = () => random() * TWO_PI;

/**
 * Returns random value from `start` up to (but not including) `end`.
 * @param start
 * @param end
 * @returns A random value.
 */
export const between = (start: number, end: number) =>
  start + random() * (end - start);

/**
 * Returns random value from `range.start` up to (but not including) `range.end`.
 * @param range
 * @returns A random value.
 */
export const inRange = (range: Range) => between(range.start, range.end);

/**
 * Returns `true` or `false` randomly.
 * @param probability A number between 0 and 1.
 * @returns `true` with the given `probability`.
 */
export const bool = (probability: number): boolean => random() < probability;

/**
 * Returns `1` or `-1` randomly.
 * @param positiveProbability A number between 0 and 1 for the probability of a positive value being returned.
 * @returns Either `1` or `-1`.
 */
export const sign = (positiveProbability: number) =>
  random() < positiveProbability ? 1 : -1;

/**
 * Returns a positive or negative value randomly with a magnitude from `0` up to (but not including) `maxMagnitude`.
 * @param maxMagnitude
 * @returns A random value.
 */
export const signed = (maxMagnitude: number) =>
  (random() < 0.5 ? 1 : -1) * random() * maxMagnitude;

/**
 * Returns a positive or negative value randomly with a magnitude from `0` up to (but not including) `PI`.
 * @returns A random radians value.
 */
export const signedAngle = () => (random() < 0.5 ? 1 : -1) * random() * PI;
