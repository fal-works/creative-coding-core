import * as Kinematics from "./kinematics";
import * as SimpleDynamics from "./simple-dynamics";
import * as Vector2D from "../geometry/vector-2d";

export interface PointMass extends Vector2D.Mutable.Unit {
  mass: number;
}

export interface Quantity extends SimpleDynamics.Quantity, PointMass {}

export const createQuantity = (
  x: number,
  y: number,
  mass: number,
  vx?: number,
  vy?: number
): Quantity => {
  return {
    x,
    y,
    vx: vx || 0,
    vy: vy || 0,
    fx: 0,
    fy: 0,
    mass,
  };
};

export interface VerletQuantity
  extends SimpleDynamics.VerletQuantity,
    PointMass {}

export const createVerletQuantity = (
  x: number,
  y: number,
  mass: number,
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
    fy: 0,
    mass,
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
  const { mass } = quantity;
  Kinematics.updateEulerAccelerated(
    quantity,
    quantity.fx / mass,
    quantity.fy / mass
  );
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
  const { mass } = quantity;
  Kinematics.updateVerlet(quantity, quantity.fx / mass, quantity.fy / mass);
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
  const { mass } = quantity;
  Kinematics.postUpdateVerlet(quantity, quantity.fx / mass, quantity.fy / mass);
};
