import { hypotenuseSquared2D, hypotenuse2D } from "../math/numeric";

/**
 * Calculates the squared distance between [`x1`, `y1`] and [`x2`, `y2`];
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns `dx^2 + dy^2`.
 */
export const distanceSquared = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => hypotenuseSquared2D(x2 - x1, y2 - y1);

/**
 * Calculates the distance between [`x1`, `y1`] and [`x2`, `y2`];
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns `√(dx^2 + dy^2)`.
 */
export const distance = (x1: number, y1: number, x2: number, y2: number) =>
  hypotenuse2D(x2 - x1, y2 - y1);
