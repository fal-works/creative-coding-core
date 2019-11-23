export interface Unit {
  /**
   * Function that steps the progress of timer component.
   * @return `true` if the component is completed.
   */
  step: () => boolean;

  reset: () => Unit;

  isCompleted: boolean;
}

export const step = (component: Unit) => component.step();
export const reset = (component: Unit) => component.reset();
