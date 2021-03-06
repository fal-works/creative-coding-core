import * as Arrays from "./../arrays";
import * as ArrayCollection from "../array-collection";

/**
 * A basic array-based list.
 * Used for avoiding reallocation by adding or removing elements of `Array`.
 */
export type Unit<T> = ArrayCollection.Unit<T>;

export const create: <T>(initialCapacity: number) => Unit<T> =
  ArrayCollection.create;

export const createFilled: <T>(size: number, value: T) => Unit<T> =
  ArrayCollection.createFilled;

export const createPopulated: <T>(
  size: number,
  factory: (index: number) => T
) => Unit<T> = ArrayCollection.createPopulated;

export const fromArray: <T>(array: T[]) => Unit<T> = ArrayCollection.fromArray;

export { clear, clearReference, isEmpty, isFull } from "../array-collection";

/**
 * Adds `element` to `arrayList`.
 * @param arrayList
 * @param element
 */
export const add = <T>(arrayList: Unit<T>, element: T): void => {
  arrayList.array[arrayList.size] = element;
  arrayList.size += 1;
};

/**
 * Adds `element` to `arrayList`. Same as `add()`.
 * @param arrayList
 * @param element
 */
export const push = add;

/**
 * Removes and returns the last element of `arrayList`.
 * Be sure that `arrayList` is not empty.
 * @param arrayList
 * @returns The last element of `arrayList`.
 */
export const pop = <T>(arrayList: Unit<T>): T => {
  const lastIndex = arrayList.size - 1;
  const removedElement = arrayList.array[lastIndex];
  arrayList.size = lastIndex;

  return removedElement;
};

/**
 * Returns the element of `arrayList` at `index`.
 * @param arrayList
 * @returns The element of `arrayList` at `index`.
 */
export const get = <T>(arrayList: Unit<T>, index: number): T =>
  arrayList.array[index];

/**
 * Returns the last element of `arrayList`.
 * Be sure that `arrayList` is not empty.
 * @param arrayList
 * @returns The last element of `arrayList`.
 */
export const peek = <T>(arrayList: Unit<T>): T =>
  arrayList.array[arrayList.size - 1];

/**
 * Returns the last element of `arrayList`.
 * Be sure that `arrayList` is not empty.
 * Same as `peek()`.
 * @param arrayList
 * @returns The last element of `arrayList`.
 */
export const getLast = peek;

/**
 * Adds all elements of `array` to `arrayList`.
 * @param arrayList
 * @param array
 */
export const addArray = <T>(arrayList: Unit<T>, array: readonly T[]): void => {
  const { array: thisArray, size: destinaionPosition } = arrayList;
  const len = array.length;
  let i = len;
  while (i) {
    i -= 1;
    thisArray[destinaionPosition + i] = array[i];
  }
  arrayList.size += len;
};

/**
 * Adds all elements of `source` to `destination`.
 * @param destination
 * @param source
 */
export const addList = <T>(destination: Unit<T>, source: Unit<T>): void => {
  const { array: destinationArray, size: destinaionPosition } = destination;
  const { array: sourceArray, size: len } = source;
  let i = len;
  while (i) {
    i -= 1;
    destinationArray[destinaionPosition + i] = sourceArray[i];
  }
  destination.size += len;
};

/**
 * Nullifies the slots that are not used.
 * @param arrayList
 */
export const cleanUnusedSlots = <T>(arrayList: Unit<T>): void => {
  const { array, size } = arrayList;
  const capacity = array.length;
  array.length = size;
  array.length = capacity;
};

/**
 * Runs `callback` for each element of `arrayList`.
 * @param arrayList
 * @param callback
 */
export const loop = <T>(
  arrayList: Unit<T>,
  callback: (value: T, index: number, array: readonly T[]) => void
): void => Arrays.loopRange(arrayList.array, callback, 0, arrayList.size);

/**
 * Runs `callback` for each element of `arrayList` in descending order.
 * @param arrayList
 * @param callback
 */
export const loopBackwards = <T>(
  arrayList: Unit<T>,
  callback: (value: T, index: number, array: readonly T[]) => void
): void =>
  Arrays.loopRangeBackwards(arrayList.array, callback, 0, arrayList.size);

/**
 * Finds the first element where `predicate` returns true.
 * @param arrayList
 * @param predicate Function that returns `true` if a given value matches the condition.
 * @returns The found `element`. `undefined` if not found.
 */
export const find = <T>(
  arrayList: Unit<T>,
  predicate: (value: T, index: number, array: T[]) => boolean
): T | undefined => {
  const { array, size } = arrayList;
  for (let i = 0; i < size; i += 1) {
    if (predicate(array[i], i, array)) return array[i];
  }
  return undefined;
};

