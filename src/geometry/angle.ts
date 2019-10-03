import { TWO_PI } from "../numeric/math";

const DEGREES_TO_RADIANS_FACTOR = TWO_PI / 360;
const RADIANS_TO_DEGREES_FACTOR = 360 / TWO_PI;

export const createArray = (resolution: number): readonly number[] => {
  const array: number[] = new Array(resolution);
  const interval = TWO_PI / resolution;
  for (let i = 0; i < resolution; i += 1) array[i] = i * interval;

  return array;
};

export const fromDegrees = (degrees: number): number =>
  DEGREES_TO_RADIANS_FACTOR * degrees;

export const toDegrees = (radians: number): number =>
  RADIANS_TO_DEGREES_FACTOR * radians;
