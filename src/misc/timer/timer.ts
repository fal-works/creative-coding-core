import { ArrayUtility } from "../../ds";
import * as Component from "./component";

export interface Progress {
  readonly duration: number;
  readonly ratioChangeRate: number;
  count: number;
  ratio: number;
}

const createProgress = (duration: number): Progress => {
  return {
    duration,
    ratioChangeRate: 1 / duration,
    count: 0,
    ratio: 0
  };
};
const updateProgress = (progress: Progress) => {
  progress.count += 1;
  progress.ratio += progress.ratioChangeRate;
};
const resetProgress = (progress: Progress) => {
  progress.count = 0;
  progress.ratio = 0;
};

export type Listener = (progress: Progress) => void;
export type Listeners = readonly Listener[];

const createListnerArray = (listeners?: Listener | Listeners) =>
  listeners ? (Array.isArray(listeners) ? listeners.slice() : [listeners]) : [];

export class Unit implements Component.Unit {
  static create(
    onProgress: Listeners,
    onComplete: Listeners,
    progress: Progress,
    isCompleted = false
  ) {
    return new Unit(onProgress, onComplete, progress, isCompleted);
  }

  private constructor(
    readonly onProgress: Listeners,
    readonly onComplete: Listeners,
    readonly progress: Progress,
    public isCompleted: boolean
  ) {}

  step(): boolean {
    if (this.isCompleted) return true;

    const { progress } = this;

    if (progress.count >= progress.duration) return this.complete(progress);

    return this.update(progress);
  }

  reset(): Unit {
    resetProgress(this.progress);
    this.isCompleted = false;

    return this;
  }

  private update(progress: Progress) {
    ArrayUtility.loopRun(this.onProgress, progress);
    updateProgress(progress);
    return false;
  }

  private complete(progress: Progress) {
    progress.ratio = 1;
    ArrayUtility.loopRun(this.onProgress, progress);
    ArrayUtility.loopRun(this.onComplete, progress);
    return (this.isCompleted = true);
  }
}

/**
 * Creates a `Timer` instance.
 * @param parameters
 * @return New `Timer` instance.
 */
export const create = (parameters: {
  duration: number;
  onProgress?: Listener | Listeners;
  onComplete?: Listener | Listeners;
}): Unit => {
  return Unit.create(
    createListnerArray(parameters.onProgress),
    createListnerArray(parameters.onComplete),
    createProgress(parameters.duration)
  );
};

export const dummy = Unit.create([], [], createProgress(0), true);

export { create as chain } from "./chain";
export { create as parallel } from "./parallel";
export { create as loop } from "./loop";
