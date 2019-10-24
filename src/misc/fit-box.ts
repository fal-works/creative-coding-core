import { Unit } from "../geometry/rectangle-size";
import { min } from "../math/numeric";

/**
 * Parameter for `getScaleFactor()`.
 * `FIT_TO_BOX` checks both width and height and returns the smaller scale factor.
 */
export const enum FittingOption {
  FIT_TO_BOX = "FIT_TO_BOX",
  FIT_WIDTH = "FIT_WIDTH",
  FIT_HEIGHT = "FIT_HEIGHT"
}

/**
 * Calculates the scale factor for fitting `nonScaledSize` to `targetSize` keeping the original aspect ratio.
 *
 * @param nonScaledSize
 * @param targetSize
 * @param fittingOption Defaults to `FIT_TO_BOX`.
 */
export const calculateScaleFactor = (
  nonScaledSize: Unit,
  targetSize: Unit,
  fittingOption?: FittingOption
): number => {
  switch (fittingOption) {
    default:
    case FittingOption.FIT_TO_BOX:
      return min(
        targetSize.width / nonScaledSize.width,
        targetSize.height / nonScaledSize.height
      );

    case FittingOption.FIT_WIDTH:
      return targetSize.width / nonScaledSize.width;

    case FittingOption.FIT_HEIGHT:
      return targetSize.height / nonScaledSize.height;
  }
};
