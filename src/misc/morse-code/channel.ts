import * as Signal from "./signal";

/**
 * Returns duration time per dot in milliseconds.
 * @param wpm - word (PARIS) per minute
 */
export function wpmToDotDuration(wpm: number): number {
  return 1000 / (50 * (wpm / 60));
}

export interface Unit {
  readonly on: (signal: Signal.Unit) => void;
  readonly off: (signal: Signal.Unit) => void;
  readonly wpm: number;
  readonly unitTime: number;
  readonly loop: boolean;
  signals: Signal.Sequence;
  index: number;
  timeout: NodeJS.Timeout | undefined;
}

export const create = (
  on: () => void,
  off: () => void,
  wpm = 25,
  signals: Signal.Sequence = [],
  loop = false
): Unit => {
  return {
    on,
    off,
    wpm,
    unitTime: wpmToDotDuration(wpm),
    loop,
    signals,
    index: 0,
    timeout: undefined,
  };
};

export const stop = (channel: Unit) => {
  if (channel.timeout) {
    channel.off(Signal.NUL);
    clearTimeout(channel.timeout);
    channel.timeout = undefined;
  }

  channel.index = 0;
};

const runCurrentSignal = (channel: Unit) => {
  const { unitTime, signals, index, on, off } = channel;
  const currentSignal = signals[index];

  if (currentSignal.isOn) on(currentSignal);
  else off(currentSignal);

  return unitTime * currentSignal.length;
};

const setNextRun = (
  run: (channel: Unit) => void,
  channel: Unit,
  ms: number
) => {
  channel.timeout = setTimeout(() => {
    channel.timeout = undefined;
    run(channel);
  }, ms);
};

const run = (channel: Unit) => {
  const currentSignalTimeLength = runCurrentSignal(channel);
  channel.index += 1;

  if (channel.index < channel.signals.length) {
    setNextRun(run, channel, currentSignalTimeLength);
    return;
  }

  channel.timeout = setTimeout(() => {
    if (channel.loop) {
      channel.off(Signal.NUL);
      channel.timeout = undefined;
    } else {
      channel.off(Signal.MEDIUM_GAP);
      setNextRun(run, channel, Signal.MEDIUM_GAP.length);
    }
  }, currentSignalTimeLength);

  channel.index = 0;
};

export const start = (channel: Unit, signals?: Signal.Sequence) => {
  stop(channel);
  if (signals) channel.signals = signals;

  run(channel);
};
