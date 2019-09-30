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
  ["+", ".-.-."]
]);

export class Unit {
  public readonly binaryString: string;

  public constructor(
    readonly isOn: boolean,
    readonly length: 0 | 1 | 3 | 7,
    readonly codeString: string
  ) {
    let s = "";
    const binaryCharacter = isOn ? "1" : "0";
    for (let i = 0; i < length; i += 1) {
      s += binaryCharacter;
    }
    this.binaryString = s;
  }
}

class On extends Unit {
  public constructor(length: 1 | 3, codeString: string) {
    super(true, length, codeString);
  }
}

class Off extends Unit {
  public constructor(length: 0 | 1 | 3 | 7, codeString: string) {
    super(false, length, codeString);
  }
}

export const DIT = new On(1, ".");
export const DAH = new On(3, "-");
export const INTER_ELEMENT_GAP = new Off(1, "");
export const SHORT_GAP = new Off(3, " ");
export const MEDIUM_GAP = new Off(7, " / ");
export const NUL = new Off(0, "");

export function encode(sentence: string): Unit[] {
  const upperCaseSentence = sentence.toUpperCase();
  const signals: Unit[] = [];
  let gap: Off | undefined = undefined;

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
