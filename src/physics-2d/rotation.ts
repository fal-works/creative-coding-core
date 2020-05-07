import { Mutable } from "../types";
import { Random } from "../math";

export interface StaticQuantity {
  readonly rotationAngle: number;
}

export interface Quantity extends Mutable<StaticQuantity> {
  rotationVelocity: number;
}

/**
 * Updates rotation by adding `rotationVelocity` to `rotationAngle`.
 * @param quantity
 */
export const update = (quantity: Quantity) => {
  quantity.rotationAngle += quantity.rotationVelocity;
};

/**
 * Creates a new rotation quantity with random initial angle, random rotation direction and
 * random rotational speed within the given range.
 * @param minRotationSpeed
 * @param maxRotationSpeed
 * @returns New `Rotation.Quantity`.
 */
export const createRandomQuantity = (
  minRotationSpeed: number,
  maxRotationSpeed: number
): Quantity => {
  return {
    rotationAngle: Random.angle(),
    rotationVelocity: Random.signed(
      Random.between(minRotationSpeed, maxRotationSpeed)
    ),
  };
};
