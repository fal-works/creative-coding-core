import { RectangleSize, Vector2D } from "./";

export interface Unit {
  /**
   * The position of the top left corner of rectangle.
   */
  readonly topLeft: Vector2D.Unit;

  /**
   * The position of the right bottom corner of rectangle.
   */
  readonly rightBottom: Vector2D.Unit;
}

export const create = (
  topLeftPosition: Vector2D.Unit,
  size: RectangleSize.Unit
): Unit => {
  return {
    topLeft: topLeftPosition,
    rightBottom: {
      x: topLeftPosition.x + size.width,
      y: topLeftPosition.y + size.height
    }
  };
};

/**
 * Checks if `region` contains `point`.
 * @param region
 * @param point
 * @param margin
 * @return `true` if contained.
 */
export const containsPoint = (
  region: Unit,
  point: Vector2D.Unit,
  margin: number
): boolean => {
  const { topLeft, rightBottom } = region;
  const { x, y } = point;

  return (
    x >= topLeft.x + margin &&
    y >= topLeft.y + margin &&
    x < rightBottom.x - margin &&
    y < rightBottom.y - margin
  );
};
