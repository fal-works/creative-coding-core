export type Listener = (timerUnit: Unit) => void;

export interface Unit {
  readonly duration: number;
  readonly progressRatioChangeRate: number;
  readonly onProgress: readonly Listener[];
  readonly onComplete: readonly Listener[];
  count: number;
  progressRatio: number;
  isCompleted: boolean;
}

export const emptyListener: Listener = () => {};

export const create = (
  duration: number,
  onProgress: Listener | Listener[] = emptyListener,
  onComplete: Listener = emptyListener
): Unit => {
  return {
    duration,
    progressRatioChangeRate: 1 / duration,
    onProgress: Array.isArray(onProgress) ? onProgress.slice() : [onProgress],
    onComplete: Array.isArray(onComplete) ? onComplete.slice() : [onComplete],
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
    for (const fn of timerUnit.onProgress) fn(timerUnit);
    timerUnit.isCompleted = true;
    for (const fn of timerUnit.onComplete) fn(timerUnit);
    return true;
  }

  for (const fn of timerUnit.onProgress) fn(timerUnit);
  timerUnit.count += 1;
  timerUnit.progressRatio += progressRatioChangeRate;

  return false;
};

export const addOnProgress = (timerUnit: Unit, onProgress: Listener): Unit => {
  return {
    ...timerUnit,
    onProgress: timerUnit.onProgress.concat(onProgress)
  };
};

export const addOnComplete = (timerUnit: Unit, onComplete: Listener): Unit => {
  return {
    ...timerUnit,
    onComplete: timerUnit.onComplete.concat(onComplete)
  };
};
