import { square, cube } from "./numeric";

export type FunctionUnit = (ratio: number) => number;

/**
 * Creates an easing function that takes `start`, `end` and `ratio` as arguments.
 * @param easingFunction
 */
export const bind = (easingFunction: FunctionUnit) => (
  start: number,
  end: number,
  ratio: number
) => start + easingFunction(ratio) * (end - start);

/**
 * Concatenates two easing functions without normalization.
 * @param easingFunctionA
 * @param easingFunctionB
 * @param thresholdRatio
 * @return New easing function.
 */
export const concatenate = (
  easingFunctionA: FunctionUnit,
  easingFunctionB: FunctionUnit,
  thresholdRatio = 0.5
): FunctionUnit => {
  return ratio => {
    if (ratio < thresholdRatio) return easingFunctionA(ratio / thresholdRatio);
    else {
      const ratioB = 1 - thresholdRatio;
      return easingFunctionB((ratio - thresholdRatio) / ratioB);
    }
  };
};

/**
 * Integrates two easing functions.
 * Results of both functions will be normalized depending on `thresholdRatio`.
 * @param easingFunctionA
 * @param easingFunctionB
 * @param thresholdRatio
 * @return New easing function.
 */
export const integrate = (
  easingFunctionA: FunctionUnit,
  easingFunctionB: FunctionUnit,
  thresholdRatio = 0.5
): FunctionUnit => {
  return ratio => {
    if (ratio < thresholdRatio)
      return thresholdRatio * easingFunctionA(ratio / thresholdRatio);
    else {
      const ratioB = 1 - thresholdRatio;
      return (
        thresholdRatio +
        ratioB * easingFunctionB((ratio - thresholdRatio) / ratioB)
      );
    }
  };
};

/**
 * Linear easing function.
 * @param ratio
 */
export const easeLinear: FunctionUnit = ratio => ratio;

/**
 * easeInQuad.
 * @param ratio
 */
export const easeInQuad = square;

/**
 * easeOutQuad.
 * @param ratio
 */
export const easeOutQuad: FunctionUnit = ratio => -square(ratio - 1) + 1;

/**
 * easeInCubic.
 * @param ratio
 */
export const easeInCubic = cube;

/**
 * easeOutCubic.
 * @param ratio
 */
export const easeOutCubic: FunctionUnit = ratio => cube(ratio - 1) + 1;

/**
 * easeInQuart.
 * @param ratio
 */
export const easeInQuart: FunctionUnit = ratio => Math.pow(ratio, 4);

/**
 * easeOutQuart.
 * @param ratio
 */
export const easeOutQuart: FunctionUnit = ratio => -Math.pow(ratio - 1, 4) + 1;

/**
 * Creates an easeOutBack function.
 * @param ratio
 */
export const createEaseOutBack = (coefficient = 1.70158) => (
  ratio: number
): number => {
  const r = ratio - 1;
  return (coefficient + 1) * cube(r) + coefficient * square(r) + 1;
};

export const easeInOutQuad = integrate(easeInQuad, easeOutQuad);
export const easeOutInQuad = integrate(easeOutQuad, easeInQuad);
export const easeInOutCubic = integrate(easeInCubic, easeOutCubic);
export const easeOutInCubic = integrate(easeOutCubic, easeInCubic);
export const easeInOutQuart = integrate(easeInQuart, easeOutQuart);
export const easeOutInQuart = integrate(easeOutQuart, easeInQuart);
