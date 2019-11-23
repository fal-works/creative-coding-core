import * as Component from "./component";

export class Unit implements Component.Unit {
  static create(component: Component.Unit, loopCount: number) {
    return new Unit(component, loopCount);
  }

  remainingCount: number;
  isCompleted: boolean;

  private constructor(
    readonly component: Component.Unit,
    readonly loopCount: number
  ) {
    this.remainingCount = loopCount;
    this.isCompleted = loopCount <= 0;
  }

  step(): boolean {
    if (!this.component.step()) return false;

    if (this.isCompleted) return true;

    if ((this.remainingCount -= 1) > 0) {
      this.component.reset();
      return false;
    }

    return (this.isCompleted = true);
  }

  reset(): Unit {
    const { loopCount } = this;
    this.remainingCount = loopCount;

    if (loopCount > 0) {
      this.component.reset();
      this.isCompleted = false;
    } else {
      this.isCompleted = true;
    }

    return this;
  }
}

export const create = (component: Component.Unit, loopCount = Infinity) =>
  Unit.create(component, loopCount);
