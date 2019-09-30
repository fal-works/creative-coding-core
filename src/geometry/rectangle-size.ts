/**
 * Object that has width and height of a rectangle.
 */
export interface Unit {
  readonly width: number;
  readonly height: number;
}

/**
 * Calculates the aspect ratio i.e. `width / height`.
 * @param size
 */
export const getAspectRatio = (size: Unit): number => size.width / size.height;

/**
 * Calculates the area i.e. `width * height`.
 * @param size
 */
export const getArea = (size: Unit): number => size.width * size.height;
