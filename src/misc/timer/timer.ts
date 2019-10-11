import { Mutable } from "../../types/mutable";

export type Listener = (timerUnit: Unit) => void;

export interface Unit {
  readonly duration: number;
  readonly progressRatioChangeRate: number;
  readonly onProgress: Listener;
  readonly onComplete: Listener;
  count: number;
  progressRatio: number;
  isCompleted: boolean;
}

export const emptyListener: Listener = () => {};

export const create = (
  duration: number,
  onProgress: Listener = emptyListener,
  onComplete: Listener = emptyListener
): Unit => {
  return {
    duration,
    progressRatioChangeRate: 1 / duration,
    onProgress,
    onComplete,
    count: 0,
    progressRatio: 0,
    isCompleted: false
  };
};

export const dummy = create(0);

export const reset = (timerUnit: Unit): void => {
  timerUnit.count = 0;
  timerUnit.progressRatio = 0;
  timerUnit.isCompleted = false;
};

export const step = (timerUnit: Unit): boolean => {
  if (timerUnit.isCompleted) return true;

  const { count, duration, progressRatioChangeRate } = timerUnit;

  if (count >= duration) {
    timerUnit.progressRatio = 1;
    timerUnit.onProgress(timerUnit);
    timerUnit.isCompleted = true;
    timerUnit.onComplete(timerUnit);
    return true;
  }

  timerUnit.onProgress(timerUnit);
  timerUnit.count += 1;
  timerUnit.progressRatio += progressRatioChangeRate;

  return false;
};

export const addOnComplete = (timerUnit: Unit, onComplete: Listener): Unit => {
  const newUnit: Mutable<Unit> = Object.assign({}, timerUnit);
  const oldOnComplete = timerUnit.onComplete;
  newUnit.onComplete = () => {
    oldOnComplete(newUnit);
    onComplete(newUnit);
  };
  return newUnit;
};
