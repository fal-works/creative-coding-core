import { Vector2D } from "./vector-2d";
import { RectangleSize } from "./rectangle-size";
import { RectangleRegion } from "./rectangle-region";

export const create = (topLeftPosition: Vector2D, size: RectangleSize) => {
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
  region: RectangleRegion,
  point: Vector2D,
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
