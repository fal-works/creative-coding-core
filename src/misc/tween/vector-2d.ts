import { Vector2D } from "../../geometry";
import { Numeric, Easing } from "../../math";
import * as Timer from "../timer";

export type Parameters = {
  readonly target: Vector2D.Unit;
  readonly easing?: Easing.FunctionUnit;
};

/**
 * Creates a `Timer` instance for tweening `vector` from the current values.
 * @param vector The vector to tween.
 * @param duration Duration frame count.
 * @param parameters `target`, `duration` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const create = (
  vector: Vector2D.Mutable.Unit,
  duration: number,
  parameters: Parameters
) => {
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

/**
 * Creates a `Timer` instance for tweening `vector`.
 * The starting values of `vector` and the parameters are evaluated at the timing when the timer starts.
 * @param vector The vector to tween.
 * @param duration Duration frame count.
 * @param parameters `target`, `duration` and `easing`(linear by default).
 * @returns New `Timer` instance.
 */
export const setCreate = (
  vector: Vector2D.Mutable.Unit,
  duration: number,
  getParameters: () => Parameters
) => {
  let startX: number, startY: number;
  let endX: number, endY: number;
  let ease: Easing.FunctionUnit;

  return Timer.create({
    duration,
    onStart: () => {
      const { target, easing } = getParameters();
      ({ x: startX, y: startY } = vector);
      ({ x: endX, y: endY } = target);
      ease = easing || Easing.linear;
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
