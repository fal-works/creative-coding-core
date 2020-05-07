import { angle, between } from "./random";
import { Vector2D, RectangleRegion } from "../../geometry";

/**
 * Returns a new vector with `length` and random angle.
 * @param length
 * @returns New `Vector2D` unit.
 */
export const vector = (length: number): Vector2D.Unit =>
  Vector2D.fromPolar(length, angle());

/**
 * Returns a random point in `region`.
 * @param region
 * @returns Random `Vector2D`.
 */
export const pointInRectangleRegion = (
  region: RectangleRegion.Unit
): Vector2D.Unit => {
  const { topLeft, bottomRight } = region;
  return {
    x: between(topLeft.x, bottomRight.x),
    y: between(topLeft.y, bottomRight.y),
  };
};
