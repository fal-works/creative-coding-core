import * as Component from "./component";

export class Unit extends Component.Base {
  static create(component: Component.Unit, loopCount: number) {
    return new Unit(component, loopCount);
  }

  remainingCount: number;

  private constructor(
    readonly component: Component.Unit,
    readonly loopCount: number
  ) {
    super([], []);

    this.remainingCount = loopCount;
  }

  step(): boolean {
    this.tryStart();

    if (!this.component.step()) return false;

    if (this.isCompleted) return true;

    if ((this.remainingCount -= 1) > 0) {
      this.component.reset();
      return false;
    }

    return this.complete();
  }

  reset(): Unit {
    const { loopCount } = this;
    this.remainingCount = loopCount;

    this.component.reset();
    this.isStarted = false;
    this.isCompleted = false;

    return this;
  }

  setName(name: string): Unit {
    super.setName(name);
    return this;
  }
}

/**
 * Creates a looped component from `component`.
 * @param component
 * @param loopCount `Infinity` if not specified.
 * @return New `Timer.Loop` instance.
 */
export const create = (component: Component.Unit, loopCount = Infinity) =>
  Unit.create(component, loopCount);
