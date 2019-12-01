import * as Vector2D from "../geometry/vector-2d";
import * as Numeric from "../math/numeric";
import * as RectangleRegion from "../geometry/rectangle-region";

export interface Quantity extends Vector2D.Mutable.Unit {
  vx: number;
  vy: number;
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
    vy: vy || 0
  };
};

export interface VerletQuantity extends Quantity {
  /**
   * vx2: variable for temporaly storing vx(t + 0.5dt)
   */
  vx2: number;
  /**
   * vy2: variable for temporaly storing vy(t + 0.5dt)
   */
  vy2: number;
}

/**
 * Updates the kinematic quantity naively by Euler method, i.e. adding velocity to position.
 * @param quantity
 */
export const updateEuler = (quantity: Quantity) => {
  quantity.x += quantity.vx;
  quantity.y += quantity.vy;
};

/**
 * Updates the kinematic quantity naively by Euler method,
 * i.e. adding velocity to position and adding acceleration to velocity.
 * @param quantity
 * @param ax
 * @param ay
 */
export const updateEulerAccelerated = (
  quantity: Quantity,
  ax: number,
  ay: number
) => {
  quantity.x += quantity.vx;
  quantity.y += quantity.vy;
  quantity.vx += ax;
  quantity.vy += ay;
};

/**
 * Updates the kinematic quantity by Velocity Verlet method.
 * Be sure to use `postUpdateVerlet()` with updated acceleration values after using this function.
 *
 * Not sure if this implementation is correct!
 * @param quantity
 */
export const updateVerlet = (
  quantity: VerletQuantity,
  ax: number,
  ay: number
) => {
  quantity.vx2 = quantity.vx + 0.5 * ax;
  quantity.vy2 = quantity.vy + 0.5 * ay;
  quantity.vx += ax;
  quantity.vy += ay;
  quantity.x += quantity.vx2;
  quantity.y += quantity.vy2;
};

/**
 * Completes updating the kinematic quantity by Velocity Verlet method after updating the force.
 *
 * Not sure if this implementation is correct!
 * @param quantity
 */
export const postUpdateVerlet = (
  quantity: VerletQuantity,
  ax: number,
  ay: number
) => {
  quantity.vx = quantity.vx2 + 0.5 * ax;
  quantity.vy = quantity.vy2 + 0.5 * ay;
};

/**
 * Assigns position values to `target` vector.
 * @param quantity
 * @param target
 * @returns `target` vector with assigned position.
 */
export const positionVector = (
  quantity: Quantity,
  target: Vector2D.Mutable.Unit
) => Vector2D.Assign.setCartesian(quantity.x, quantity.y, target);

/**
 * Extracts velocity values to `target` vector.
 * @param quantity
 * @param target
 * @returns `target` vector with assigned velocity.
 */
export const velocityVector = (
  quantity: Quantity,
  target: Vector2D.Mutable.Unit
) => Vector2D.Assign.setCartesian(quantity.vx, quantity.vy, target);

/**
 * Returns the speed.
 * @param quantity
 * @returns The speed.
 */
export const getSpeed = (quantity: Quantity) =>
  Numeric.hypotenuse2D(quantity.vx, quantity.vy);

/**
 * Returns the velocity angle.
 * @param quantity
 * @returns The angle.
 */
export const getVelocityAngle = (quantity: Quantity) =>
  Numeric.atan2safe(quantity.vy, quantity.vx);

/**
 * Truncates the speed (magnitude of velocity) if it is greater than `maxSpeed`.
 * @param quantity
 * @param maxSpeed
 * @returns The `quantity` instance with truncated velocity values.
 */
export const truncateVelocity = (quantity: Quantity, maxSpeed: number) => {
  const { vx, vy } = quantity;
  if (Numeric.hypotenuseSquared2D(vx, vy) <= maxSpeed * maxSpeed)
    return quantity;

  const angle = Numeric.atan2(vy, vx);
  quantity.vx = maxSpeed * Numeric.cos(angle);
  quantity.vy = maxSpeed * Numeric.sin(angle);
  return quantity;
};

/**
 * Set values of `velocity` to `quantity`.
 * @param quantity
 * @param velocity
 * @returns The `quantity` instance with assigned velocity.
 */
export const setVelocity = (
  quantity: Quantity,
  velocity: Vector2D.Unit
): Quantity => {
  quantity.vx = velocity.x;
  quantity.vy = velocity.y;
  return quantity;
};

/**
 * Set velocity values to `quantity`.
 * @param quantity
 * @param velocity
 * @returns The `quantity` instance with assigned velocity.
 */
export const setVelocityCartesian = (
  quantity: Quantity,
  vx: number,
  vy: number
): Quantity => {
  quantity.vx = vx;
  quantity.vy = vy;
  return quantity;
};

/**
 * Set velocity values to `quantity`.
 * @param quantity
 * @param velocity
 * @returns The `quantity` instance with assigned velocity.
 */
export const setVelocityPolar = (
  quantity: Quantity,
  length: number,
  angle: number
): Quantity => {
  quantity.vx = length * Numeric.cos(angle);
  quantity.vy = length * Numeric.sin(angle);
  return quantity;
};

/**
 * Let `quantity` bounce if it is out of `region`.
 * @param region
 * @param coefficientOfRestitution
 * @param quantity
 * @returns `true` if bounced.
 */
export const bounceInRectangleRegion = (
  region: RectangleRegion.Unit,
  coefficientOfRestitution: number,
  quantity: Quantity
): boolean => {
  const { x, y, vx, vy } = quantity;
  const { x: leftX, y: topY } = region.topLeft;
  const { x: rightX, y: bottomY } = region.rightBottom;

  if (x < leftX) {
    quantity.x = leftX;
    if (vx < 0) quantity.vx = -coefficientOfRestitution * vx;
    return true;
  } else if (x >= rightX) {
    quantity.x = rightX - 1;
    if (vx > 0) quantity.vx = -coefficientOfRestitution * vx;
    return true;
  }

  if (y < topY) {
    quantity.y = topY;
    if (vy < 0) quantity.vy = -coefficientOfRestitution * vy;
    return true;
  } else if (y >= bottomY) {
    quantity.y = bottomY - 1;
    if (vy > 0) quantity.vy = -coefficientOfRestitution * vy;
    return true;
  }

  return false;
};
