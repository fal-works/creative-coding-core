import { floor, abs } from "../math/numeric";
import { INVERSE60 } from "../math/constants";
import { Random } from "../math";

/**
 * Creates an array of HSV values with random hue ∈ [0, 360].
 * @param saturation
 * @param value
 * @return New array of HSV values.
 */
export const withRandomHue = (saturation: number, value: number) => [
  Random.value(360),
  saturation,
  value
];

/**
 * Converts HSV values (hue ∈ [0, 360], saturation ∈ [0, 1] and value ∈ [0, 1])
 * to RGB values (red, green, blue ∈ [0, 1]).
 * @param hsvValues
 * @return New array of RGB values.
 */
export const toRGB = (hsvValues: readonly number[]): readonly number[] => {
  const [hue, saturation, value] = hsvValues;
  const c = value * saturation; // chroma
  const dividedHue = hue * INVERSE60;
  const x = c * (1 - abs((dividedHue % 2) - 1));
  let tmpValues: readonly number[];

  switch (floor(dividedHue)) {
    case 0:
      tmpValues = [c, x, 0];
      break;
    case 1:
      tmpValues = [x, c, 0];
      break;
    case 2:
      tmpValues = [0, c, x];
      break;
    case 3:
      tmpValues = [0, x, c];
      break;
    case 4:
      tmpValues = [x, 0, c];
      break;
    case 5:
      tmpValues = [c, 0, x];
      break;
    default:
      tmpValues = [0, 0, 0];
      break;
  }

  const m = value - c;

  return [tmpValues[0] + m, tmpValues[1] + m, tmpValues[2] + m];
};
