import { Dispatch, SetStateAction } from "react";
import { ResultData } from "../types/types";

export const setMistakes = (
  mistakes: number,
  setResultData: Dispatch<
    SetStateAction<ResultData>
  >
) => {
  setResultData((prevData) => ({
    ...prevData,
    mistakes: prevData.mistakes + mistakes,
  }));
};

export const setTotalChars = (
  totalChars: number,
  setResultData: Dispatch<
    SetStateAction<ResultData>
  >
) => {
  setResultData((prevData) => ({
    ...prevData,
    totalChars: prevData.totalChars + totalChars,
  }));
};

export const setWordsAmount = (setResultData: Dispatch<SetStateAction<ResultData>>) => {
  setResultData((prevData) => ({
    ...prevData,
    wordsAmount: prevData.wordsAmount + 1
  }))
}

export const getWpm = (
  totalChars: number,
  mistakes: number,
  avgWordLength: number,
  totalTime: number
) => {
  let wpm = Math.round(
    ((totalChars - mistakes) / avgWordLength / totalTime) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  return wpm;
};
