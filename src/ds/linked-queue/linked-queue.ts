/**
 * Element of a singly linked list, which has a pointer to the `next` element.
 */
export interface Element<T> {
  next: T | null;
}

const isolate = <T>(element: Element<T>) => {
  element.next = null;
};

/**
 * Linked queue implemented as a singly linked list.
 */
export interface Unit<T extends Element<T>> {
  top: T | null;
  last: T | null;
}

export const create = <T extends Element<T>>(): Unit<T> => ({
  top: null,
  last: null
});

/**
 * Adds `element` to `queue` as the last (newest) element.
 */
export const enqueue = <T extends Element<T>>(
  queue: Unit<T>,
  element: T
): void => {
  const { last } = queue;
  if (last === null) queue.top = queue.last = element;
  else queue.last = last.next = element;
};

/**
 * Removes the top (oldest) element from `queue` if `queue` is not empty.
 * @returns Removed element, or `null` if empty.
 */
export const dequeue = <T extends Element<T>>(queue: Unit<T>): T | null => {
  const { top } = queue;
  if (top !== null) {
    const next = top.next;
    queue.top = next;
    if (!next) queue.last = null;
    isolate(top);
  }
  return top;
};

/**
 * Runs `callback` for each of `element` and its succeeding elements.
 */
export const loopFrom = <T extends Element<T>>(
  element: T | null,
  callback: (element: T) => void
): void => {
  let current: T | null = element;
  while (current !== null) {
    const next = current.next;
    callback(current);
    current = next;
  }
};

/**
 * Runs `callback` for each element of `queue`.
 */
export const loop = <T extends Element<T>>(
  queue: Unit<T>,
  callback: (element: T) => void
): void => loopFrom(queue.top, callback);

/**
 * Clears `queue`.
 * This just sets `queue.top` and `queue.last` to null and does not clear
 * the `next` field of each element.
 */
export const clear = <T extends Element<T>>(queue: Unit<T>): void => {
  queue.top = null;
  queue.last = null;
};

/**
 * Clears `queue`.
 * This just sets `queue.top` and `queue.last` to null and does not clear
 * the `next` field of each element.
 */
export const clearReference = <T extends Element<T>>(queue: Unit<T>): void => {
  loop(queue, isolate);
  clear(queue);
};
