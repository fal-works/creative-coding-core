export type TimerListener = (timerUnit: Timer) => void;

export interface Timer {
  readonly duration: number;
  readonly progressRatioChangeRate: number;
  readonly onProgress: TimerListener;
  readonly onComplete: TimerListener;
  count: number;
  progressRatio: number;
  isCompleted: boolean;
}
