export const {
  abs,
  acos,
  asin,
  atan,
  atan2,
  ceil,
  cos,
  exp,
  floor,
  log,
  max,
  min,
  pow,
  round,
  sin,
  sqrt,
  tan,
  clz32,
  imul,
  sign,
  log10,
  log2,
  log1p,
  expm1,
  cosh,
  sinh,
  tanh,
  acosh,
  asinh,
  atanh,
  hypot,
  trunc,
  fround,
  cbrt,
} = Math;

/**
 * Same as `Math.sqrt`.
 * @returns √x
 */
export const squareRoot = sqrt;

/**
 * Same as `Math.clz32`.
 */
export const leadingZeros32 = clz32;

/**
 * Same as `Math.imul`.
 */
export const multInt = imul;

/**
 * Same as `Math.hypot`.
 */
export const hypotenuse = hypot;

/**
 * Same as `Math.trunc`.
 */
export const integerPart = trunc;

/**
 * Same as `Math.fround`.
 */
export const floatRound = fround;

/**
 * Same as `Math.cbrt`.
 * @returns ∛x
 */
export const cubeRoot = cbrt;

export const square = (v: number) => v * v;
export const cube = (v: number) => v * v * v;
export const pow4 = (v: number) => square(v * v);
export const pow5 = (v: number) => square(v * v) * v;

export const squareInt = (v: number) => imul(v, v);
export const cubeInt = (v: number) => imul(imul(v, v), v);

/**
 * Checks whether `a` and `b` are considered equal.
 * @param a
 * @param b
 * @returns `true` if the absolute difference of `a` and `b` is smaller than `Number.EPSILON`.
 */
export const equal = (a: number, b: number): boolean =>
  abs(a - b) < 2.220446049250313e-16;

/**
 * Similar to `Math.min` but accepts only two arguments.
 * @param a
 * @param b
 * @returns The smaller of `a` or `b`.
 */
export const min2 = (a: number, b: number) => (a < b ? a : b);

/**
 * Similar to `Math.max` but accepts only two arguments.
 * @param a
 * @param b
 * @returns The larger of `a` or `b`.
 */
export const max2 = (a: number, b: number) => (a > b ? a : b);

/**
 * Safe version of `Math.atan2`;
 * @param y
 * @param x
 * @returns The angle from x-axis to the point. `0` if both `x` and `y` are `0`.
 */
export const atan2safe = (y: number, x: number) =>
  y !== 0 || x !== 0 ? atan2(y, x) : 0;

/**
 * Calculates the sum of squares of `x` and `y`.
 * @param x
 * @param y
 * @returns `x^2 + y^2`.
 */
export const hypotenuseSquared2D = (x: number, y: number) => x * x + y * y;

/**
 * A 2D version of `Math.hypot`. Calculates the square root of the sum of squares of `x` and `y`.
 * @param x
 * @param y
 * @returns `√(x^2 + y^2)`.
 */
export const hypotenuse2D = (x: number, y: number) => sqrt(x * x + y * y);

/**
 * Linearly interpolates between `start` and `end` by `ratio`.
 * The result will not be clamped.
 * @param start
 * @param end
 * @param ratio
 * @returns Interpolated value, e.g. `start` if `ratio == 0`, `end` if `ratio == 1`.
 */
export const lerp = (start: number, end: number, ratio: number) =>
  start + ratio * (end - start);

/**
 * Clamps `value` between `min` and `max`.
 * @param value
 * @param min
 * @param max
 * @returns Clamped value equal or greater than `min` and equal or less than `max`.
 */
export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

/**
 * Clamps `value` between `min` and `max`, or returns the average of them if `min > max`.
 * @param value
 * @param min
 * @param max
 * @returns Constrained value.
 */
export const constrain = (value: number, min: number, max: number) =>
  min > max ? (min + max) / 2 : value < min ? min : value > max ? max : value;

/**
 * Maps `value` from the range [`inStart`, `inEnd`] to the range [`outStart`, `outEnd`].
 * @param value
 * @param inStart
 * @param inEnd
 * @param outStart
 * @param outEnd
 * @returns Mapped value (unclamped).
 */
export const map = (
  value: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) => outStart + ((outEnd - outStart) * (value - inStart)) / (inEnd - inStart);

/**
 * Creates a mapping function that maps `value` from the range [`inStart`, `inEnd`] to the range [`outStart`, `outEnd`].
 * @param inStart
 * @param inEnd
 * @param outStart
 * @param outEnd
 * @returns New mapping function.
 */
export const createMap = (
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) => {
  const inLength = inEnd - inStart;
  const outLength = outEnd - outStart;
  return (value: number) =>
    outStart + (outLength * (value - inStart)) / inLength;
};

/**
 * Maps `value` from the range [`start`, `end`] to the range [0, 1].
 * @param value
 * @param start
 * @param end
 * @returns Mapped value between 0 and 1 (unclamped).
 */
export const inverseLerp = (value: number, start: number, end: number) =>
  (value - start) / (end - start);
