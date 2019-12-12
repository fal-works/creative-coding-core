/**
 * The base random function that returns a random number from `0` up to (but not including) `1`.
 * Defaults to `Math.random`.
 * @returns A random value.
 */
export let random = Math.random;

/**
 * Returns random value from `0` up to (but not including) `1`.
 * @returns A random value.
 */
export let ratio = random;

/**
 * Sets `randomFunction` as the base function (which is initially set to `Math.random`)
 * so that it will be used as the base of all `Random` functions.
 * @param randomFunction - Any function that returns a (pseudo-)random number from `0` up to (but not including) `1`.
 */
export const setBaseFunction = (randomFunction: () => number) => {
  random = randomFunction;
  ratio = randomFunction;
};
