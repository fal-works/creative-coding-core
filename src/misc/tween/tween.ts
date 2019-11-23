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
 * @return New `Timer` instance.
 */
export const create = (
  setValue: (v: number) => void,
  parameters: Parameters
) => {
  const { start, end, duration } = parameters;
  const ease = parameters.easing || Easing.easeLinear;

  return Timer.create(duration, progress =>
    setValue(Numeric.lerp(start, end, ease(progress.ratio)))
  );
};
