/**
 * A basic array-based list.
 * Used for avoiding reallocation by adding or removing elements of `Array`.
 */
export interface ArrayList<T> {
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
