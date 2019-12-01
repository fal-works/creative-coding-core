import { Numeric, Easing } from "../../math";
import * as Timer from "../timer";

export type Parameters = {
  readonly start: number;
  readonly end: number;
  readonly duration: number;
  readonly easing?: Easing.FunctionUnit;
};

/**
 * Creates a `Timer` instance for tweening value using `setValue()`.
 * @param parameters `start`, `end`, `duration` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const create = (
  setValue: (value: number) => void,
  parameters: Parameters
) => {
  const { start, end, duration } = parameters;
  const ease = parameters.easing || Easing.linear;

  return Timer.create({
    duration,
    onProgress: progress =>
      setValue(Numeric.lerp(start, end, ease(progress.ratio)))
  });
};
