import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getWpm } from "../../utils/resultUtil";
import { ResultData } from "../../types/types";
import useSettingsStore from "../../store/settings-store";
import useResultStore from "../../store/result-store";

interface WordsCountdownProps {
  totalWords: number;
  isGameStarted: boolean;
  avgWordLength: number;
  callback: () => void;
}

const WordsCountdown: React.FC<WordsCountdownProps> = ({
  totalWords,
  isGameStarted,
  avgWordLength,
  callback,
}) => {
  const { setGameSettings } = useSettingsStore();
  const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);
  const [totalTime, setTotalTime] = useState(0);
  const { userResults, setUserResults } = useResultStore();
  const prevMistakesRef = useRef(userResults.mistakes);
  const { correctChars, mistakes } = userResults;

  const wpm = useMemo(() => {
    const wpm = getWpm(
      correctChars,
      avgWordLength,
      totalTime
    );
    return wpm;
  }, [userResults, totalTime]);

  const rawWpm = useMemo(() => {
    const totalChars = correctChars + mistakes
    const rawWpm = getWpm(
      totalChars,
      avgWordLength,
      totalTime
    );
    return rawWpm;
  }, [userResults, totalTime]);

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
    setUserResults({ wordsPerMin: [...userResults.wordsPerMin, wpm] });
    setUserResults({rawWordsPerMin: [...userResults.rawWordsPerMin, rawWpm]})
    // SETTING MISTAKES
    if (userResults.mistakes !== prevMistakesRef.current) {
      const mistakes = userResults.mistakes - prevMistakesRef.current;
      setUserResults({ mistakesPerMin: [...userResults.mistakesPerMin, mistakes] });
      prevMistakesRef.current = userResults.mistakes;
    } else {
      setUserResults({ mistakesPerMin: [...userResults.mistakesPerMin, 0] });
    }
  }, [totalTime]);

  useEffect(() => {
    if (userResults.wordsAmount === totalWords) {
      callback();
      setGameSettings({ time: totalTime });
    }
  }, [userResults.wordsAmount]);

  return (
    <div className="words-countdown text-2xl">
      {userResults.wordsAmount} / {totalWords}
    </div>
  );
};

export default WordsCountdown;
