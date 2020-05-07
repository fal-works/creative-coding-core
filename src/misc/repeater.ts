export interface Unit {
  callback: () => void;
  frequency: number;
  accumulation: number;
}

/**
 * Creates a `Repeater` unit.
 * @param callback
 * @param frequency Frequency per frame for running `callback`. Defaults to `1`.
 * @returns A new `Repeater` unit.
 */
export const create = (callback: () => void, frequency = 1) => ({
  callback,
  frequency,
  accumulation: 0,
});

/**
 * Runs a `Repeater` unit.
 * @param repeater
 */
export const run = (repeater: Unit) => {
  repeater.accumulation += repeater.frequency;

  while (repeater.accumulation >= 1) {
    repeater.accumulation -= 1;
    repeater.callback();
  }
};

/**
 * Resets a `Repeater` unit.
 * @param repeater
 */
export const reset = (repeater: Unit) => {
  repeater.accumulation = 0;
};
