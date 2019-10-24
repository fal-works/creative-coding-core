import * as Vector2D from "./vector-2d";

export const PI = Math.PI;
export const HALF_PI = PI / 2;
export const TWO_PI = 2 * PI;

export const DEGREES_TO_RADIANS = TWO_PI / 360;
export const RADIANS_TO_DEGREES = 360 / TWO_PI;

export const createArray = (resolution: number): readonly number[] => {
  const array: number[] = new Array(resolution);
  const interval = TWO_PI / resolution;
  for (let i = 0; i < resolution; i += 1) array[i] = i * interval;

  return array;
};

export const fromDegrees = (degrees: number): number =>
  DEGREES_TO_RADIANS * degrees;

export const toDegrees = (radians: number): number =>
  RADIANS_TO_DEGREES * radians;

/**
 * Calculates the angle in radians from origin to `position`.
 * @param position
 * @return The angle. `0` if `position` is a zero vector.
 */
export const fromOrigin = (position: Vector2D.Unit): number =>
  Vector2D.isZero(position) ? 0 : Math.atan2(position.y, position.x);

/**
 * Calculates the angle in radians between two points.
 * @param from
 * @param to
 * @return The angle. `0` if both points are the same.
 */
export const between = (from: Vector2D.Unit, to: Vector2D.Unit): number => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 0 && dy === 0) return 0;
  return Math.atan2(dy, dx);
};
