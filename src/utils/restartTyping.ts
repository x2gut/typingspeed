import { Dispatch, SetStateAction } from "react";
import { LetterStates } from "../types/types";

interface SlicedIndex {
  startIndex: number;
  endIndex: number;
}

const restartTyping = (
  setCurrentWordIndex: Dispatch<SetStateAction<number>>,
  setCurrentLetterIndex: Dispatch<SetStateAction<number>>,
  setLetterStates: Dispatch<SetStateAction<LetterStates>>,
  setSlicedIndex: Dispatch<SetStateAction<SlicedIndex>>,
  wordsPerContainer: number
) => {
  setCurrentLetterIndex(0);
  setCurrentWordIndex(0);
  setLetterStates({});
  setSlicedIndex({ startIndex: 0, endIndex: wordsPerContainer });
};

export default restartTyping;
