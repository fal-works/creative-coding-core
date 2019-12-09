import { RectangleSize, Vector2D } from "./";
import { lerp } from "../math/numeric";

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
): Unit => ({
  topLeft: topLeftPosition,
  rightBottom: {
    x: topLeftPosition.x + size.width,
    y: topLeftPosition.y + size.height
  }
});

/**
 * Checks if `region` contains `point`.
 * @param region
 * @param point
 * @param margin
 * @returns `true` if contained.
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

export const getWidth = (region: Unit) =>
  region.rightBottom.x - region.topLeft.x;

export const getHeight = (region: Unit) =>
  region.rightBottom.y - region.topLeft.y;

export const getSize = (region: Unit) => {
  const { topLeft, rightBottom } = region;
  return {
    width: rightBottom.x - topLeft.x,
    height: rightBottom.y - topLeft.y
  };
};

export const getCenterPoint = (region: Unit): Vector2D.Unit => {
  const { topLeft, rightBottom } = region;
  return {
    x: (topLeft.x + rightBottom.x) / 2,
    y: (topLeft.y + rightBottom.y) / 2
  };
};

export const enum ScaleOriginType {
  TopLeft,
  Center
}

/**
 * Creates a new `RectangleRegion` by scaling `region` with `scaleFactor`.
 * @param region
 * @param scaleFactor
 * @param originType
 * @returns A new scaled `RectangleRegion` unit.
 */
export const createScaled = (
  region: Unit,
  scaleFactor: number,
  originType: ScaleOriginType
) => {
  const { topLeft, rightBottom } = region;
  switch (originType) {
    case ScaleOriginType.TopLeft:
      return {
        topLeft,
        rightBottom: {
          x: lerp(topLeft.x, rightBottom.x, scaleFactor),
          y: lerp(topLeft.y, rightBottom.y, scaleFactor)
        }
      };
    case ScaleOriginType.Center: {
      const center = getCenterPoint(region);
      const size = getSize(region);
      const halfWidth = size.width / 2;
      const halfHeight = size.height / 2;
      return {
        topLeft: {
          x: center.x - halfWidth,
          y: center.y - halfHeight
        },
        rightBottom: {
          x: center.x + halfWidth,
          y: center.y + halfHeight
        }
      };
    }
  }
};
