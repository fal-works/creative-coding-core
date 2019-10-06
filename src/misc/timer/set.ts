import { ArrayList } from "../../ds";
import * as Timer from "./timer";

export type Unit = ArrayList.Unit<Timer.Unit>;

export const create = (capacity: number) =>
  ArrayList.create<Timer.Unit>(capacity);

export const add = (timerSet: Unit, timer: Timer.Unit) => {
  ArrayList.add(timerSet, timer);
};

export const step = (timerSet: Unit) => {
  const timerArray = timerSet.array;

  for (let i = 0; i < timerSet.size; i += 1) {
    const timer = timerArray[i];
    Timer.step(timer);

    if (timer.isCompleted) ArrayList.removeSwap(timerSet, i);
  }
};

export const clear = (timerSet: Unit) => ArrayList.clearReference(timerSet);
