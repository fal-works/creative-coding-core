export interface Lazy<T> {
  value: T | undefined;
  readonly factory: () => T;
}
