export type ResultData = {
  wordsPerMin: number[];
  mistakes: number;
  totalChars: number;
  wordsAmount: number;
  mistakesPerMin: number[];
};

export type LetterStates = {
  [wordIndex: number]: { [letterIndex: number]: string };
};

export type TypeSettings = {
  mode: string;
  time: number;
  words: number;
}