import { Mutable } from "../../types/mutable";
import * as Vector2D from "./vector-2d";
import {
  cos,
  sin,
  clamp as clampNumber,
  constrain as constrainNumber
} from "../../math/numeric";

export type Unit = Mutable<Vector2D.Unit>;

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
  vector.x /= divisor;
  vector.y /= divisor;

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
