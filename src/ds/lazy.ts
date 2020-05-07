/**
 * A data unit of which value is lazily created.
 */
export interface Unit<T> {
  value: T | undefined;
  readonly factory: () => T;
}

/**
 * @returns New `Lazy` unit with `factory`.
 */
export const create = <T>(factory: () => T): Unit<T> => {
  return {
    value: undefined,
    factory,
  };
};

/**
 * Returns the value of `object`.
 * Creates the value if not yet created.
 */
export const get = <T>(object: Unit<T>) =>
  object.value || (object.value = object.factory());

/**
 * Clears the value of `object`.
 * `object.factory` still remains, so the value can be created later again.
 */
export const clear = <T>(object: Unit<T>) => {
  object.value = undefined;
};
