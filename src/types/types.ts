export type ResultData = {
  wordsPerMin: number[];
  rawWordsPerMin: number[];
  allCharsTyped: string[];
  mistakes: number;
  correctChars: number;
  wordsAmount: number;
  mistakesPerMin: number[];
  wordsTyped: string[];
  letterStates: {
    [wordIndex: number]: { [letterIndex: number]: string };
  };
};

export type LetterStates = {
  [wordIndex: number]: { [letterIndex: number]: string };
};

export type TypeSettings = {
  layout: string;
  lang: string;
  mode: string;
  time: number;
  words: number;
  keyboard: {
    show: boolean;
    responsive: boolean;
  };
  soundOnPress: boolean | string;
  caretType: boolean | string;
  caretRainbow: boolean;
  randomTheme: boolean;
  themesSidebar: boolean;
  wordsHistory: boolean;
};

export type GameSettings = {
  isFocused: boolean;
  isGameStarted: boolean;
  isTimeOut: boolean;
  time: number | string;
};

export type Notice = {
  message: string;
  type?: "success" | "error" | "info";
  id: number;
  duration?: number;
};

export type ShowNotice = (
  message: string,
  noticeType?: "success" | "error" | "info",
  duration?: number
) => void;

export type ProfileData = {
  username: string | null;
  email: string | null;
  id: number | null;
  isActive: boolean | null;
  created_at: string;
};

export type ProfileResultsData = {
  id: number;
  user_id: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
  time: number;
  words: number;
  language: string;
  mode: string;
  created_at: string;
};

export type History = { total_items: number; history: ProfileResultsData[] };

export interface TimeStats {
  avg_wpm_time_15: number;
  avg_wpm_time_30: number;
  avg_wpm_time_60: number;
  best_wpm_time_15: number;
  best_wpm_time_30: number;
  best_wpm_time_60: number;
}

export interface WordsStats {
  avg_wpm_words_25: number;
  avg_wpm_words_50: number;
  avg_wpm_words_100: number;
  best_wpm_words_25: number;
  best_wpm_words_50: number;
  best_wpm_words_100: number;
}
