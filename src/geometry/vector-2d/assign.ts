import * as Vector2D from "./vector-2d";
import * as MutableVector2D from "./mutable";
import {
  cos,
  sin,
  clamp as clampNumber,
  constrain as constrainNumber,
  hypotenuse2D
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
  const multiplier = 1 / divisor;
  target.x = source.x * multiplier;
  target.y = source.y * multiplier;

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

export const normalize = (
  vector: Vector2D.Unit,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  const { x, y } = vector;
  const length = hypotenuse2D(x, y);

  target.x = x / length;
  target.y = y / length;

  return target;
};

export const normalizeBetween = (
  from: Vector2D.Unit,
  to: Vector2D.Unit,
  target: MutableVector2D.Unit
): MutableVector2D.Unit => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = hypotenuse2D(dx, dy);

  target.x = dx / distance;
  target.y = dy / distance;

  return target;
};
