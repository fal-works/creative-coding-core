import { ArrayUtility } from "../../ds";

export interface Unit {
  readonly onComplete: (() => void)[];
  isCompleted: boolean;

  /**
   * Function that steps the progress of timer component.
   * Returns `true` if the component is completed.
   */
  step(): boolean;

  /**
   * Function that resets the progress of timer component.
   * Returns `this` instance.
   */
  reset(): Unit;

  /**
   * Function that immediately completes the progress of timer component.
   * Always returns `true`.
   */
  complete(): boolean;
}

/**
 * Callback function for running `component.step()`.
 * @param component
 */
export const step = (component: Unit) => component.step();

/**
 * Callback function for running `component.reset()`.
 * @param component
 */
export const reset = (component: Unit) => component.reset();

/**
 * Base class for other classes implementing `Component`.
 */
export abstract class Base implements Unit {
  protected constructor(
    readonly onComplete: (() => void)[],
    public isCompleted: boolean
  ) {}

  abstract step(): boolean;

  abstract reset(): Unit;

  /**
   * Runs all functions in `this.onComplete`, and sets `this.isCompleted` to `true`.
   * @returns `true`.
   */
  complete(): boolean {
    ArrayUtility.loopRun(this.onComplete);

    return (this.isCompleted = true);
  }
}
