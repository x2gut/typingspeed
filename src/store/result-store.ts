import { create } from "zustand";
import { ResultData } from "../types/types";

interface ResultStore {
  userResults: ResultData;
  setUserResults: (userResult: Partial<ResultData>) => void;
  resetUserResults: () => void;
}

const useResultStore = create<ResultStore>((set) => ({
  userResults: {
    wordsPerMin: [],
    rawWordsPerMin: [],
    allCharsTyped: [],
    mistakes: 0,
    correctChars: 0,
    wordsAmount: 0,
    mistakesPerMin: [],
    wordsTyped: [],
    letterStates: {},
  },
  setUserResults: (userResult) =>
    set((state) => {
      return {
        userResults: {
          ...state.userResults,
          ...userResult,
        },
      };
    }),
  resetUserResults: () =>
    set({
      userResults: {
        wordsPerMin: [],
        rawWordsPerMin: [],
        allCharsTyped: [],
        mistakes: 0,
        correctChars: 0,
        wordsAmount: 0,
        mistakesPerMin: [],
        wordsTyped: [],
        letterStates: {},
      },
    }),
}));

export default useResultStore;
