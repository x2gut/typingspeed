import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { getWpm } from "../utils/resultUtil";
import { ResultData } from "../types/types";

interface TimerProps {
  isGameStarted: boolean;
  remainingTime: number;
  callback: () => void;
  resultData: ResultData;
  avgWordsLength: number;
  setResultData: Dispatch<SetStateAction<ResultData>>;
}

const Timer: React.FC<TimerProps> = ({
  isGameStarted,
  remainingTime,
  avgWordsLength,
  callback,
  resultData,
  setResultData,
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const prevMistakesRef = useRef(resultData.mistakes);

  useEffect(() => {
    setTimeLeft(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (!isGameStarted) {
      if (timerId) {
        clearInterval(timerId);
        setTimeLeft(remainingTime);
      }
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimeLeft(remainingTime);
      }
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            callback();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(id);
    }
  }, [isGameStarted]);

  useEffect(() => {
    let totalTime: number = remainingTime - timeLeft;
    const wpm = getWpm(
      resultData.totalChars,
      resultData.mistakes,
      avgWordsLength,
      totalTime
    );
    setResultData((prevData) => ({
      ...prevData,
      wordsPerMin: [...prevData.wordsPerMin, wpm],
    }));
    // SETTING MISTAKES
    if (resultData.mistakes !== prevMistakesRef.current) {
      const mistakes = resultData.mistakes - prevMistakesRef.current;
      setResultData((prevData) => ({
        ...prevData,
        mistakesPerMin: [...prevData.mistakesPerMin, mistakes],
      }));
      prevMistakesRef.current = resultData.mistakes;
    } else {
      setResultData((prevData) => ({
        ...prevData,
        mistakesPerMin: [...prevData.mistakesPerMin, 0],
      }));
    }
  }, [timeLeft]);

  return <div className="timer text-2xl h-8">{timeLeft}s</div>;
};

export default Timer;
