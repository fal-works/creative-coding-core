import { Arrays } from "../../ds";
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
export type Listeners = Listener[];

export class Unit extends Component.Base {
  static create(
    onProgress: Listeners,
    onComplete: (() => void)[],
    progress: Progress,
    isCompleted = false
  ) {
    return new Unit(onProgress, onComplete, progress, isCompleted);
  }

  onProgress: Listeners;
  readonly progress: Progress;

  private constructor(
    onProgress: Listeners,
    onComplete: (() => void)[],
    progress: Progress,
    isCompleted: boolean
  ) {
    super(onComplete, isCompleted);

    this.onProgress = onProgress;
    this.progress = progress;
  }

  step(): boolean {
    if (this.isCompleted) return true;

    const { progress } = this;

    if (progress.count >= progress.duration) {
      progress.ratio = 1;
      Arrays.loopRunWithArgument(this.onProgress, progress);

      return this.complete();
    }

    Arrays.loopRunWithArgument(this.onProgress, progress);
    updateProgress(progress);

    return false;
  }

  reset(): Unit {
    resetProgress(this.progress);
    this.isCompleted = false;

    return this;
  }
}

/**
 * Creates a `Timer` instance.
 * @param parameters
 * @return New `Timer` instance.
 */
export const create = (parameters: {
  duration: number;
  onProgress?: Arrays.ArrayOrValue<Listener>;
  onComplete?: Arrays.ArrayOrValue<() => void>;
}): Unit => {
  return Unit.create(
    Arrays.unifyToArray(parameters.onProgress),
    Arrays.unifyToArray(parameters.onComplete),
    createProgress(parameters.duration)
  );
};

export const dummy = Unit.create([], [], createProgress(0), true);
