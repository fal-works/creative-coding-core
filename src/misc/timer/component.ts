export interface Unit {
  /**
   * Function that steps the progress of timer component.
   * Returns `true` if the component is completed.
   */
  step: () => boolean;

  reset: () => Unit;

  isCompleted: boolean;
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
