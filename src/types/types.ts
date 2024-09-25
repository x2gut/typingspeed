export type ResultData = {
  wordsPerMin: number[];
  mistakes: number;
  correctChars: number;
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
  keyboard: {
    show: boolean;
    responsive: boolean;
  }; 
}

export type GameSettings = {
  isFocused: boolean,
  isGameStarted: boolean,
  isTimeOut: boolean,
  time: number | string
}