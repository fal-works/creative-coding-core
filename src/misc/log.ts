import { returnVoid } from "./constant-function";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogFunction = (message?: any, ...optionalParams: any[]) => void;

/**
 * Prints info message.
 */
export let info: LogFunction = returnVoid;

/**
 * Prints warning message.
 */
export let warn: LogFunction = returnVoid;

/**
 * Prints error message.
 */
export let error: LogFunction = returnVoid;

/**
 * Sets if info messages should be output to console log.
 * @param yes
 */
export const outputInfo = (yes = true) => {
  info = yes ? console.info : returnVoid;
};

/**
 * Sets if warning messages should be output to console log.
 * @param yes
 */
export const outputWarn = (yes = true) => {
  warn = yes ? console.warn : returnVoid;
};

/**
 * Sets if error messages should be output to console log.
 * @param yes
 */
export const outputError = (yes = true) => {
  error = yes ? console.error : returnVoid;
};
