import { Mutable } from "../../types/mutable";
import * as Vector2D from "./vector-2d";
import {
  cos,
  sin,
  clamp as clampNumber,
  constrain as constrainNumber,
  lerp,
} from "../../math/numeric";
import * as Angle from "../angle";

export type Unit = Mutable<Vector2D.Unit>;

/**
 * @returns A new mutable 2D vector.
 */
export const create = (): Unit => ({ x: 0, y: 0 });

export const add = (vector: Unit, otherVector: Vector2D.Unit): Unit => {
  vector.x += otherVector.x;
  vector.y += otherVector.y;

  return vector;
};

export const addCartesian = (vector: Unit, x: number, y: number): Unit => {
  vector.x += x;
  vector.y += y;

  return vector;
};

export const addPolar = (vector: Unit, length: number, angle: number): Unit => {
  vector.x += length * cos(angle);
  vector.y += length * sin(angle);

  return vector;
};

export const subtract = (vector: Unit, otherVector: Vector2D.Unit): Unit => {
  vector.x -= otherVector.x;
  vector.y -= otherVector.y;

  return vector;
};

export const subtractCartesian = (vector: Unit, x: number, y: number): Unit => {
  vector.x -= x;
  vector.y -= y;

  return vector;
};

export const subtractPolar = (
  vector: Unit,
  length: number,
  angle: number
): Unit => {
  vector.x -= length * cos(angle);
  vector.y -= length * sin(angle);

  return vector;
};

export const set = (vector: Unit, sourceVector: Vector2D.Unit): Unit => {
  vector.x = sourceVector.x;
  vector.y = sourceVector.y;

  return vector;
};

export const setCartesian = (vector: Unit, x: number, y: number): Unit => {
  vector.x = x;
  vector.y = y;

  return vector;
};

export const setPolar = (vector: Unit, length: number, angle: number): Unit => {
  vector.x = length * cos(angle);
  vector.y = length * sin(angle);

  return vector;
};

export const multiply = (vector: Unit, multiplier: number): Unit => {
  vector.x *= multiplier;
  vector.y *= multiplier;

  return vector;
};

export const divide = (vector: Unit, divisor: number): Unit => {
  const multiplier = 1 / divisor;
  vector.x *= multiplier;
  vector.y *= multiplier;

  return vector;
};

export const clamp = (
  vector: Unit,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): Unit => {
  vector.x = clampNumber(vector.x, minX, maxX);
  vector.y = clampNumber(vector.y, minY, maxY);

  return vector;
};

export const constrain = (
  vector: Unit,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): Unit => {
  vector.x = constrainNumber(vector.x, minX, maxX);
  vector.y = constrainNumber(vector.y, minY, maxY);

  return vector;
};

/**
 * Updates `vector` so that the distance from another point will be at least equal or larger than `minDistance`.
 * @param vector
 * @param from
 * @param minDistance
 */
export const separate = (
  vector: Unit,
  from: Vector2D.Unit,
  minDistance: number
): Unit => {
  const distanceSquared = Vector2D.distanceSquared(vector, from);
  if (distanceSquared >= minDistance * minDistance) return vector;

  const angle = Angle.betweenPoints(from, vector);
  vector.x = from.x + minDistance * cos(angle);
  vector.y = from.y + minDistance * sin(angle);

  return vector;
};

/**
 * Updates `a` and `b` so that the distance will be at least equal or larger than `minDistance`.
 * @param a
 * @param b
 * @param minDistance
 * @param midPointRatio The ratio for determining the midpoint from `a` to `b`.
 */
export const separateEachOther = (
  a: Unit,
  b: Unit,
  minDistance: number,
  midPointRatio: number
): void => {
  const distanceSquared = Vector2D.distanceSquared(a, b);
  if (distanceSquared >= minDistance * minDistance) return;

  const angleFromA = Angle.betweenPoints(a, b);
  const midX = lerp(a.x, b.x, midPointRatio);
  const midY = lerp(a.y, b.y, midPointRatio);
  const halfMinDistance = minDistance / 2;
  const bDisplacementX = halfMinDistance * cos(angleFromA);
  const bDisplacementY = halfMinDistance * sin(angleFromA);
  b.x = midX + bDisplacementX;
  b.y = midY + bDisplacementY;
  a.x = midX - bDisplacementX;
  a.y = midY - bDisplacementY;

  return;
};
