import * as Arrays from "./../arrays";

/**
 * A basic array-based collection.
 * Used for avoiding reallocation by adding or removing elements of `Array`.
 */
export interface Unit<T> {
  /**
   * The raw array that holds elements.
   * This should be dense (filled with valid values) within the used range,
   * but may not be entirely filled.
   */
  array: T[];

  /**
   * The number of valid elements in `array`.
   */
  size: number;
}

/**
 * Creates an array-based collection unit.
 * @param initialCapacity
 */
export const create = <T>(initialCapacity: number): Unit<T> => {
  return {
    array: new Array<T>(initialCapacity),
    size: 0,
  };
};

/**
 * Creates an array-based collection unit filled with `value`.
 * @param size
 * @param value
 */
export const createFilled = <T>(size: number, value: T): Unit<T> => {
  return {
    array: new Array<T>(size).fill(value),
    size,
  };
};

/**
 * Creates an array-based collection unit,
 * filled by running `factory` and assignint the result for each index.
 * @param size
 * @param factory
 */
export const createPopulated = <T>(
  size: number,
  factory: (index: number) => T
): Unit<T> => {
  return {
    array: Arrays.populate(new Array<T>(size), factory),
    size,
  };
};

/**
 * Creates a collection by reusing the reference to `array`.
 * The `size` of the collection will be `array.length`.
 * Be sure that `array` is filled with valid elements.
 *
 * @returns A new collection unit.
 */
export const fromArray = <T>(array: T[]): Unit<T> => {
  return {
    array,
    size: array.length,
  };
};

/**
 * Clears the contents.
 * This just sets `size` to `0` and does not nullify references.
 */
export const clear = <T>(collection: Unit<T>): void => {
  collection.size = 0;
};

/**
 * Clears the contents and also nullifies all references.
 */
export const clearReference = <T>(collection: Unit<T>): void => {
  collection.size = 0;
  const { array } = collection;
  const capacity = array.length;
  array.length = 0;
  array.length = capacity;
};

/**
 * Checks if it is empty.
 * @returns `true` if the size is 0.
 */
export const isEmpty = <T>(collection: Unit<T>) => collection.size === 0;

/**
 * Checks if it is full.
 * @returns `true` if the size is equal to the capacity.
 */
export const isFull = <T>(collection: Unit<T>) =>
  collection.size === collection.array.length;
