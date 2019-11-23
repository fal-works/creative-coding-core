import { ArrayList } from "../../ds";
import * as Timer from "./timer";
import * as Chain from "./chain";

type StepCallback = () => boolean;

export type Unit = ArrayList.Unit<StepCallback>;

export const create = (capacity: number): Unit =>
  ArrayList.create<StepCallback>(capacity);

export const addTimer = (timerSet: Unit, timer: Timer.Unit) =>
  ArrayList.add(timerSet, () => timer.step());

export const addChain = (timerSet: Unit, chain: Chain.Unit) =>
  ArrayList.add(timerSet, () => chain.step());

const runStep = (step: StepCallback): boolean => step();

export const step = (timerSet: Unit) => {
  ArrayList.removeShiftAll(timerSet, runStep);
};

export const clear = (timerSet: Unit) => ArrayList.clearReference(timerSet);

/**
 * Creates a timer set instance and returns a set of bound functions.
 * @param capacity
 */
export const construct = (capacity: number) => {
  const timerSet = create(capacity);

  return {
    addTimer: (timer: Timer.Unit) => addTimer(timerSet, timer),
    addChain: (chain: Chain.Unit) => addChain(timerSet, chain),
    step: () => step(timerSet),
    clear: () => clear(timerSet)
  };
};
