import { ArrayList } from "../../ds";
import * as Component from "./component";

export class Unit extends Component.Base {
  static create(components: readonly Component.Unit[]) {
    return new Unit(components);
  }

  readonly components: readonly Component.Unit[];
  readonly runningComponentList: ArrayList.Unit<Component.Unit>;

  private constructor(components: readonly Component.Unit[]) {
    super([], false);

    this.components = components.slice();
    this.runningComponentList = ArrayList.fromArray(components.slice());
  }

  step(): boolean {
    const { runningComponentList } = this;

    ArrayList.removeShiftAll(runningComponentList, Component.step);

    if (runningComponentList.size > 0) return false;

    return this.complete();
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
