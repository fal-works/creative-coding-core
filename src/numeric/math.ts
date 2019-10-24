export const square = (v: number) => v * v;
export const cube = (v: number) => v * v * v;

export const PI = Math.PI;
export const HALF_PI = PI / 2;
export const TWO_PI = 2 * PI;

export const nearlyEqual = (a: number, b: number): boolean =>
  Math.abs(a - b) < 0.0000000000001;
