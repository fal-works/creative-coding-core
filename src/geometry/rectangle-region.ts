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
  readonly bottomRight: Vector2D.Unit;
}

export const create = (
  topLeftPosition: Vector2D.Unit,
  size: RectangleSize.Unit
): Unit => ({
  topLeft: topLeftPosition,
  bottomRight: {
    x: topLeftPosition.x + size.width,
    y: topLeftPosition.y + size.height,
  },
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
    bottomRight: { x: x + halfWidth, y: y + halfHeight },
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
  const { topLeft, bottomRight } = region;
  const { x, y } = point;

  return (
    x >= topLeft.x + margin &&
    y >= topLeft.y + margin &&
    x < bottomRight.x - margin &&
    y < bottomRight.y - margin
  );
};

export const getWidth = (region: Unit) =>
  region.bottomRight.x - region.topLeft.x;

export const getHeight = (region: Unit) =>
  region.bottomRight.y - region.topLeft.y;

export const getSize = (region: Unit) => {
  const { topLeft, bottomRight } = region;
  return {
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y,
  };
};

/**
 * Returns the center point of `region`.
 * Note that the result will be invalid if the region is infinite.
 * @param region
 * @return The center point.
 */
export const getCenterPoint = (region: Unit): Vector2D.Unit => {
  const { topLeft, bottomRight } = region;
  return {
    x: (topLeft.x + bottomRight.x) / 2,
    y: (topLeft.y + bottomRight.y) / 2,
  };
};

export const enum ScaleOriginType {
  TopLeft,
  Center,
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
): Unit => {
  const { topLeft, bottomRight } = region;
  switch (originType) {
    case ScaleOriginType.TopLeft:
      return {
        topLeft,
        bottomRight: {
          x: lerp(topLeft.x, bottomRight.x, scaleFactor),
          y: lerp(topLeft.y, bottomRight.y, scaleFactor),
        },
      };
    case ScaleOriginType.Center: {
      const center = getCenterPoint(region);
      const size = getSize(region);
      const halfWidth = scaleFactor * (size.width / 2);
      const halfHeight = scaleFactor * (size.height / 2);
      return {
        topLeft: {
          x: center.x - halfWidth,
          y: center.y - halfHeight,
        },
        bottomRight: {
          x: center.x + halfWidth,
          y: center.y + halfHeight,
        },
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
  bottomRight: Vector2D.copy(region.bottomRight),
});

/**
 * @returns A `RectangleRegion` instance with `Infinity` values.
 */
export const createInfinite = (): Unit => ({
  topLeft: { x: -Infinity, y: -Infinity },
  bottomRight: { x: Infinity, y: Infinity },
});

/**
 * Creates a new `RectangleRegion` by adding `margin` to `region`.
 * @param region
 * @param margin
 * @returns A new `RectangleRegion` unit.
 */
export const addMargin = (region: Unit, margin: number): Unit => {
  const { topLeft: originalTopLeft, bottomRight: originalBottomRight } = region;

  return {
    topLeft: {
      x: originalTopLeft.x - margin,
      y: originalTopLeft.y - margin,
    },
    bottomRight: {
      x: originalBottomRight.x + margin,
      y: originalBottomRight.y + margin,
    },
  };
};

/**
 * Creates a new `RectangleRegion` by adding `margins` to `region`.
 * @param region
 * @param margins
 * @returns A new `RectangleRegion` unit.
 */
export const addMargins = (
  region: Unit,
  margins: { top: number; left: number; bottom: number; right: number }
): Unit => {
  const { topLeft: originalTopLeft, bottomRight: originalBottomRight } = region;

  return {
    topLeft: {
      x: originalTopLeft.x - margins.left,
      y: originalTopLeft.y - margins.top,
    },
    bottomRight: {
      x: originalBottomRight.x + margins.right,
      y: originalBottomRight.y + margins.bottom,
    },
  };
};
