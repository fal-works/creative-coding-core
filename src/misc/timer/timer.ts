import { Arrays } from "../../ds";
import { Numeric } from "../../math";
import * as Component from "./component";
import { Listener } from "./private-types";

export interface Progress {
  readonly duration: number;
  readonly ratioChangeRate: number;
  count: number;
  ratio: number;
}

type ProgressListener = (progress: Progress) => void;

const createProgress = (duration: number): Progress => {
  return {
    duration,
    ratioChangeRate: 1 / Numeric.max2(1, duration),
    count: 0,
    ratio: 0,
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

export class Unit extends Component.Base {
  static create(
    onStart: Listener[],
    onProgress: ProgressListener[],
    onComplete: Listener[],
    progress: Progress
  ) {
    return new Unit(onStart, onProgress, onComplete, progress);
  }

  onProgress: ProgressListener[];
  readonly progress: Progress;

  private constructor(
    onStart: Listener[],
    onProgress: ProgressListener[],
    onComplete: Listener[],
    progress: Progress
  ) {
    super(onStart, onComplete);

    this.onProgress = onProgress;
    this.progress = progress;
  }

  step(): boolean {
    if (this.isCompleted) return true;
    this.tryStart();

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
 * Creates a `Timer` instance.
 * @param parameters
 * @returns New `Timer` instance.
 */
export const create = (parameters: {
  duration: number;
  onStart?: Arrays.ArrayOrValue<Listener>;
  onProgress?: Arrays.ArrayOrValue<ProgressListener>;
  onComplete?: Arrays.ArrayOrValue<Listener>;
}): Unit => {
  return Unit.create(
    Arrays.unifyToArray(parameters.onStart),
    Arrays.unifyToArray(parameters.onProgress),
    Arrays.unifyToArray(parameters.onComplete),
    createProgress(parameters.duration)
  );
};

export const dummy = Unit.create([], [], [], createProgress(0));
dummy.isStarted = true;
dummy.isCompleted = true;
