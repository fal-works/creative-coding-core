import * as Vector2D from "../geometry/vector-2d";
import * as Numeric from "../math/numeric";
import * as Kinematics from "./kinematics";

export interface Quantity extends Kinematics.Quantity {
  fx: number;
  fy: number;
}

export const createQuantity = (
  x: number,
  y: number,
  vx?: number,
  vy?: number
): Quantity => {
  return {
    x,
    y,
    vx: vx || 0,
    vy: vy || 0,
    fx: 0,
    fy: 0
  };
};

export interface VerletQuantity extends Kinematics.VerletQuantity, Quantity {}

export const createVerletQuantity = (
  x: number,
  y: number,
  vx?: number,
  vy?: number
): VerletQuantity => {
  return {
    x,
    y,
    vx: vx || 0,
    vy: vy || 0,
    vx2: 0,
    vy2: 0,
    fx: 0,
    fy: 0
  };
};

/**
 * Updates the kinematic quantity naively by Euler method. Applies the below:
 * 1. Update position by adding velocity.
 * 2. Update velocity by applying force.
 * 3. Clear force to zero.
 *
 * Not sure if this implementation is correct!
 * @param quantity
 */
export const updateEuler = (quantity: Quantity) => {
  Kinematics.updateEulerAccelerated(quantity, quantity.fx, quantity.fy); // assuming that the mass is 1
  quantity.fx = 0;
  quantity.fy = 0;
};

/**
 * Updates the kinematic quantity by Velocity Verlet method.
 * Be sure to update force after running this function and then run `postUpdateVerlet()`.
 *
 * Not sure if this implementation is correct!
 * @param quantity
 */
export const updateVerlet = (quantity: VerletQuantity) => {
  Kinematics.updateVerlet(quantity, quantity.fx, quantity.fy); // assuming that the mass is 1
  quantity.fx = 0;
  quantity.fy = 0;
};

/**
 * Completes updating the kinematic quantity by Velocity Verlet method after updating the force.
 *
 * Not sure if this implementation is correct!
 * @param quantity
 */
export const postUpdateVerlet = (quantity: VerletQuantity) => {
  Kinematics.postUpdateVerlet(quantity, quantity.fx, quantity.fy);
  quantity.fx = 0;
  quantity.fy = 0;
};

/**
 * Extracts force values to `target` vector.
 * @param quantity
 * @param target
 * @return `target` vector with assigned acceleration.
 */
export const forceVector = (
  quantity: Quantity,
  target: Vector2D.Mutable.Unit
) => Vector2D.Assign.setCartesian(quantity.fx, quantity.fy, target);

/**
 * Truncates the magnitude of force if it is greater than `maxMagnitude`.
 * @param quantity
 * @param maxSpeed
 * @return The `quantity` instance with truncated force values.
 */
export const truncateForce = (quantity: Quantity, maxMagnitude: number) => {
  const { fx, fy } = quantity;
  if (Numeric.hypotenuseSquared2D(fx, fy) <= maxMagnitude * maxMagnitude)
    return quantity;

  const angle = Numeric.atan2(fy, fx);
  quantity.fx = maxMagnitude * Numeric.cos(angle);
  quantity.fy = maxMagnitude * Numeric.sin(angle);
  return quantity;
};

/**
 * Adds `force` to `quantity`.
 * @param quantity
 * @param force
 * @return The `quantity` instance with assigned force.
 */
export const addForce = (quantity: Quantity, force: Vector2D.Unit) => {
  quantity.fx += force.x;
  quantity.fy += force.y;
  return quantity;
};

/**
 * Adds force values to `quantity`.
 * @param quantity
 * @param fx
 * @param fy
 * @return The `quantity` instance with assigned force.
 */
export const addForceCartesian = (
  quantity: Quantity,
  fx: number,
  fy: number
) => {
  quantity.fx += fx;
  quantity.fy += fy;
  return quantity;
};

/**
 * Adds force values to `quantity`.
 * @param quantity
 * @param magnitude
 * @param angle
 * @return The `quantity` instance with assigned force.
 */
export const addForcePolar = (
  quantity: Quantity,
  magnitude: number,
  angle: number
) => {
  quantity.fx += magnitude * Numeric.cos(angle);
  quantity.fy += magnitude * Numeric.sin(angle);
  return quantity;
};
