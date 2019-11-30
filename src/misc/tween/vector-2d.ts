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
 * @param parameters `target`, `duration` and `easing`(linear by default).
 * @return New `Timer` instance.
 */
export const create = (
  vector: Vector2D.Mutable.Unit,
  parameters: Parameters
) => {
  const { duration } = parameters;

  const { x: startX, y: startY } = vector;
  const { x: endX, y: endY } = parameters.target;

  const ease = parameters.easing || Easing.linear;

  return Timer.create({
    duration,
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
