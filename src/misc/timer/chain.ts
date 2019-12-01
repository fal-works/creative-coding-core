import { Arrays } from "../../ds";
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

  readonly components: Component.Unit[];
  index: number;
  currentComponent: Component.Unit;

  private constructor(components: readonly Component.Unit[]) {
    super([], []);

    this.components = components.slice();
    this.index = 0;
    this.currentComponent = components[0];
  }

  step(): boolean {
    this.tryStart();

    if (!this.currentComponent.step()) return false;

    return setNextIndex(this);
  }

  reset(): Unit {
    Arrays.loop(this.components, Component.reset);
    setIndex(this, 0);
    this.isStarted = false;
    this.isCompleted = false;

    return this;
  }

  pushComponent(component: Component.Unit): void {
    this.components.push(component);
  }

  setName(name: string): Unit {
    super.setName(name);
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
