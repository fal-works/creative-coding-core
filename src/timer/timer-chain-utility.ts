import { Timer } from "./timer";
import * as TimerUtility from "./timer-utility";
import { loop } from "../ds/array-utility";

import { TimerChain } from "./timer-chain";

export const setUnitIndex = (chain: TimerChain, index: number): void => {
  chain.index = index;
  chain.current = chain.timers[index];
};

export const reset = (chain: TimerChain): void => {
  loop(chain.timers, TimerUtility.reset);
  setUnitIndex(chain, 0);
};

export const next = (chain: TimerChain): Timer => {
  setUnitIndex(chain, chain.index + 1);
  return chain.current;
};

export const create = (
  timers: Timer[],
  looped: boolean = false
): TimerChain => {
  // eslint-disable-next-line prefer-const
  let newChain: TimerChain;
  const newTimers: Timer[] = new Array(timers.length);

  const shift = () => next(newChain);
  const lastIndex = timers.length - 1;
  for (let i = 0; i < lastIndex; i += 1) {
    newTimers[i] = TimerUtility.addOnComplete(timers[i], shift);
  }
  if (!looped) newTimers[lastIndex] = Object.assign({}, timers[lastIndex]);
  else
    newTimers[lastIndex] = TimerUtility.addOnComplete(timers[lastIndex], () =>
      reset(newChain)
    );

  newChain = {
    timers: newTimers,
    current: newTimers[0],
    index: 0
  };

  return newChain;
};

export const dummy = create([TimerUtility.dummy]);
