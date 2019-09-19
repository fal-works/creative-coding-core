import { Mutable } from "../types/mutable";
import { Timer, TimerListener } from "./timer";

export const emptyListener: TimerListener = () => {};

export const create = (
  duration: number,
  onProgress: TimerListener = emptyListener,
  onComplete: TimerListener = emptyListener
): Timer => {
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

export const reset = (timerUnit: Timer): void => {
  timerUnit.count = 0;
  timerUnit.progressRatio = 0;
  timerUnit.isCompleted = false;
};

export const step = (timerUnit: Timer): void => {
  if (timerUnit.isCompleted) return;

  const { count, duration, progressRatioChangeRate } = timerUnit;

  if (count >= duration) {
    timerUnit.progressRatio = 1;
    timerUnit.onProgress(timerUnit);
    timerUnit.isCompleted = true;
    timerUnit.onComplete(timerUnit);
    return;
  }

  timerUnit.onProgress(timerUnit);
  timerUnit.count += 1;
  timerUnit.progressRatio += progressRatioChangeRate;
};

export const addOnComplete = (
  timerUnit: Timer,
  onComplete: TimerListener
): Timer => {
  const newUnit: Mutable<Timer> = Object.assign({}, timerUnit);
  const oldOnComplete = timerUnit.onComplete;
  newUnit.onComplete = () => {
    oldOnComplete(newUnit);
    onComplete(newUnit);
  };
  return newUnit;
};
