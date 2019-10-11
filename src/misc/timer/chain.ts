import * as Timer from "./timer";
import { loop } from "../../ds/array-utility";

export interface Unit {
  readonly timers: readonly Timer.Unit[];
  current: Timer.Unit;
  index: number;
  isCompleted: boolean;
}

export const step = (chain: Unit): boolean => {
  Timer.step(chain.current);
  return chain.isCompleted;
};

export const setUnitIndex = (chain: Unit, index: number): void => {
  chain.index = index;
  chain.current = chain.timers[index];
};

export const reset = (chain: Unit): void => {
  loop(chain.timers, Timer.reset);
  setUnitIndex(chain, 0);
};

export const next = (chain: Unit): Timer.Unit => {
  setUnitIndex(chain, chain.index + 1);
  return chain.current;
};

export const create = (timers: Timer.Unit[], looped: boolean = false): Unit => {
  // eslint-disable-next-line prefer-const
  let newChain: Unit;
  const newTimers: Timer.Unit[] = new Array(timers.length);

  const shift = () => next(newChain);
  const lastIndex = timers.length - 1;
  for (let i = 0; i < lastIndex; i += 1) {
    newTimers[i] = Timer.addOnComplete(timers[i], shift);
  }
  if (looped)
    newTimers[lastIndex] = Timer.addOnComplete(timers[lastIndex], () =>
      reset(newChain)
    );
  else
    newTimers[lastIndex] = Timer.addOnComplete(
      timers[lastIndex],
      () => (newChain.isCompleted = true)
    );

  newChain = {
    timers: newTimers,
    current: newTimers[0],
    index: 0,
    isCompleted: false
  };

  return newChain;
};

export const dummy = create([Timer.dummy]);
