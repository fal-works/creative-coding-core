export const returnVoid = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
export const returnUndefined = () => undefined;
export const returnNull = () => null;
export const returnZero = () => 0;
export const returnOne = () => 1;
export const returnTrue = () => true;
export const returnFalse = () => false;
export const returnArgument = <T>(argument: T) => argument;

/**
 * Runs `callback` without any arguments.
 * @param callback - Any function that can be run without any arguments.
 */
export const runSelf = <T>(callback: () => T) => callback();
