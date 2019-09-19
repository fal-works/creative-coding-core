import { Vector2D } from "./vector-2d";

export interface RectangleRegion {
  /**
   * The position of the top left corner of rectangle.
   */
  readonly topLeft: Vector2D;

  /**
   * The position of the right bottom corner of rectangle.
   */
  readonly rightBottom: Vector2D;
}
