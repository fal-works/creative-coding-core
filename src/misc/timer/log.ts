import { returnVoid } from "../constant-function";

/* eslint-disable @typescript-eslint/no-explicit-any */
export let verbose: (
  message?: any,
  ...optionalParams: any[]
) => void = returnVoid;
/* eslint-enable */

export const outputVerbose = (yes = true) => {
  verbose = yes ? console.info : returnVoid;
};

export const TIMER = "timer ";
export const CREATED = ": created.";
export const STARTING = ": starting...";
export const STARTED = ": started.";
export const COMPLETING = ": completing...";
export const COMPLETED = ": completed.";
