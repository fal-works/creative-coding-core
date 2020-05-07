const morseCodeMap = new Map<string, string>([
  ["A", ".-"],
  ["B", "-..."],
  ["C", "-.-."],
  ["D", "-.."],
  ["E", "."],
  ["F", "..-."],
  ["G", "--."],
  ["H", "...."],
  ["I", ".."],
  ["J", ".---"],
  ["K", "-.-"],
  ["L", ".-.."],
  ["M", "--"],
  ["N", "-."],
  ["O", "---"],
  ["P", ".--."],
  ["Q", "--.-"],
  ["R", ".-."],
  ["S", "..."],
  ["T", "-"],
  ["U", "..-"],
  ["V", "...-"],
  ["W", ".--"],
  ["X", "-..-"],
  ["Y", "-.--"],
  ["Z", "--.."],
  ["1", ".----"],
  ["2", "..---"],
  ["3", "...--"],
  ["4", "....-"],
  ["5", "....."],
  ["6", "-...."],
  ["7", "--..."],
  ["8", "---.."],
  ["9", "----."],
  ["0", "-----"],
  [".", ".-.-.-"],
  [",", "--..--"],
  [":", "---..."],
  ["?", "..--.."],
  ["'", ".----."],
  ["!", "-.-.--"],
  ["-", "-....-"],
  ["/", "-..-."],
  ["@", ".--.-."],
  ["(", "-.--."],
  [")", "-.--.-"],
  ['"', ".-..-."],
  ["=", "-...-"],
  ["+", ".-.-."],
]);

export interface Unit {
  readonly isOn: boolean;
  readonly length: 0 | 1 | 3 | 7;
  readonly codeString: string;
  readonly binaryString: string;
}

const createSignalUnit = (
  isOn: boolean,
  length: 0 | 1 | 3 | 7,
  codeString: string
) => {
  let s = "";
  const binaryCharacter = isOn ? "1" : "0";
  for (let i = 0; i < length; i += 1) {
    s += binaryCharacter;
  }
  return Object.freeze({
    isOn,
    length,
    codeString,
    binaryString: s,
  });
};

const createOnSignalUnit = (length: 1 | 3, codeString: string) =>
  createSignalUnit(true, length, codeString);

const createOffSignalUnit = (length: 0 | 1 | 3 | 7, codeString: string) =>
  createSignalUnit(false, length, codeString);

export const DIT = createOnSignalUnit(1, ".");
export const DAH = createOnSignalUnit(3, "-");
export const INTER_ELEMENT_GAP = createOffSignalUnit(1, "");
export const SHORT_GAP = createOffSignalUnit(3, " ");
export const MEDIUM_GAP = createOffSignalUnit(7, " / ");
export const NUL = createOffSignalUnit(0, "");

export function encode(sentence: string): Unit[] {
  const upperCaseSentence = sentence.toUpperCase();
  const signals: Unit[] = [];
  let gap: Unit | undefined = undefined;

  for (let i = 0, len = upperCaseSentence.length; i < len; i += 1) {
    const character = upperCaseSentence.charAt(i);

    if (character === " ") {
      gap = MEDIUM_GAP;
      continue;
    } else if (character.charCodeAt(0) === 0) {
      if (gap) signals.push(gap);
      gap = undefined;
      signals.push(NUL);
      continue;
    }

    const code = morseCodeMap.get(character); // Dot-dash expression

    if (!code) continue;

    for (let k = 0, kLen = code.length; k < kLen; k += 1) {
      if (gap) signals.push(gap);

      switch (code.charAt(k)) {
        case ".":
          signals.push(DIT);
          break;
        case "-":
        case "_":
          signals.push(DAH);
          break;
        default:
          continue;
      }

      gap = INTER_ELEMENT_GAP;
    }

    gap = SHORT_GAP;
  }

  return signals;
}

export type Sequence = readonly Unit[];

export const toString = (signals: Sequence): string =>
  signals.reduce((acc, cur) => acc + cur.codeString, "");

export const toBinaryString = (signals: Sequence): string =>
  signals.reduce((acc, cur) => acc + cur.binaryString, "");

export const getTotalLength = (signals: Sequence): number =>
  signals.reduce((acc, cur) => acc + cur.length, 0);
