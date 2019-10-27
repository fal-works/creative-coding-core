/**
 * Runs `callback` once for each element of `array` from index `start` up to (but not including) `end`.
 * Unlike `Array.prototype.forEach()`, an element of `array` should not be removed during the iteration.
 * @param array
 * @param callback
 */
export const loopRange = <T>(
  array: readonly T[],
  callback: (currentValue: T, index: number, array: readonly T[]) => void,
  start: number,
  end: number
): void => {
  for (let i = start; i < end; i += 1) callback(array[i], i, array);
};

/**
 * Runs `callback` once for each element of `array`.
 * Unlike `Array.prototype.forEach()`, an element of `array` should not be removed during the iteration.
 * @param array
 * @param callback
 */
export const loop = <T>(
  array: readonly T[],
  callback: (currentValue: T, index: number, array: readonly T[]) => void
): void => loopRange(array, callback, 0, array.length);

/**
 * Runs `callback` once for each element of `array` from index `start` up to (but not including) `end` in descending order.
 * @param array
 * @param callback
 */
export const loopRangeBackwards = <T>(
  array: readonly T[],
  callback: (currentValue: T, index: number, array: readonly T[]) => void,
  start: number,
  end: number
): void => {
  let index = end;
  while (index > start) {
    --index;
    callback(array[index], index, array);
  }
};

/**
 * Runs `callback` once for each element of `array` in descending order.
 * @param array
 * @param callback
 */
export const loopBackwards = <T>(
  array: readonly T[],
  callback: (currentValue: T, index: number, array: readonly T[]) => void
): void => loopRangeBackwards(array, callback, 0, array.length);

/**
 * Joins two arrays within the specified range and runs `callback` once for each joined pair.
 * You should not remove elements from arrays during the iteration.
 * @param arrayA
 * @param arrayB
 * @param callback
 * @param endA
 * @param endB
 */
export const nestedLoopJoinWithRange = <T, U>(
  arrayA: readonly T[],
  arrayB: readonly U[],
  callback: (elementA: T, elementB: U) => void,
  startA: number,
  endA: number,
  startB: number,
  endB: number
): void => {
  for (let i = startA; i < endA; i += 1) {
    for (let k = startB; k < endB; k += 1) callback(arrayA[i], arrayB[k]);
  }
};

/**
 * Joins two arrays and runs `callback` once for each joined pair.
 * You should not remove elements from arrays during the iteration.
 * @param arrayA
 * @param arrayB
 * @param callback
 */
export const nestedLoopJoin = <T, U>(
  arrayA: readonly T[],
  arrayB: readonly U[],
  callback: (elementA: T, elementB: U) => void
): void =>
  nestedLoopJoinWithRange(
    arrayA,
    arrayB,
    callback,
    0,
    arrayA.length,
    0,
    arrayB.length
  );

/**
 * Runs `callback` once for each pair within `array` from index `start` up to (but not including) `end`.
 * @param array
 * @param callback
 */
export const roundRobinWithRange = <T>(
  array: readonly T[],
  callback: (element: T, otherElement: T) => void,
  start: number,
  end: number
): void => {
  const iLen = end - 1;
  for (let i = start; i < iLen; i += 1) {
    for (let k = i + 1; k < end; k += 1) callback(array[i], array[k]);
  }
};

/**
 * Runs `callback` once for each pair within `array`.
 * @param array
 * @param callback
 */
export const roundRobin = <T>(
  array: readonly T[],
  callback: (element: T, otherElement: T) => void
): void => roundRobinWithRange(array, callback, 0, array.length);

/**
 * Creates a new 1-dimensional array by concatenating sub-array elements of a 2-dimensional array.
 * @param arrays
 * @return A new 1-dimensional array.
 */
// eslint-disable-next-line prefer-spread
export const flatNaive = <T>(arrays: readonly T[][]): readonly T[] =>
  ([] as T[]).concat(...arrays);

export type ArrayOrValue<T> = T | T[];

/**
 * An alternative to `Array.prototype.flat()`.
 * @param array
 * @param depth
 * @return A new array.
 */
export const flatRecursive = <T>(array: ArrayOrValue<T>[], depth = 1) =>
  depth > 0
    ? array.reduce(
        (acc: ArrayOrValue<T>[], cur): ArrayOrValue<T>[] =>
          acc.concat(Array.isArray(cur) ? flatRecursive(cur, depth - 1) : cur),
        []
      )
    : array;

/**
 * Fills `array` by running `factory` and assigning the result for each index of `array`.
 * @param array
 * @param factory A function that returns a new element for assigning to `array`.
 * @param length The length to populate. Default value is `array.length`.
 * @return Filled `array`.
 */
export const populate = <T>(
  array: T[],
  factory: (index: number) => T,
  length?: number
): T[] => {
  const len = length || array.length;
  for (let i = 0; i < len; i += 1) array[i] = factory(i);

  return array;
};

/**
 * Creates a new array filled by running `factory` for each index and assigning the result.
 * @param factory
 * @param length
 * @return A new populated array.
 */
export const createPopulated = <T>(
  factory: (index: number) => T,
  length: number
): T[] => populate(new Array<T>(length), factory);
