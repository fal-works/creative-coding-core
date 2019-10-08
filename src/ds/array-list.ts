import * as ArrayUtility from "./array-utility";

/**
 * A basic array-based list.
 * Used for avoiding reallocation by adding or removing elements of `Array`.
 */
export interface Unit<T> {
  /**
   * The raw array that holds elements.
   * This should be dense but may not be filled.
   */
  array: T[];

  /**
   * The number of valid elements in `array`.
   */
  size: number;
}

/**
 * Creates an array-list unit.
 * @param initialCapacity
 */
export const create = <T>(initialCapacity: number): Unit<T> => {
  return {
    array: new Array<T>(initialCapacity),
    size: 0
  };
};

/**
 * Creates an array-list unit filled with `value`.
 * @param size
 * @param value
 */
export const createFilled = <T>(size: number, value: T): Unit<T> => {
  return {
    array: new Array<T>(size).fill(value),
    size
  };
};

/**
 * Creates an array-list unit, filled by running `factory` and assignint the result for each index.
 * @param size
 * @param factory
 */
export const createPopulated = <T>(size: number, factory: () => T): Unit<T> => {
  return {
    array: ArrayUtility.populate(new Array<T>(size), factory),
    size
  };
};

/**
 * Creates an array-list unit by reusing the reference to `array`.
 * The `size` of the array-list will be `array.length`.
 * Be sure that `array` is filled with valid elements.
 *
 * @param array
 * @return A new array-list unit.
 */
export const fromArray = <T>(array: T[]): Unit<T> => {
  return {
    array,
    size: array.length
  };
};

export const add = <T>(arrayList: Unit<T>, element: T): void => {
  arrayList.array[arrayList.size] = element;
  arrayList.size += 1;
};

export const push = add;

export const pop = <T>(arrayList: Unit<T>): T => {
  const lastIndex = arrayList.size - 1;
  const removedElement = arrayList.array[lastIndex];
  arrayList.size = lastIndex;

  return removedElement;
};

/**
 * Clears the contents of `arrayList`.
 * This just sets `size` to `0` and does not nullify references.
 * @param arrayList
 */
export const clear = <T>(arrayList: Unit<T>): void => {
  arrayList.size = 0;
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
 * Clears the contents of `arrayList` and also nullifies all references.
 * @param arrayList
 */
export const clearReference = <T>(arrayList: Unit<T>): void => {
  arrayList.size = 0;
  cleanUnusedSlots(arrayList);
};

/**
 * Runs `callback` for each element of `arrayList`.
 * @param arrayList
 * @param callback
 */
export const loop = <T>(arrayList: Unit<T>, callback: (v: T) => void): void =>
  ArrayUtility.loopRange(arrayList.array, callback, 0, arrayList.size);

/**
 * Runs `callback` for each element of `arrayList` in descending order.
 * @param arrayList
 * @param callback
 */
export const loopBackwards = <T>(
  arrayList: Unit<T>,
  callback: (v: T) => void
): void =>
  ArrayUtility.loopRangeBackwards(arrayList.array, callback, 0, arrayList.size);

/**
 * Finds `element` in `arrayList`.
 * @param arrayList
 * @param element
 * @return The index of `element`. `-1` if not found.
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
 * @return The removed element.
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
 * @return The removed element, or `null` if not found.
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
 * @return The removed element.
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
 * @return The removed element, or `null` if not found.
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
 * Fills the entire `arrayList` by running `factory` and assigning result for each index.
 * @param arrayList
 * @param factory
 */
export const populate = <T>(arrayList: Unit<T>, factory: () => T) => {
  ArrayUtility.populate(arrayList.array, factory);
  arrayList.size = arrayList.array.length;

  return arrayList;
};
