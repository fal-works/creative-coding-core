import * as Vector2D from "./vector-2d";
import * as MutableVector2D from "./mutable";

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
  target.x = source.x + length * Math.cos(angle);
  target.y = source.y + length * Math.sin(angle);

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
  target.x = source.x - length * Math.cos(angle);
  target.y = source.y - length * Math.sin(angle);

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
