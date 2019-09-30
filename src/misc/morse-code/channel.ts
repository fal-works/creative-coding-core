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
  signals: Signal.Sequence;
  index: number;
  timeout: NodeJS.Timeout | undefined;
}

export const create = (
  on: () => void,
  off: () => void,
  wpm: number = 25,
  signals: Signal.Sequence = []
): Unit => {
  return {
    on,
    off,
    wpm,
    unitTime: wpmToDotDuration(wpm),
    signals,
    index: 0,
    timeout: undefined
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
  const { unitTime, signals: sentence, index, on, off } = channel;
  const currentSignal = sentence[index];

  if (currentSignal.isOn) on(currentSignal);
  else off(currentSignal);

  return unitTime * currentSignal.length;
};

const run = (channel: Unit) => {
  const currentSignalTimeLength = runCurrentSignal(channel);
  channel.index += 1;

  if (channel.index >= channel.signals.length) return;

  channel.timeout = setTimeout(() => {
    channel.timeout = undefined;
    run(channel);
  }, currentSignalTimeLength);
};

export const start = (channel: Unit, signals?: Signal.Sequence) => {
  stop(channel);
  if (signals) channel.signals = signals;

  run(channel);
};
