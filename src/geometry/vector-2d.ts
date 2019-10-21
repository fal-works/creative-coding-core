import { sq } from "../numeric/math";

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

/**
 * Checks if a given vector is completely zero.
 * @param v
 * @return `true` if zero.
 */
export const isZero = (v: Unit): boolean => v.x === 0 && v.y === 0;

/**
 * Creates a new vector from polar coordinates `angle` and `length`.
 * @param length
 * @param angle
 * @return new `Vector2D`.
 */
export const fromPolar = (length: number, angle: number): Unit => {
  return {
    x: length * Math.cos(angle),
    y: length * Math.sin(angle)
  };
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
 * Creates a new vector by adding cartesian coordinates.
 * @param vector
 * @param x
 * @param y
 * @return new `Vector2D`.
 */
export const addCartesian = (vector: Unit, x: number, y: number): Unit => {
  return {
    x: vector.x + x,
    y: vector.y + y
  };
};

/**
 * Creates a new vector by adding polar coordinates.
 * @param vector
 * @param length
 * @param angle
 * @return new `Vector2D`.
 */
export const addPolar = (vector: Unit, length: number, angle: number): Unit => {
  return {
    x: vector.x + length * Math.cos(angle),
    y: vector.y + length * Math.sin(angle)
  };
};

/**
 * Creates a new vector by subtracting `b` from `a`.
 * @param a
 * @param b
 * @return new `Vector2D`.
 */
export const subtract = (a: Unit, b: Unit): Unit => {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
};

/**
 * Creates a new vector by subtracting cartesian coordinates.
 * @param vector
 * @param x
 * @param y
 * @return new `Vector2D`.
 */
export const subtractCartesian = (vector: Unit, x: number, y: number): Unit => {
  return {
    x: vector.x - x,
    y: vector.y - y
  };
};

/**
 * Creates a new vector by subtracting polar coordinates.
 * @param vector
 * @param length
 * @param angle
 * @return new `Vector2D`.
 */
export const subtractPolar = (
  vector: Unit,
  length: number,
  angle: number
): Unit => {
  return {
    x: vector.x - length * Math.cos(angle),
    y: vector.y - length * Math.sin(angle)
  };
};

export const distanceSquared = (vectorA: Unit, vectorB: Unit): number =>
  sq(vectorB.x - vectorA.x) + sq(vectorB.y - vectorA.y);

export const distance = (vectorA: Unit, vectorB: Unit): number =>
  Math.sqrt(distanceSquared(vectorA, vectorB));

export const toStr = (vector: Unit): string => `{x:${vector.x},y:${vector.y}}`;

export const copy = (vector: Unit): Unit => {
  return {
    x: vector.x,
    y: vector.y
  };
};