/**
 * Finds `element` in `arrayList`.
 * @param arrayList
 * @param element
 * @returns The index of `element`. `-1` if not found.
 */
export const findIndex = <T>(arrayList: Unit<T>, element: T): number => {
  const { array, size } = arrayList;
  for (let i = 0; i < size; i += 1) {
    if (array[i] === element) return i;
  }

  return -1;
};

/**
 * Removes the element at `index`.
 * All subsequent elements will be shifted to the previous index.
 * @param arrayList
 * @param index
 * @returns The removed element.
 */
export const removeShift = <T>(arrayList: Unit<T>, index: number): T => {
  const { array, size } = arrayList;
  const removedElement = array[index];
  array.copyWithin(index, index + 1, size);
  arrayList.size = size - 1;

  return removedElement;
};

/**
 * Removes `element`.
 * All subsequent elements will be shifted to the previous index.
 * @param arrayList
 * @param element
 * @returns The removed element, or `null` if not found.
 */
export const removeShiftElement = <T>(
  arrayList: Unit<T>,
  element: T
): T | null => {
  const index = findIndex(arrayList, element);
  if (index >= 0) return removeShift(arrayList, index);
  return null;
};

/**
 * Removes the element at `index` by moving the last element to `index` and overwriting the existing value.
 * Faster than `removeShift()` and may be useful if you do not need to preserve order of elements.
 *
 * @param arrayList
 * @param index
 * @returns The removed element.
 */
export const removeSwap = <T>(arrayList: Unit<T>, index: number): T => {
  const array = arrayList.array;

  const removedElement = array[index];
  const lastIndex = arrayList.size - 1;
  array[index] = array[lastIndex];
  arrayList.size = lastIndex;

  return removedElement;
};

/**
 * Removes `element` by replacing it with the last element.
 * @param arrayList
 * @param element
 * @returns The removed element, or `null` if not found.
 */
export const removeSwapElement = <T>(
  arrayList: Unit<T>,
  element: T
): T | null => {
  const index = findIndex(arrayList, element);
  if (index >= 0) return removeSwap(arrayList, index);
  return null;
};

/**
 * Runs `predicate` for each element and removes the element if `predicate` returns `true`.
 * This does not use `removeShift()` internally.
 *
 * Note: Do not add elements within this loop.
 *
 * @param arrayList
 * @param predicate
 * @returns `true` if any element has been removed.
 */
export const removeShiftAll = <T>(
  arrayList: Unit<T>,
  predicate: (value: T, index: number, array: T[]) => boolean
): boolean => {
  const { array, size } = arrayList;
  let writeIndex = 0;
  let found = false;

  for (let readIndex = 0; readIndex < size; readIndex += 1) {
    const value = array[readIndex];
    if (predicate(value, readIndex, array)) {
      found = true;
      continue;
    }

    array[writeIndex] = value;
    writeIndex += 1;
  }

  arrayList.size = writeIndex;

  return found;
};

/**
 * Run `removeSwap()` for all indices of element where `predicate` returns true.
 * @param arrayList
 * @param predicate
 * @returns `true` if any element has been removed.
 */
export const removeSwapAll = <T>(
  arrayList: Unit<T>,
  predicate: (value: T, index: number, array: T[]) => boolean
): boolean => {
  // TODO: optimize
  let found = false;
  const array = arrayList.array;
  for (let i = 0; i < arrayList.size; i += 1) {
    if (predicate(array[i], i, array)) {
      removeSwap(arrayList, i);
      found = true;
    }
  }
  return found;
};

/**
 * Fills the entire `arrayList` by running `factory` and assigning result for each index.
 * @param arrayList
 * @param factory
 */
export const populate = <T>(
  arrayList: Unit<T>,
  factory: (index: number) => T
) => {
  Arrays.populate(arrayList.array, factory);
  arrayList.size = arrayList.array.length;

  return arrayList;
};

/**
 * Joins two arrayLists and runs `callback` once for each joined pair.
 * You should not remove elements from arrayLists during the iteration.
 * @param arrayListA
 * @param arrayListB
 * @param callback
 */
export const nestedLoopJoin = <T, U>(
  arrayListA: Unit<T>,
  arrayListB: Unit<U>,
  callback: (elementA: T, elementB: U) => void
): void =>
  Arrays.nestedLoopJoinWithRange(
    arrayListA.array,
    arrayListB.array,
    callback,
    0,
    arrayListA.size,
    0,
    arrayListB.size
  );

/**
 * Runs `callback` once for each pair within `arrayList`.
 * @param arrayList
 * @param callback
 */
export const roundRobin = <T>(
  arrayList: Unit<T>,
  callback: (element: T, otherElement: T) => void
): void =>
  Arrays.roundRobinWithRange(arrayList.array, callback, 0, arrayList.size);
