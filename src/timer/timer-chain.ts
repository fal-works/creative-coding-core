import { Timer } from "./timer";

export interface TimerChain {
  readonly timers: readonly Timer[];
  current: Timer;
  index: number;
}
