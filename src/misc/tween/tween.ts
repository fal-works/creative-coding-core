import { Numeric, Easing } from "../../math";
import * as Timer from "../timer";

export type Parameters = {
  readonly start: number;
  readonly end: number;
  readonly easing?: Easing.FunctionUnit;
};

/**
 * Creates a `Timer` instance for tweening value using `setValue()`.
 * @param setValue A function that receives the tweened value.
 * @param duration Duration frame count.
 * @param parameters `start`, `end` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const create = (
  setValue: (value: number) => void,
  duration: number,
  parameters: Parameters
) => {
  const { start, end } = parameters;
  const ease = parameters.easing || Easing.linear;

  return Timer.create({
    duration,
    onProgress: progress =>
      setValue(Numeric.lerp(start, end, ease(progress.ratio)))
  });
};

/**
 * Creates a `Timer` instance for tweening value using `setValue()`.
 * The parameters are evaluated at the timing when the timer starts.
 * @param setValue A function that receives the tweened value.
 * @param duration Duration frame count.
 * @param getParameters A function that returns `start`, `end` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const setCreate = (
  setValue: (value: number) => void,
  duration: number,
  getParameters: () => Parameters
) => {
  let startValue: number;
  let endValue: number;
  let ease: Easing.FunctionUnit;

  return Timer.create({
    duration,
    onStart: () => {
      const { start, end, easing } = getParameters();
      startValue = start;
      endValue = end;
      ease = easing || Easing.linear;
    },
    onProgress: progress =>
      setValue(Numeric.lerp(startValue, endValue, ease(progress.ratio)))
  });
};
