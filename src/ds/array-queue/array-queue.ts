import * as Arrays from "./../arrays";

export interface Unit<T> {
  array: Array<T>;
  headIndex: number;
  tailIndex: number;
  size: number;
}

/**
 * Creates an array-based queue.
 * @param capacity
 * @returns A queue object.
 */
export const create = <T>(capacity: number): Unit<T> => ({
  array: new Array<T>(capacity),
  headIndex: 0,
  tailIndex: 0,
  size: 0
});

/**
 * Checks if `queue` is empty.
 * @param queue
 * @returns `true` if `queue.size === 0`.
 */
export const isEmpty = <T>(queue: Unit<T>) => queue.size === 0;

/**
 * Checks if `queue` is full.
 * @param queue
 * @returns `true` if `queue.size === queue.array.length`.
 */
export const isFull = <T>(queue: Unit<T>) => queue.size === queue.array.length;

/**
 * Adds `element` to `queue` as the last (newest) element.
 * Be sure that `queue` is not full.
 * @param queue
 * @param element
 */
export const enqueue = <T>(queue: Unit<T>, element: T) => {
  const { array, tailIndex } = queue;
  array[tailIndex] = element;
  const nextTailIndex = tailIndex + 1;
  queue.tailIndex = nextTailIndex < array.length ? nextTailIndex : 0;
  queue.size += 1;
};

/**
 * Adds `element` to `queue` as the last (newest) element if `queue` is not yet full.
 * @param queue
 * @param element
 */
export const enqueueSafe = <T>(queue: Unit<T>, element: T) => {
  if (!isFull(queue)) enqueue(queue, element);
};

/**
 * Removes the top (oldest) element from `queue`.
 * Be sure that `queue` is not empty.
 * @param queue
 * @returns Removed element.
 */
export const dequeue = <T>(queue: Unit<T>): T => {
  const { array, headIndex } = queue;
  const nextHeadIndex = headIndex + 1;
  queue.headIndex = nextHeadIndex < array.length ? nextHeadIndex : 0;
  queue.size -= 1;

  return array[headIndex];
};

/**
 * Removes the top (oldest) element from `queue` if `queue` is not empty.
 * @param queue
 * @returns Removed element, or `undefined` if empty.
 */
export const dequeueSafe = <T>(queue: Unit<T>): T | undefined =>
  isEmpty(queue) ? undefined : dequeue(queue);

/**
 * Removes the top (oldest) element from `queue` only if `queue` is full.
 * @param queue
 * @returns Removed element, or `undefined` if not full.
 */
export const dequeueIfFull = <T>(queue: Unit<T>): T | undefined =>
  isFull(queue) ? dequeue(queue) : undefined;

/**
 * Retunrs the top (oldest) element from `queue`.
 * Be sure that `queue` is not empty.
 * @param queue
 * @returns Removed element.
 */
export const peek = <T>(queue: Unit<T>): T => queue.array[queue.headIndex];

/**
 * Retunrs the top (oldest) element from `queue`.
 * @param queue
 * @returns Removed element, or `undefined` if empty.
 */
export const peekSafe = <T>(queue: Unit<T>): T | undefined => {
  const { headIndex } = queue;
  return headIndex !== queue.tailIndex ? queue.array[headIndex] : undefined;
};

/**
 * Runs `callback` for each element of `queue`.
 * @param arrayList
 * @param callback
 */
export const loop = <T>(
  queue: Unit<T>,
  callback: (value: T, index: number, array: readonly T[]) => void
): void => {
  const { array, headIndex, tailIndex } = queue;

  if (headIndex <= tailIndex) {
    Arrays.loopRange(array, callback, headIndex, tailIndex);
    return;
  }

  Arrays.loopRange(array, callback, headIndex, array.length);
  Arrays.loopRange(array, callback, 0, tailIndex);
};

/**
 * Removes the top (oldest) element from `queue` if `predicate` returns true.
 * Be sure that `queue` is not empty.
 * @param queue
 * @param predicate Function that returns `true` if a given value matches the condition.
 * @returns Removed element, or `undefined` if not removed.
 */
export const dequeueIf = <T>(
  queue: Unit<T>,
  predicate: (value: T) => boolean
): T | undefined => {
  const { array, headIndex } = queue;
  const topElement = array[headIndex];

  if (!predicate(topElement)) return undefined;

  const nextHeadIndex = headIndex + 1;
  queue.headIndex = nextHeadIndex < array.length ? nextHeadIndex : 0;
  queue.size -= 1;

  return topElement;
};

/**
 * Removes the top (oldest) element from `queue` if `predicate` returns true.
 * @param queue
 * @param predicate Function that returns `true` if a given value matches the condition.
 * @returns Removed element, or `undefined` if empty or not removed.
 */
export const dequeueSafeIf = <T>(
  queue: Unit<T>,
  predicate: (value: T) => boolean
): T | undefined =>
  queue.headIndex !== queue.tailIndex ? dequeueIf(queue, predicate) : undefined;

/**
 * Clears the contents of `queue`.
 * This does not nullify references.
 * @param queue
 */
export const clear = <T>(queue: Unit<T>) => {
  queue.headIndex = 0;
  queue.tailIndex = 0;
  queue.size = 0;
};

/**
 * Clears the contents of `queue` and also nullifies all references.
 * @param queue
 */
export const clearReference = <T>(queue: Unit<T>): void => {
  clear(queue);
  const { array } = queue;
  const capacity = array.length;
  array.length = 0;
  array.length = capacity;
};
