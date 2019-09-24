import * as arrays from "./array-utility";

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

export const create = <T>(initialCapacity: number): Unit<T> => {
  return {
    array: new Array<T>(initialCapacity),
    size: 0
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
export const loop = <T>(
  arrayList: Unit<T>,
  callback: (v: T) => void
): void => arrays.loopRange(arrayList.array, callback, 0, arrayList.size);

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
