import { useState } from "react";
import { ResultData } from "../types/types";

const useResultData = () => {
    const [resultData, setResultData] = useState<ResultData>({
      wordsPerMin: [],
      mistakes: 0,
      correctChars: 0,
      wordsAmount: 0,
      mistakesPerMin: []
    });
  
    const resetResultData = () => {
      setResultData({
        wordsPerMin: [],
        mistakes: 0,
        correctChars: 0,
        wordsAmount: 0,
        mistakesPerMin: []
      });
    };
  
    return { resultData, setResultData, resetResultData };
  };

  export default useResultData;