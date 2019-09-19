import { Lazy } from "./Lazy";

export const create = <T>(factory: () => T): Lazy<T> => {
  return {
    value: undefined,
    factory
  };
};

export const get = <T>(object: Lazy<T>) =>
  object.value || (object.value = object.factory());

export const clear = <T>(object: Lazy<T>) => {
  object.value = undefined;
};
