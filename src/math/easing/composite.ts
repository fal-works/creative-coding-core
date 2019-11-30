import { FunctionUnit } from "./type";

/**
 * Concatenates two easing functions without normalization.
 * @param easingA - Any easing function.
 * @param easingB - Any easing function.
 * @param thresholdRatio - Defaults to `0.5`.
 * @returns New easing function.
 */
export const concatenate = (
  easingA: FunctionUnit,
  easingB: FunctionUnit,
  thresholdRatio = 0.5
) => {
  const inverseThresholdRatio = 1 / thresholdRatio;

  return (ratio: number) => {
    if (ratio < thresholdRatio) return easingA(inverseThresholdRatio * ratio);
    else {
      const ratioB = 1 - thresholdRatio;
      return easingB((ratio - thresholdRatio) / ratioB);
    }
  };
};

/**
 * Integrates two easing functions.
 * Results of both functions will be normalized depending on `thresholdRatio`.
 * @param easingA - Any easing function.
 * @param easingB - Any easing function.
 * @param thresholdRatio - Defaults to `0.5`.
 * @returns New easing function.
 */
export const integrate = (
  easingA: FunctionUnit,
  easingB: FunctionUnit,
  thresholdRatio = 0.5
) => {
  const inverseThresholdRatio = 1 / thresholdRatio;

  return (ratio: number) => {
    if (ratio < thresholdRatio)
      return thresholdRatio * easingA(inverseThresholdRatio * ratio);
    else {
      const ratioB = 1 - thresholdRatio;
      return (
        thresholdRatio + ratioB * easingB((ratio - thresholdRatio) / ratioB)
      );
    }
  };
};
