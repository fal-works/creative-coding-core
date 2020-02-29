import * as Arrays from "./../arrays";
import * as ArrayCollection from "../array-collection";

export interface Unit<T> extends ArrayCollection.Unit<T> {
  array: Array<T>;
  size: number;
  headIndex: number;
  tailIndex: number;
}

/**
 * Creates an array-based queue.
 * @returns A queue object.
 */
export const create = <T>(capacity: number): Unit<T> => ({
  ...ArrayCollection.create(capacity),
  headIndex: 0,
  tailIndex: 0
});

import { isEmpty, isFull } from "../array-collection";
export { isEmpty, isFull };

/**
 * Adds `element` to `queue` as the last (newest) element.
 * Be sure that `queue` is not full.
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
 */
export const enqueueSafe = <T>(queue: Unit<T>, element: T) => {
  if (!isFull(queue)) enqueue(queue, element);
};

/**
 * Removes the top (oldest) element from `queue`.
 * Be sure that `queue` is not empty.
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
 * @returns Removed element, or `undefined` if empty.
 */
export const dequeueSafe = <T>(queue: Unit<T>): T | undefined =>
  isEmpty(queue) ? undefined : dequeue(queue);

/**
 * Removes the top (oldest) element from `queue` only if `queue` is full.
 * @returns Removed element, or `undefined` if not full.
 */
export const dequeueIfFull = <T>(queue: Unit<T>): T | undefined =>
  isFull(queue) ? dequeue(queue) : undefined;

/**
 * @returns The top (oldest) element from `queue`.
 * Unspecified if `queue` is empty.
 */
export const peek = <T>(queue: Unit<T>): T => queue.array[queue.headIndex];

/**
 * @returns The top (oldest) element, or `undefined` if empty.
 */
export const peekSafe = <T>(queue: Unit<T>): T | undefined => {
  const { headIndex } = queue;
  return headIndex !== queue.tailIndex ? queue.array[headIndex] : undefined;
};

/**
 * Runs `callback` for each element of `queue`.
 */
export const loop = <T>(
  queue: Unit<T>,
  callback: (value: T, index: number, array: readonly T[]) => void
): void => {
  if (queue.size === 0) return;
  const { array, headIndex, tailIndex } = queue;

  if (headIndex < tailIndex) {
    Arrays.loopRange(array, callback, headIndex, tailIndex);
    return;
  }

  Arrays.loopRange(array, callback, headIndex, array.length);
  Arrays.loopRange(array, callback, 0, tailIndex);
};

/**
 * Removes the top (oldest) element from `queue` if `predicate` returns true.
 * Be sure that `queue` is not empty.
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
 * @param predicate Function that returns `true` if a given value matches the condition.
 * @returns Removed element, or `undefined` if empty or not removed.
 */
export const dequeueSafeIf = <T>(
  queue: Unit<T>,
  predicate: (value: T) => boolean
): T | undefined => (isEmpty(queue) ? undefined : dequeueIf(queue, predicate));

/**
 * Clears the contents.
 * This does not nullify references.
 */
export const clear = <T>(queue: Unit<T>) => {
  ArrayCollection.clear(queue);
  queue.headIndex = 0;
  queue.tailIndex = 0;
};

export { clearReference } from "../array-collection";
