import { Mutable } from "../types/mutable";

/**
 * A readonly 2D vector.
 */
export interface Unit {
  readonly x: number;
  readonly y: number;
}

export const zero: Unit = {
  x: 0,
  y: 0
};

export const setMutable = (
  vector: Mutable<Unit>,
  x: number,
  y: number
): Mutable<Unit> => {
  vector.x = x;
  vector.y = y;

  return vector;
};

/**
 * Creates a new vector by adding two vectors.
 * @param a
 * @param b
 * @return new `Vector2D`.
 */
export const add = (a: Unit, b: Unit): Unit => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
};

/**
 * Creates a new vector from polar coordinates `angle` and `length`.
 * @param angle
 * @param length
 * @return new `Vector2D`.
 */
export const fromPolar = (angle: number, length: number): Unit => {
  return {
    x: length * Math.cos(angle),
    y: length * Math.sin(angle)
  };
};

/**
 * Creates a new vector by adding polar coordinates `angle` and `length`.
 * @param vector
 * @param angle
 * @param length
 * @return new `Vector2D`.
 */
export const addPolar = (
  vector: Unit,
  angle: number,
  length: number
): Unit => {
  return {
    x: vector.x + length * Math.cos(angle),
    y: vector.y + length * Math.sin(angle)
  };
};
