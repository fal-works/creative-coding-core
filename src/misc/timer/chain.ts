import * as Timer from "./timer";
import { loop } from "../../ds/array-utility";

export interface Unit {
  readonly timers: readonly Timer.Unit[];
  readonly loop: boolean;
  index: number;
  current: Timer.Unit;
  isCompleted: boolean;
}

export const setIndex = (chain: Unit, index: number): void => {
  chain.index = index;
  chain.current = chain.timers[index];
};

export const reset = (chain: Unit): void => {
  loop(chain.timers, Timer.reset);
  setIndex(chain, 0);
  chain.isCompleted = false;
};

export const step = (chain: Unit): boolean => {
  const { current } = chain;

  if (Timer.step(current)) return false;

  const { timers } = chain;
  const nextIndex = chain.index + 1;
  if (nextIndex >= timers.length) {
    if (chain.loop) {
      reset(chain);
      return false;
    }

    return (chain.isCompleted = true);
  }

  setIndex(chain, nextIndex);

  return false;
};

export const create = (timers: Timer.Unit[], loop = false): Unit => {
  return {
    timers: timers.slice(),
    loop,
    index: 0,
    current: timers[0],
    isCompleted: false
  };
};

export const dummy = create([Timer.dummy]);
