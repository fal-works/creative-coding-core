import { ArrayList } from "../../ds";
import * as Timer from "./timer";
import * as Chain from "./chain";

type StepCallback = () => boolean;

export type Unit = ArrayList.Unit<StepCallback>;

export const create = (capacity: number): Unit =>
  ArrayList.create<StepCallback>(capacity);

export const addTimer = (timerSet: Unit, timer: Timer.Unit) =>
  ArrayList.add(timerSet, () => Timer.step(timer));

export const addChain = (timerSet: Unit, chain: Chain.Unit) =>
  ArrayList.add(timerSet, () => Chain.step(chain));

const runStep = (step: StepCallback): boolean => step();

export const step = (timerSet: Unit) => {
  ArrayList.removeShiftAll(timerSet, runStep);
};

export const clear = (timerSet: Unit) => ArrayList.clearReference(timerSet);
