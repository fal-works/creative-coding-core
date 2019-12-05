import { Arrays } from "../../ds";
import * as Log from "./log";

type Listener = (id: number) => void;

let nextComponentId = 0;

export interface Unit {
  readonly id: number;
  name: string;
  readonly onStart: Listener[];
  readonly onComplete: Listener[];
  isStarted: boolean;
  isCompleted: boolean;

  /**
   * Function that steps the progress of timer component.
   * Returns `true` if the component is completed.
   */
  step(): boolean;

  /**
   * Function that resets the progress of timer component.
   * Returns `this` instance.
   */
  reset(): Unit;

  /**
   * Function that Starts the progress of timer component.
   */
  tryStart(): boolean;

  /**
   * Function that immediately completes the progress of timer component.
   * Always returns `true`.
   */
  complete(): boolean;

  /**
   * Sets the name of `this` for debug purpose.
   * Returns `this` instance.
   */
  setName(name: string): Unit;
}

/**
 * Callback function for running `component.step()`.
 * @param component
 */
export const step = (component: Unit) => component.step();

/**
 * Callback function for running `component.reset()`.
 * @param component
 */
export const reset = (component: Unit) => component.reset();

const defaultName = "no name";

/**
 * Base class for other classes implementing `Component`.
 */
export abstract class Base implements Unit {
  readonly id = nextComponentId++;
  name = defaultName;
  readonly onStart: Listener[];
  readonly onComplete: Listener[];
  isStarted: boolean;
  isCompleted: boolean;

  protected constructor(onStart: Listener[], onComplete: Listener[]) {
    this.onStart = onStart;
    this.onComplete = onComplete;
    this.isStarted = false;
    this.isCompleted = false;

    Log.verbose(Log.TIMER, this.id, Log.CREATED);
  }

  abstract step(): boolean;

  abstract reset(): Unit;

  /**
   * If `this` is not yet started,
   * runs all functions in `this.onStart`, and sets `this.isStarted` to `true`.
   * @returns `true` if just started. `false` if already started.
   */
  tryStart(): boolean {
    if (this.isStarted) return false;

    const { id, name } = this;
    Log.verbose(Log.TIMER, id, name, Log.STARTING);
    Arrays.loopRunWithArgument(this.onStart, id);
    Log.verbose(Log.TIMER, id, name, Log.STARTED);

    return (this.isStarted = true);
  }

  /**
   * Runs all functions in `this.onComplete`, and sets `this.isCompleted` to `true`.
   * @returns `true`.
   */
  complete(): boolean {
    const { id, name } = this;
    Log.verbose(Log.TIMER, id, name, Log.COMPLETING);
    Arrays.loopRunWithArgument(this.onComplete, id);
    Log.verbose(Log.TIMER, id, name, Log.COMPLETED);

    return (this.isCompleted = true);
  }

  /**
   * Sets the name of `this` for debug purpose.
   * @param name
   * @returns `this` instance.
   */
  setName(name: string): Unit {
    this.name = name;
    return this;
  }
}
