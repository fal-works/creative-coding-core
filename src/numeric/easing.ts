import { sq, cubic } from "./math";

/**
 * Creates an easing function that takes `start`, `end` and `ratio` as arguments.
 * @param easingFunction
 */
export const create = (easingFunction: (ratio: number) => number) => (
  start: number,
  end: number,
  ratio: number
) => start + easingFunction(ratio) * (end - start);

/**
 * Linear easing function.
 * @param ratio
 */
export const easeLinear = (ratio: number): number => ratio;

/**
 * easeInQuad.
 * @param ratio
 */
export const easeInQuad = sq;

/**
 * easeOutQuad.
 * @param ratio
 */
export const easeOutQuad = (ratio: number): number => -sq(ratio - 1) + 1;

/**
 * easeInCubic.
 * @param ratio
 */
export const easeInCubic = cubic;

/**
 * easeOutCubic.
 * @param ratio
 */
export const easeOutCubic = (ratio: number): number => cubic(ratio - 1) + 1;

/**
 * easeInQuart.
 * @param ratio
 */
export const easeInQuart = (ratio: number): number => Math.pow(ratio, 4);

/**
 * easeOutQuart.
 * @param ratio
 */
export const easeOutQuart = (ratio: number): number =>
  -Math.pow(ratio - 1, 4) + 1;

/**
 * easeOutBack.
 * @param ratio
 */
export const easeOutBack = (
  ratio: number,
  coefficient: number = 1.70158
): number => {
  const r = ratio - 1;
  return (coefficient + 1) * cubic(r) + coefficient * sq(r) + 1;
};
