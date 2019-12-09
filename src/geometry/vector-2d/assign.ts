import * as Vector2D from "./vector-2d";
import * as MutableVector2D from "./mutable";
import {
  cos,
  sin,
  clamp as clampNumber,
  constrain as constrainNumber
} from "../../math/numeric";

export const add = (
  sourceA: Vector2D.Unit,
  sourceB: Vector2D.Unit,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = sourceA.x + sourceB.x;
  target.y = sourceA.y + sourceB.y;

  return target;
};

export const addCartesian = (
  source: Vector2D.Unit,
  x: number,
  y: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x + x;
  target.y = source.y + y;

  return target;
};

export const addPolar = (
  source: Vector2D.Unit,
  length: number,
  angle: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x + length * cos(angle);
  target.y = source.y + length * sin(angle);

  return target;
};

export const subtract = (
  sourceA: Vector2D.Unit,
  sourceB: Vector2D.Unit,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = sourceA.x - sourceB.x;
  target.y = sourceA.y - sourceB.y;

  return target;
};

export const subtractCartesian = (
  source: Vector2D.Unit,
  x: number,
  y: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x - x;
  target.y = source.y - y;

  return target;
};

export const subtractPolar = (
  source: Vector2D.Unit,
  length: number,
  angle: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x - length * cos(angle);
  target.y = source.y - length * sin(angle);

  return target;
};

export const setCartesian = (
  x: number,
  y: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = x;
  target.y = y;

  return target;
};

export const setPolar = (
  length: number,
  angle: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = length * cos(angle);
  target.y = length * sin(angle);

  return target;
};

export const multiply = (
  source: Vector2D.Unit,
  multiplier: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x * multiplier;
  target.y = source.y * multiplier;

  return target;
};

export const divide = (
  source: Vector2D.Unit,
  divisor: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = source.x / divisor;
  target.y = source.y / divisor;

  return target;
};

export const clamp = (
  vector: Vector2D.Unit,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = clampNumber(vector.x, minX, maxX);
  target.y = clampNumber(vector.y, minY, maxY);

  return target;
};

export const constrain = (
  vector: Vector2D.Unit,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  target.x = constrainNumber(vector.x, minX, maxX);
  target.y = constrainNumber(vector.y, minY, maxY);

  return target;
};
