export const returnVoid = () => {};
export const returnUndefined = () => undefined;
export const returnNull = () => null;
export const returnZero = () => 0;
export const returnOne = () => 1;

/**
 * Runs `callback` without any arguments.
 * @param callback - Any function that can be run without any arguments.
 */
export const runSelf = <T>(callback: () => T) => callback();
