import { Mutable } from "../types/mutable";
import { Unit } from "./vector-2d";

export const add = (
  vector: Mutable<Unit>,
  sourceVector: Unit
): Mutable<Unit> => {
  vector.x += sourceVector.x;
  vector.y += sourceVector.y;

  return vector;
};

export const addCartesian = (
  vector: Mutable<Unit>,
  x: number,
  y: number
): Mutable<Unit> => {
  vector.x += x;
  vector.y += y;

  return vector;
};

export const addPolar = (
  vector: Mutable<Unit>,
  length: number,
  angle: number
): Mutable<Unit> => {
  vector.x += length * Math.cos(angle);
  vector.y += length * Math.sin(angle);

  return vector;
};

export const subtract = (
  vector: Mutable<Unit>,
  sourceVector: Unit
): Mutable<Unit> => {
  vector.x -= sourceVector.x;
  vector.y -= sourceVector.y;

  return vector;
};

export const subtractCartesian = (
  vector: Mutable<Unit>,
  x: number,
  y: number
): Mutable<Unit> => {
  vector.x -= x;
  vector.y -= y;

  return vector;
};

export const subtractPolar = (
  vector: Mutable<Unit>,
  length: number,
  angle: number
): Mutable<Unit> => {
  vector.x -= length * Math.cos(angle);
  vector.y -= length * Math.sin(angle);

  return vector;
};

export const set = (
  vector: Mutable<Unit>,
  sourceVector: Unit
): Mutable<Unit> => {
  vector.x = sourceVector.x;
  vector.y = sourceVector.y;

  return vector;
};

export const setCartesian = (
  vector: Mutable<Unit>,
  x: number,
  y: number
): Mutable<Unit> => {
  vector.x = x;
  vector.y = y;

  return vector;
};

export const setPolar = (
  vector: Mutable<Unit>,
  length: number,
  angle: number
): Mutable<Unit> => {
  vector.x = length * Math.cos(angle);
  vector.y = length * Math.sin(angle);

  return vector;
};
