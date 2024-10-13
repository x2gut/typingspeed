import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { getWpm } from "../../utils/resultUtil";
import { ResultData } from "../../types/types";

interface TimerProps {
  isGameStarted: boolean;
  remainingTime: number;
  callback: () => void;
  resultData: ResultData;
  avgWordLength: number;
  setResultData: Dispatch<SetStateAction<ResultData>>;
}

const Timer: React.FC<TimerProps> = ({
  isGameStarted,
  remainingTime,
  callback,
  resultData,
  avgWordLength,
  setResultData,
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const prevMistakesRef = useRef(resultData.mistakes);
  const { mistakes, correctChars, mistakesPerMin } =
    resultData;

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
    const lastDetectedMistake = mistakesPerMin.length - 1;
    const wpm = getWpm(
      correctChars,
      mistakesPerMin[lastDetectedMistake],
      avgWordLength,
      totalTime
    );
    setResultData((prevData) => ({
      ...prevData,
      wordsPerMin: [...prevData.wordsPerMin, wpm],
    }));
    // SETTING MISTAKES
    if (mistakes !== prevMistakesRef.current) {
      setResultData((prevData) => ({
        ...prevData,
        mistakesPerMin: [...prevData.mistakesPerMin, mistakes],
      }));
      prevMistakesRef.current = mistakes;
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
