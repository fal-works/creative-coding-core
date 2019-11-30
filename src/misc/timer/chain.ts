import { ArrayUtility } from "../../ds";
import * as Component from "./component";

const setIndex = (chain: Unit, index: number): void => {
  chain.index = index;
  chain.currentComponent = chain.components[index];
};

/**
 * Increments component index. Set `chain` completed if there is no next component.
 * @param chain
 * @return `true` if completed i.e. there is no next component.
 */
const setNextIndex = (chain: Unit) => {
  const nextIndex = chain.index + 1;

  if (nextIndex < chain.components.length) {
    setIndex(chain, nextIndex);
    return false;
  }

  return chain.complete();
};

export class Unit extends Component.Base {
  static create(components: readonly Component.Unit[]) {
    return new Unit(components);
  }

  readonly components: readonly Component.Unit[];
  index: number;
  currentComponent: Component.Unit;

  private constructor(components: readonly Component.Unit[]) {
    super([], false);

    this.components = components.slice();
    this.index = 0;
    this.currentComponent = components[0];
  }

  step(): boolean {
    if (!this.currentComponent.step()) return false;

    return setNextIndex(this);
  }

  reset(): Unit {
    ArrayUtility.loop(this.components, Component.reset);
    setIndex(this, 0);
    this.isCompleted = false;

    return this;
  }
}

/**
 * Creates a sequential composite from `components`.
 * @param components
 * @return New `Timer.Chain` instance.
 */
export const create = (components: readonly Component.Unit[]) =>
  Unit.create(components);
