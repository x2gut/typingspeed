import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getWpm } from "../utils/resultUtil";
import { ResultData } from "../types/types";
import { useTypeSettings } from "../contexts/TypeSettingsContext";

interface WordsCountdownProps {
  totalWords: number;
  isGameStarted: boolean;
  currentWordsAmount: number;
  resultData: ResultData;
  setResultData: Dispatch<SetStateAction<ResultData>>;
  callback: () => void;
  setTime:Dispatch<SetStateAction<number>>
}

const WordsCountdown: React.FC<WordsCountdownProps> = ({
  totalWords,
  currentWordsAmount,
  isGameStarted,
  resultData,
  setResultData,
  callback,
  setTime
}) => {
  const { typeSettings, setTypeSettings } = useTypeSettings();
  const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);
  const [totalTime, setTotalTime] = useState(0);
  const prevMistakesRef = useRef(resultData.mistakes);

  const wpm = useMemo(() => {
    return getWpm(resultData.totalChars, resultData.mistakes, 4, totalTime);
  }, [resultData, totalTime]);

  useEffect(() => {
    if (!isGameStarted) {
      if (timerId) {
        clearInterval(timerId);
        setTotalTime(0);
      }
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTotalTime(0);
      }
      const id = setInterval(() => {
        setTotalTime((prevTime) => {
          return prevTime + 1;
        });
      }, 1000);
      setTimerId(id);
    }
  }, [isGameStarted]);

  useEffect(() => {
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
      console.log(prevMistakesRef.current, resultData.mistakes);
      setResultData((prevData) => ({
        ...prevData,
        mistakesPerMin: [...prevData.mistakesPerMin, 0],
      }));
    }
  }, [totalTime]);

  useEffect(() => {
    if (currentWordsAmount === totalWords) {
      callback();
      setTime(totalTime)
    }
  }, [currentWordsAmount]);

  return (
    <div className="words-countdown text-2xl">
      {currentWordsAmount} / {totalWords}
    </div>
  );
};

export default WordsCountdown;
