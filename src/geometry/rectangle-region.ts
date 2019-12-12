import * as RectangleSize from "./rectangle-size";
import * as Vector2D from "./vector-2d";
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

export const createFromCenter = (
  centerPosition: Vector2D.Unit,
  size: RectangleSize.Unit
): Unit => {
  const { x, y } = centerPosition;
  const halfWidth = size.width / 2;
  const halfHeight = size.height / 2;
  return {
    topLeft: { x: x - halfWidth, y: y - halfHeight },
    rightBottom: { x: x + halfWidth, y: y + halfHeight }
  };
};

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

/**
 * Returns the center point of `region`.
 * Note that the result will be invalid if the region is infinite.
 * @param region
 * @return The center point.
 */
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

/**
 * Clones the given `RectangleRegion` instance;
 * @param region
 * @returns The cloned instance.
 */
export const copy = (region: Unit): Unit => ({
  topLeft: Vector2D.copy(region.topLeft),
  rightBottom: Vector2D.copy(region.rightBottom)
});

/**
 * @returns A `RectangleRegion` instance with `Infinity` values.
 */
export const createInfinite = (): Unit => ({
  topLeft: { x: -Infinity, y: -Infinity },
  rightBottom: { x: Infinity, y: Infinity }
});
