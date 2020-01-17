import { Vector2D, RectangleRegion } from "../geometry";
import * as Kinematics from "./kinematics";
import * as SimpleDynamics from "./simple-dynamics";

/**
 * Calculates the impulse force by the bounce.
 * @param vx
 * @param vy
 * @param normalUnitVector The normal vector from the collision point.
 * @param restitution
 * @param target The target vector for storing the result.
 * @returns The `target` vector with assigned values.
 */
export const calculateForce = (
  vx: number,
  vy: number,
  normalUnitVector: Vector2D.Unit,
  restitution: number,
  target: Vector2D.Mutable.Unit
) => {
  const dotProduct = -(vx * normalUnitVector.x + vy * normalUnitVector.y);
  Vector2D.Assign.multiply(
    normalUnitVector,
    (1 + restitution) * dotProduct,
    target
  );

  return target;
};

/**
 * Constrains the position and updates the velocity if the position is out of `region`
 * so that it bounces at the region bounds.
 * @param quantity
 * @param region
 * @param restitution
 */
export const withinRectangle = (
  quantity: Kinematics.Quantity,
  region: RectangleRegion.Unit,
  restitution: number
) => {
  const { x, y } = quantity;

  const {
    topLeft: { x: minX, y: minY },
    bottomRight: { x: maxX, y: maxY }
  } = region;

  if (x < minX) {
    quantity.x = minX;
    quantity.vx = -restitution * quantity.vx;
  } else if (x >= maxX) {
    quantity.x = maxX - 1;
    quantity.vx = -restitution * quantity.vx;
  }

  if (y < minY) {
    quantity.y = minY;
    quantity.vy = -restitution * quantity.vy;
  } else if (y >= maxY) {
    quantity.y = maxY - 1;
    quantity.vy = -restitution * quantity.vy;
  }
};

/** A temporal vector for storing the impulsive force by the bounce. */
const bounceForce = Vector2D.Mutable.create();

/**
 * Calculates and adds the impulsive force by the bounce.
 * @param quantity
 * @param normalUnitVector
 * @param restitution
 */
export const addForce = (
  quantity: SimpleDynamics.Quantity,
  normalUnitVector: Vector2D.Unit,
  restitution: number
) =>
  SimpleDynamics.addForce(
    quantity,
    calculateForce(
      quantity.vx,
      quantity.vy,
      normalUnitVector,
      restitution,
      bounceForce
    )
  );

const normalUnitVector = Vector2D.Mutable.create();

/**
 * Calculates and adds the impulsive force by the bounce.
 * Note that the penetration will not be fixed.
 */
export const addForceEachOther = {
  calculate: (
    quantityA: SimpleDynamics.Quantity,
    quantityB: SimpleDynamics.Quantity,
    restitution: number
  ) => {
    const bRelativeVelocityX = quantityB.vx - quantityA.vx;
    const bRelativeVelocityY = quantityB.vy - quantityA.vy;
    Vector2D.Assign.normalizeBetween(quantityA, quantityB, normalUnitVector);
    calculateForce(
      bRelativeVelocityX,
      bRelativeVelocityY,
      normalUnitVector,
      restitution,
      bounceForce
    );
    SimpleDynamics.addForce(quantityB, bounceForce);
    Vector2D.Mutable.multiply(bounceForce, -1);
    SimpleDynamics.addForce(quantityA, bounceForce);
  },
  preCalculated: (
    quantityA: SimpleDynamics.Quantity,
    quantityB: SimpleDynamics.Quantity,
    bRelativeVelocityX: number,
    bRelativeVelocityY: number,
    normalUnitVectorToB: Vector2D.Unit,
    restitution: number
  ) => {
    calculateForce(
      bRelativeVelocityX,
      bRelativeVelocityY,
      normalUnitVectorToB,
      restitution,
      bounceForce
    );
    SimpleDynamics.addForce(quantityB, bounceForce);
    Vector2D.Mutable.multiply(bounceForce, -1);
    SimpleDynamics.addForce(quantityA, bounceForce);
  }
};

/**
 * Constrains the position and adds the force if the position is out of `region`
 * so that it bounces at the region bounds.
 * @param quantity
 * @param region
 * @param restitution
 */
export const addForceWithinRectangle = (
  quantity: SimpleDynamics.Quantity,
  region: RectangleRegion.Unit,
  restitution: number
) => {
  const { x, y } = quantity;

  const {
    topLeft: { x: minX, y: minY },
    bottomRight: { x: maxX, y: maxY }
  } = region;

  const forceFactor = 1 + restitution;

  if (x < minX) {
    quantity.x = minX;
    quantity.fx -= forceFactor * quantity.vx;
  } else if (x >= maxX) {
    quantity.x = maxX - 1;
    quantity.fx -= forceFactor * quantity.vx;
  }

  if (y < minY) {
    quantity.y = minY;
    quantity.fy -= forceFactor * quantity.vy;
  } else if (y >= maxY) {
    quantity.y = maxY - 1;
    quantity.fy -= forceFactor * quantity.vy;
  }
};
