import * as Vector2D from "./vector-2d";
import * as MutableVector2D from "./mutable";
import * as AssignVector2D from "./assign";

const tmpVectorAP = MutableVector2D.create();
const tmpVectorAB = MutableVector2D.create();

/**
 * Returns the position on the line segment AB
 * which is closest to the reference point P.
 * @param P - The position of the reference point.
 * @param A - The position of the line segment start point.
 * @param B - The position of the line segment end point.
 * @param target - The vector to receive the result.
 * @returns Either `target`, `A` or `B`.
 */
export function getClosestPosition(
  P: Vector2D.Unit,
  A: Vector2D.Unit,
  B: Vector2D.Unit,
  target: MutableVector2D.Unit
): MutableVector2D.Unit {
  AssignVector2D.subtract(P, A, tmpVectorAP);
  AssignVector2D.subtract(B, A, tmpVectorAB);

  const lengthSquaredAB = Vector2D.lengthSquared(tmpVectorAB);
  const dotProductAPAB = Vector2D.dot(tmpVectorAP, tmpVectorAB);

  // The distance ratio of AX to AB (X = the closest point)
  const distanceRatioAX = dotProductAPAB / lengthSquaredAB;

  if (distanceRatioAX <= 0) return A;
  if (distanceRatioAX >= 1) return B;

  const vectorAX = MutableVector2D.multiply(tmpVectorAB, distanceRatioAX);
  AssignVector2D.add(A, vectorAX, target);

  return target;
}
