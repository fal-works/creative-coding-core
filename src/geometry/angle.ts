import * as Vector2D from "./vector-2d";
import { atan2 } from "../math/numeric";
import {
  ONE_HALF,
  SQUARE_ROOT_THREE_OVER_TWO,
  ONE_OVER_SQUARE_ROOT_TWO
} from "../math/constants";

export const PI = Math.PI;
export const TWO_PI = 2 * PI;
export const HALF_PI = PI / 2;
export const THIRD_PI = PI / 3;
export const QUARTER_PI = PI / 4;
export const THREE_QUARTERS_PI = 3 * QUARTER_PI;

export const SIN30 = ONE_HALF;
export const SIN45 = ONE_OVER_SQUARE_ROOT_TWO;
export const SIN60 = SQUARE_ROOT_THREE_OVER_TWO;
export const COS30 = SIN60;
export const COS45 = SIN45;
export const COS60 = SIN30;

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
export const fromOrigin = (position: Vector2D.Unit): number => {
  const { x, y } = position;
  return x !== 0 || y !== 0 ? atan2(position.y, position.x) : 0;
};

/**
 * Calculates the angle in radians between two points.
 * @param from
 * @param to
 * @return The angle. `0` if both points are the same.
 */
export const betweenPoints = (
  from: Vector2D.Unit,
  to: Vector2D.Unit
): number => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return dx !== 0 || dy !== 0 ? atan2(dy, dx) : 0;
};

/**
 * Calculates the angle in radians between two points.
 * @return The angle. `0` if both points are the same.
 */
export const betweenCoordinates = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => (x1 !== x2 || y1 !== y2 ? atan2(x2 - x1, y2 - y1) : 0);
