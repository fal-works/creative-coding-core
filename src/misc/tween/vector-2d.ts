import { Vector2D } from "../../geometry";
import { Numeric, Easing } from "../../math";
import * as Timer from "../timer";

export type Parameters = {
  readonly target: Vector2D.Unit;
  readonly duration: number;
  readonly easing?: Easing.FunctionUnit;
};

/**
 * Creates a `Timer` instance for tweening `vector`.
 * The initial value of `vector` is evaluated at the timing when the timer starts.
 * @param parameters `target`, `duration` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const create = (
  vector: Vector2D.Mutable.Unit,
  parameters: Parameters
) => {
  const { duration } = parameters;

  let startX: number, startY: number;
  const { x: endX, y: endY } = parameters.target;

  const ease = parameters.easing || Easing.linear;

  return Timer.create({
    duration,
    onStart: () => {
      ({ x: startX, y: startY } = vector);
    },
    onProgress: progress => {
      const ratio = ease(progress.ratio);
      Vector2D.Mutable.setCartesian(
        vector,
        Numeric.lerp(startX, endX, ratio),
        Numeric.lerp(startY, endY, ratio)
      );
    }
  });
};
