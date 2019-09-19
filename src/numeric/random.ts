import { Range } from "../types/range";

/**
 * Returns random value from `start` up to (but not including) `end`.
 * @param start
 * @param end
 * @return A random value.
 */
export const between = (start: number, end: number) =>
  start + Math.random() * (end - start);

/**
 * Returns random value from `range.start` up to (but not including) `range.end`.
 * @param range
 * @return A random value.
 */
export const inRange = (range: Range) => between(range.start, range.end);

/**
 * Returns random integer from 0 up to (but not including) `maxInt`.
 * `maxInt` is not expected to be negative.
 * @param maxInt
 * @return A random integer value.
 */
export const integer = (maxInt: number) => Math.floor(Math.random() * maxInt);

/**
 * Returns random integer from `minInt` up to (but not including) `maxInt`.
 * The case where `minInt > maxInt` is not expected.
 * @param minInt
 * @param maxInt
 * @return A random integer value.
 */
export const integerBetween = (minInt: number, maxInt: number) =>
  minInt + integer(maxInt - minInt);

/**
 * Returns `n` or `-n` randomly.
 * @param n Any number.
 * @return A random-signed value of `n`.
 */
export const signed = (n: number) => (Math.random() < 0.5 ? n : -n);

/**
 * Returns one element of `array` randomly.
 * `array` is not expected to be empty.
 * @param array
 * @return A random element.
 */
export const fromArray = <T>(array: readonly T[]) =>
  array[integer(array.length)];

/**
 * Removes and returns one element from `array` randomly.
 * `array` is not expected to be empty.
 * @param array
 * @return A random element.
 */
export const removeFromArray = <T>(array: T[]): T =>
  array.splice(integer(array.length), 1)[0];

/**
 * Returns `true` or `false` randomly.
 * @param probability A number between 0 and 1.
 * @return `true` with the given `probability`.
 */
export const bool = (probability: number): boolean =>
  Math.random() < probability;
