import { Range } from "../types/range";
import { TWO_PI } from "../geometry/angle";
import { Vector2D, RectangleRegion } from "../geometry";
import { floor } from "./numeric";

const { random } = Math;

/**
 * Returns random value from `0` up to (but not including) `1`. Same as `Math.random()`.
 * @return A random value.
 */
export const ratio = random;

/**
 * Returns random value from `0` up to (but not including) `max`.
 * @param max
 * @return A random value.
 */
export const value = (max: number) => random() * max;

/**
 * Returns random value from `0` to (but not including) `2 * PI`.
 * @return A random radians value.
 */
export const angle = () => random() * TWO_PI;

/**
 * Returns random value from `start` up to (but not including) `end`.
 * @param start
 * @param end
 * @return A random value.
 */
export const between = (start: number, end: number) =>
  start + random() * (end - start);

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
export const integer = (maxInt: number) => floor(random() * maxInt);

/**
 * Returns random integer from `minInt` up to (but not including) `maxInt`.
 * The case where `minInt > maxInt` or `maxInt <= 0` is not expected.
 * @param minInt
 * @param maxInt
 * @return A random integer value.
 */
export const integerBetween = (minInt: number, maxInt: number) =>
  minInt + floor(random() * (maxInt - minInt));

/**
 * Returns `n` or `-n` randomly.
 * @param n Any number.
 * @return A random-signed value of `n`.
 */
export const signed = (n: number) => (random() < 0.5 ? n : -n);

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
export const bool = (probability: number): boolean => random() < probability;

/**
 * Returns random value from `-absoluteValue` up to (but not including) `absoluteValue`.
 * @param absoluteValue
 * @return A random value.
 */
export const fromAbsolute = (absoluteValue: number): number =>
  -absoluteValue + random() * 2 * absoluteValue;

/**
 * Returns a new vector with `length` and random angle.
 * @param length
 * @return New `Vector2D` unit.
 */
export const vector = (length: number): Vector2D.Unit =>
  Vector2D.fromPolar(length, angle());

/**
 * Returns a random point in `region`.
 * @param region
 * @return Random `Vector2D`.
 */
export const pointInRectangleRegion = (
  region: RectangleRegion.Unit
): Vector2D.Unit => {
  const { topLeft, rightBottom } = region;
  return {
    x: between(topLeft.x, rightBottom.x),
    y: between(topLeft.y, rightBottom.y)
  };
};

/**
 * Similar to `ratio()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @return A random value.
 */
export const ratioCurved = (curve: (ratio: number) => number) =>
  curve(random());

/**
 * Similar to `value()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param magnitude
 * @return A random value.
 */
export const valueCurved = (
  curve: (ratio: number) => number,
  magnitude: number
) => curve(random()) * magnitude;

/**
 * Similar to `between()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param start
 * @param end
 * @return A random value.
 */
export const betweenCurved = (
  curve: (x: number) => number,
  start: number,
  end: number
) => start + curve(random()) * (end - start);

/**
 * Similar to `inRange()`, but remaps the result by `curve`.
 * @param curve Function that takes a random value between [0, 1] and returns a remapped value.
 * @param range
 * @return A random value.
 */
export const inRangeCurved = (curve: (x: number) => number, range: Range) =>
  betweenCurved(curve, range.start, range.end);
