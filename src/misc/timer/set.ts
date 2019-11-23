import { ArrayList } from "../../ds";
import * as Component from "./component";

export interface Unit {
  runningComponents: ArrayList.Unit<Component.Unit>;
  newComponentsBuffer: ArrayList.Unit<Component.Unit>;
}

export const create = (capacity: number): Unit => {
  return {
    runningComponents: ArrayList.create(capacity),
    newComponentsBuffer: ArrayList.create(capacity)
  };
};

export const add = (timerSet: Unit, component: Component.Unit) =>
  ArrayList.add(timerSet.newComponentsBuffer, component);

export const step = (timerSet: Unit) => {
  const { runningComponents, newComponentsBuffer } = timerSet;
  ArrayList.removeShiftAll(runningComponents, Component.step);
  ArrayList.addList(runningComponents, newComponentsBuffer);
  ArrayList.clear(newComponentsBuffer);
};

export const clear = (timerSet: Unit) => {
  ArrayList.clear(timerSet.runningComponents);
  ArrayList.clear(timerSet.newComponentsBuffer);
};

/**
 * Creates a timer set instance and returns a set of bound functions.
 * @param capacity
 */
export const construct = (capacity: number) => {
  const timerSet = create(capacity);

  return {
    add: add.bind(undefined, timerSet),
    step: step.bind(undefined, timerSet),
    clear: clear.bind(undefined, timerSet)
  };
};
