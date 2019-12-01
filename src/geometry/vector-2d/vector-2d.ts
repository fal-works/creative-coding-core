import {
  cos,
  sin,
  hypotenuseSquared2D,
  hypotenuse2D,
  atan2
} from "../../math/numeric";

/**
 * Readonly 2D vector.
 */
export interface Unit {
  readonly x: number;
  readonly y: number;
}

/**
 * Zero vector.
 */
export const zero: Unit = {
  x: 0,
  y: 0
};

/**
 * Checks if a given vector is completely zero.
 * @param v
 * @returns `true` if zero.
 */
export const isZero = (v: Unit): boolean => v.x === 0 && v.y === 0;

/**
 * Creates a new vector from polar coordinates `angle` and `length`.
 * @param length
 * @param angle
 * @returns new `Vector2D`.
 */
export const fromPolar = (length: number, angle: number): Unit => {
  return {
    x: length * cos(angle),
    y: length * sin(angle)
  };
};

/**
 * Creates a new vector by adding two vectors.
 * @param a
 * @param b
 * @returns new `Vector2D`.
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
 * @returns new `Vector2D`.
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
 * @returns new `Vector2D`.
 */
export const addPolar = (vector: Unit, length: number, angle: number): Unit => {
  return {
    x: vector.x + length * cos(angle),
    y: vector.y + length * sin(angle)
  };
};

/**
 * Creates a new vector by subtracting `b` from `a`.
 * @param a
 * @param b
 * @returns new `Vector2D`.
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
 * @returns new `Vector2D`.
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
 * @returns new `Vector2D`.
 */
export const subtractPolar = (
  vector: Unit,
  length: number,
  angle: number
): Unit => {
  return {
    x: vector.x - length * cos(angle),
    y: vector.y - length * sin(angle)
  };
};

/**
 * Creates a new vector with multiplied values.
 * @param vector
 * @param multiplier
 * @returns new `Vector2D`.
 */
export const multiply = (vector: Unit, multiplier: number): Unit => {
  return {
    x: vector.x * multiplier,
    y: vector.y * multiplier
  };
};

/**
 * Creates a new vector with divided values.
 * @param vector
 * @param multiplier
 * @returns new `Vector2D`.
 */
export const divide = (vector: Unit, divisor: number): Unit => {
  return {
    x: vector.x / divisor,
    y: vector.y / divisor
  };
};

/**
 * Calculates square of distance between `vectorA` and `vectorB`.
 * @param vectorA
 * @param vectorB
 * @returns Square of distance.
 */
export const distanceSquared = (vectorA: Unit, vectorB: Unit): number =>
  hypotenuseSquared2D(vectorB.x - vectorA.x, vectorB.y - vectorA.y);

/**
 * Calculates distance between `vectorA` and `vectorB`.
 * @param vectorA
 * @param vectorB
 * @returns Distance.
 */
export const distance = (vectorA: Unit, vectorB: Unit): number =>
  hypotenuse2D(vectorB.x - vectorA.x, vectorB.y - vectorA.y);

/**
 * Returns string e.g. `{x:0,y:0}`
 * @param vector
 * @returns String expression.
 */
export const toStr = (vector: Unit): string => `{x:${vector.x},y:${vector.y}}`;

/**
 * Creates a new vector with same values.
 * @param vector
 */
export const copy = (vector: Unit): Unit => {
  return {
    x: vector.x,
    y: vector.y
  };
};

/**
 * Calculates squared length of `vector`.
 * @param vector
 * @returns The squared length.
 */
export const lengthSquared = (vector: Unit): number =>
  hypotenuseSquared2D(vector.x, vector.y);

/**
 * Calculates length of `vector`.
 * @param vector
 * @returns The length.
 */
export const length = (vector: Unit): number =>
  hypotenuse2D(vector.x, vector.y);

/**
 * Calculates angle of `vector` in radians.
 * @param vector
 * @returns The angle. `0` if `vector` is a zero vector.
 */
export const angle = (vector: Unit): number => {
  const { x, y } = vector;
  return x !== 0 || y !== 0 ? atan2(vector.y, vector.x) : 0;
};
