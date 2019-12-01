import * as SimpleDynamics from "./simple-dynamics";
import * as Dynamics from "./dynamics";
import * as Vector2D from "../geometry/vector-2d";

export let constant = 1;
let minusConstant = -constant;
export const setConstant = (value: number) => {
  constant = value;
  minusConstant = -constant;
};

/**
 * Calculates gravitation force.
 * @param attractedRelative Relative position from attractor to attracted.
 * @param massProduct Pre-calcultad product of mass of attractor and attracted.
 * @param distance Pre-calculated distance.
 * @param target Vector to assign the result.
 * @returns The `target` vector with assigned gravitation force.
 */
export const calculateCore = (
  attractedRelative: Vector2D.Unit,
  massProduct: number,
  distance: number,
  target: Vector2D.Mutable.Unit
) =>
  Vector2D.Assign.multiply(
    attractedRelative,
    (minusConstant * massProduct) / (distance * distance * distance),
    target
  );

/**
 * Calculates gravitation force applied on point mass `attracted` exerted by point mass `attractor`.
 * @param attractor Object that has `x`, `y` and `mass`.
 * @param attracted Object that has `x`, `y` and `mass`.
 * @param target Vector to assign the result.
 * @returns The `target` vector with assigned gravitation force.
 */
export const calculate = (
  attractor: Dynamics.PointMass,
  attracted: Dynamics.PointMass,
  target: Vector2D.Mutable.Unit
) =>
  calculateCore(
    Vector2D.Assign.subtract(attracted, attractor, target),
    attractor.mass * attracted.mass,
    Vector2D.distance(attractor, attracted),
    target
  );

/**
 * Calculates gravitation force, assuming that the mass is always `1`.
 * @param attractedRelative Relative position from attractor to attracted.
 * @param distance Pre-calculated distance.
 * @param target Vector to assign the result.
 * @returns The `target` vector with assigned gravitation force.
 */
export const calculateCoreSimple = (
  attractedRelative: Vector2D.Unit,
  distance: number,
  target: Vector2D.Mutable.Unit
) =>
  Vector2D.Assign.multiply(
    attractedRelative,
    minusConstant / (distance * distance * distance),
    target
  );

/**
 * Calculates gravitation force applied on point `attracted` exerted by point `attractor`, assuming that the mass is always `1`.
 * @param attractor
 * @param attracted
 * @param target Vector to assign the result.
 * @returns The `target` vector with assigned gravitation force.
 */
export const calculateSimple = (
  attractor: Vector2D.Unit,
  attracted: Vector2D.Unit,
  target: Vector2D.Mutable.Unit
) =>
  calculateCoreSimple(
    Vector2D.Assign.subtract(attracted, attractor, target),
    Vector2D.distance(attractor, attracted),
    target
  );

/**
 * Adds gravitation force between `bodyA` and `bodyB`.
 * @param bodyA
 * @param bodyB
 * @param forceOnBodyB
 */
const addForceEachOther = (
  bodyA: SimpleDynamics.Quantity,
  bodyB: SimpleDynamics.Quantity,
  forceOnBodyB: Vector2D.Unit
) => {
  const { x: forceX, y: forceY } = forceOnBodyB;
  bodyA.fx -= forceX;
  bodyA.fy -= forceY;
  bodyB.fx += forceX;
  bodyB.fy += forceY;
};

const temporalGravitation = { x: 0, y: 0 };

/**
 * Set of functions that calculate gravitation force and apply it on the body.
 */
