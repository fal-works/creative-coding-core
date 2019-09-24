export interface Unit<T> {
  value: T | undefined;
  readonly factory: () => T;
}

export const create = <T>(factory: () => T): Unit<T> => {
  return {
    value: undefined,
    factory
  };
};

export const get = <T>(object: Unit<T>) =>
  object.value || (object.value = object.factory());

export const clear = <T>(object: Unit<T>) => {
  object.value = undefined;
};
