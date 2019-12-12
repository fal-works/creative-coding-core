import * as Integer from "./integer";

/**
 * Returns one element of `array` randomly.
 * `array` is not expected to be empty.
 * @param array
 * @returns A random element.
 */
export const get = <T>(array: readonly T[]) =>
  array[Integer.value(array.length)];

/**
 * Removes and returns one element from `array` randomly.
 * `array` is not expected to be empty.
 * @param array
 * @returns A random element.
 */
export const removeGet = <T>(array: T[]): T =>
  array.splice(Integer.value(array.length), 1)[0];
