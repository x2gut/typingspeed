import { Dispatch, SetStateAction } from "react";
import { LetterStates } from "../types/types";

interface SlicedIndex {
  startIndex: number;
  endIndex: number;
}

const restartTyping = (
  setCurrentWordIndex: Dispatch<SetStateAction<number>>,
  setCurrentLetterIndex: Dispatch<SetStateAction<number>>,
  setSlicedIndex: Dispatch<SetStateAction<SlicedIndex>>,
  wordsPerContainer: number
) => {
  setCurrentLetterIndex(0);
  setCurrentWordIndex(0);
  setSlicedIndex({ startIndex: 0, endIndex: wordsPerContainer });
};

export default restartTyping;
