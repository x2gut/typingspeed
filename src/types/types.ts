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
  layout: string,
  lang: string,
  mode: string;
  time: number;
  words: number;
  keyboard: {
    show: boolean;
    responsive: boolean;
  }; 
  soundOnPress: boolean | string,
  caretType: boolean | string,
}

export type GameSettings = {
  isFocused: boolean,
  isGameStarted: boolean,
  isTimeOut: boolean,
  time: number | string
}