import { floor } from "./../numeric";
import { random } from "./base";

/**
 * Returns random integer from 0 up to (but not including) `maxInt`.
 * `maxInt` is not expected to be negative.
 * @param maxInt
 * @returns A random integer value.
 */
export const value = (maxInt: number) => floor(random() * maxInt);

/**
 * Returns random integer from `minInt` up to (but not including) `maxInt`.
 * The case where `minInt > maxInt` or `maxInt <= 0` is not expected.
 * @param minInt
 * @param maxInt
 * @returns A random integer value.
 */
export const between = (minInt: number, maxInt: number) =>
  minInt + floor(random() * (maxInt - minInt));

/**
 * Returns a positive or negative integer randomly
 * with a magnitude from `0` up to (but not including) `maxMagnitude`.
 * @param maxMagnitude
 * @returns A random signed value.
 */
export const signed = (maxMagnitude: number) =>
  (random() < 0.5 ? 1 : -1) * floor(random() * maxMagnitude);
