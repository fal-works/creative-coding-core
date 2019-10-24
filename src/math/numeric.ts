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
  cbrt
} = Math;

/**
 * Same as `Math.sqrt`.
 * @return √x
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
 * @return ∛x
 */
export const cubeRoot = cbrt;

export const square = (v: number) => v * v;
export const cube = (v: number) => v * v * v;
export const squareInt = (v: number) => imul(v, v);
export const cubeInt = (v: number) => imul(imul(v, v), v);

/**
 * Checks whether `a` and `b` are considered equal.
 * @param a
 * @param b
 * @return `true` if the absolute difference of `a` and `b` is smaller than `Number.EPSILON`.
 */
export const equal = (a: number, b: number): boolean =>
  abs(a - b) < 2.220446049250313e-16;

/**
 * Safe version of `Math.atan2`;
 * @param y
 * @param x
 * @return The angle from x-axis to the point. `0` if both `x` and `y` are `0`.
 */
export const atan2safe = (y: number, x: number) =>
  y !== 0 || x !== 0 ? atan2(y, x) : 0;

/**
 * Calculates the sum of squares of `x` and `y`.
 * @param x
 * @param y
 * @return `x^2 + y^2`.
 */
export const hypotenuseSquared2D = (x: number, y: number) => x * x + y * y;

/**
 * A 2D version of `Math.hypot`. Calculates the square root of the sum of squares of `x` and `y`.
 * @param x
 * @param y
 * @return `√(x^2 + y^2)`.
 */
export const hypotenuse2D = (x: number, y: number) => sqrt(x * x + y * y);
