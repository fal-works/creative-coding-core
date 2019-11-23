import { ArrayList } from "../../ds";
import * as Component from "./component";

export class Unit implements Component.Unit {
  static create(components: readonly Component.Unit[]) {
    return new Unit(components);
  }

  readonly components: readonly Component.Unit[];
  readonly runningComponentList: ArrayList.Unit<Component.Unit>;
  isCompleted: boolean;

  private constructor(components: readonly Component.Unit[]) {
    this.components = components.slice();
    this.runningComponentList = ArrayList.fromArray(components.slice());
    this.isCompleted = false;
  }

  step(): boolean {
    ArrayList.removeShiftAll(this.runningComponentList, Component.step);

    if (this.runningComponentList.size > 0) return false;
    return (this.isCompleted = true);
  }

  reset(): Unit {
    const { runningComponentList } = this;
    ArrayList.clear(runningComponentList);
    ArrayList.addArray(runningComponentList, this.components);
    ArrayList.loop(runningComponentList, Component.reset);
    this.isCompleted = false;

    return this;
  }
}

/**
 * Creates a parallel composite from `components`.
 * @param components
 * @return New `Timer.Parallel` instance.
 */
export const create = (components: readonly Component.Unit[]) =>
  Unit.create(components);
