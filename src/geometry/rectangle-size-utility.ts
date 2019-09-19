import { RectangleSize } from "./rectangle-size";

/**
 * Calculates the aspect ratio i.e. `width / height`.
 * @param size
 */
export const getAspectRatio = (size: RectangleSize): number =>
  size.width / size.height;

/**
 * Calculates the area i.e. `width * height`.
 * @param size
 */
export const getArea = (size: RectangleSize): number =>
  size.width * size.height;
