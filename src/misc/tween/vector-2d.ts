import { Vector2D, Numeric, Easing } from "../../../";
import { Timer, ConstantFunction } from "../";

export type Parameters = {
  duration: number;
  easing: Easing.FunctionUnit;
  onProgress: Timer.Listener;
  onComplete: Timer.Listener;
};

const getDefaultParameters = (): Parameters => {
  return {
    duration: 60,
    easing: Easing.easeLinear,
    onProgress: ConstantFunction.returnVoid,
    onComplete: ConstantFunction.returnVoid
  };
};

/**
 * Creates a `Timer` instance for tweening `vector`.
 * @param parameters
 * @return New `Timer` instance.
 */
export const create = (
  vector: Vector2D.Mutable.Unit,
  target: Vector2D.Unit,
  parameters: Partial<Parameters>
) => {
  const { duration, easing, onProgress, onComplete } = Object.assign(
    getDefaultParameters(),
    parameters
  );

  const { x: startX, y: startY } = vector;
  const { x: targetX, y: targetY } = target;

  return Timer.create(
    duration,
    unit => {
      const ratio = easing(unit.progressRatio);
      Vector2D.Mutable.setCartesian(
        vector,
        Numeric.lerp(startX, targetX, ratio),
        Numeric.lerp(startY, targetY, ratio)
      );
      onProgress(unit);
    },
    onComplete
  );
};
