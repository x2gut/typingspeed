import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getWpm } from "../../utils/resultUtil";
import { GameSettings, ResultData } from "../../types/types";

interface WordsCountdownProps {
  totalWords: number;
  isGameStarted: boolean;
  currentWordsAmount: number;
  resultData: ResultData;
  avgWordLength: number;
  setResultData: Dispatch<SetStateAction<ResultData>>;
  callback: () => void;
  setGameSettings: Dispatch<SetStateAction<GameSettings>>;
}

const WordsCountdown: React.FC<WordsCountdownProps> = ({
  totalWords,
  currentWordsAmount,
  isGameStarted,
  resultData,
  avgWordLength,
  setResultData,
  callback,
  setGameSettings,
}) => {
  const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);
  const [totalTime, setTotalTime] = useState(0);
  const prevMistakesRef = useRef(resultData.mistakes);
  const { correctChars, mistakesPerMin } =
    resultData;

  const wpm = useMemo(() => {
    const lastDetectedMistake = mistakesPerMin.length - 1;
    const wpm = getWpm(
      correctChars,
      lastDetectedMistake,
      avgWordLength,
      totalTime
    );
    return wpm;
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
      setResultData((prevData) => ({
        ...prevData,
        mistakesPerMin: [...prevData.mistakesPerMin, 0],
      }));
    }
  }, [totalTime]);

  useEffect(() => {
    if (currentWordsAmount === totalWords) {
      callback();
      setGameSettings((prevData) => ({ ...prevData, time: totalTime }));
    }
  }, [currentWordsAmount]);

  return (
    <div className="words-countdown text-2xl">
      {currentWordsAmount} / {totalWords}
    </div>
  );
};

export default WordsCountdown;
