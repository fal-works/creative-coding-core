/**
 * An object that has a boolean `needsSweep` property.
 */
export interface Sweepable {
  /**
   * If true, the object will be removed from the belonging `ArrayList`
   * by calling `sweep()` or `loopSweep()`.
   */
  needsSweep: boolean;
}