export const attract = {
  /**
   * Calculates gravitation force using pre-calculated values and applies it on `attracted`.
   * @param attracted
   * @param attractedRelative The relative position from the attractor to `attracted`.
   * @param massProduct The pre-calculated product of mass of the attractor and `attracted`
   * @param distance The pre-calculated distance between the attractor and `attracted`.
   */
  precalculated: (
    attracted: SimpleDynamics.Quantity,
    attractedRelative: Vector2D.Unit,
    massProduct: number,
    distance: number
  ) =>
    SimpleDynamics.addForce(
      attracted,
      calculateCore(
        attractedRelative,
        massProduct,
        distance,
        temporalGravitation
      )
    ),
  /**
   * Calculates gravitation force and applies it on `attracted`.
   */
  calculate: (attractor: Dynamics.PointMass, attracted: Dynamics.Quantity) =>
    SimpleDynamics.addForce(
      attracted,
      calculate(attractor, attracted, temporalGravitation)
    ),
  /**
   * Calculates gravitation force using pre-calculated distance and applies it on `attracted`,
   * assuming that the mass is always `1`.
   * @param attracted
   * @param attractedRelative The relative position from the attractor to `attracted`.
   * @param distance The pre-calculated distance between the attractor and `attracted`.
   */
  precalculatedSimple: (
    attracted: SimpleDynamics.Quantity,
    attractedRelative: Vector2D.Unit,
    distance: number
  ) =>
    SimpleDynamics.addForce(
      attracted,
      calculateCoreSimple(attractedRelative, distance, temporalGravitation)
    ),
  /**
   * Calculates gravitation force and applies it on `attracted`,
   * assuming that the mass is always `1`.
   */
  calculateSimple: (
    attractor: Vector2D.Unit,
    attracted: SimpleDynamics.Quantity
  ) =>
    SimpleDynamics.addForce(
      attracted,
      calculateSimple(attractor, attracted, temporalGravitation)
    )
};

/**
 * Set of functions that calculate gravitation force and apply it on both bodies.
 */
export const attractEachOther = {
  /**
   * Calculates gravitation force using pre-calculated values and applies it on both `bodyA` and `bodyB`.
   * @param bodyA
   * @param bodyB
   * @param bodyBRelative The relative position from `bodyA` to `bodyB`.
   * @param massProduct The pre-calculated product of mass of `bodyA` and `bodyB`
   * @param distance The pre-calculated distance between `bodyA` and `bodyB`.
   */
  precalculated: (
    bodyA: SimpleDynamics.Quantity,
    bodyB: SimpleDynamics.Quantity,
    bodyBRelative: Vector2D.Unit,
    massProduct: number,
    distance: number
  ) =>
    addForceEachOther(
      bodyA,
      bodyB,
      calculateCore(bodyBRelative, massProduct, distance, temporalGravitation)
    ),
  /**
   * Calculates gravitation force and applies it on both `bodyA` and `bodyB`.
   */
  calculate: (bodyA: Dynamics.Quantity, bodyB: Dynamics.Quantity) =>
    addForceEachOther(
      bodyA,
      bodyB,
      calculate(bodyA, bodyB, temporalGravitation)
    ),
  /**
   * Calculates gravitation force using pre-calculated distance and applies it on both `bodyA` and `bodyB`,
   * assuming that the mass is always `1`.
   * @param bodyA
   * @param bodyB
   * @param bodyBRelative The relative position from `bodyA` to `bodyB`.
   * @param distance The pre-calculated distance between `bodyA` and `bodyB`.
   */
  precalculatedSimple: (
    bodyA: SimpleDynamics.Quantity,
    bodyB: SimpleDynamics.Quantity,
    bodyBRelative: Vector2D.Unit,
    distance: number
  ) =>
    addForceEachOther(
      bodyA,
      bodyB,
      calculateCoreSimple(bodyBRelative, distance, temporalGravitation)
    ),
  /**
   * Calculates gravitation force and applies it on both `bodyA` and `bodyB`,
   * assuming that the mass is always `1`.
   */
  calculateSimple: (
    bodyA: SimpleDynamics.Quantity,
    bodyB: SimpleDynamics.Quantity
  ) =>
    addForceEachOther(
      bodyA,
      bodyB,
      calculateSimple(bodyA, bodyB, temporalGravitation)
    )
};
