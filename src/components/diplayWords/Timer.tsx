import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getWpm } from "../../utils/resultUtil";
import useSettingsStore from "../../store/settings-store";
import useResultStore from "../../store/result-store";
import useKeyPressed from "../../hooks/useKeyPressed";

interface TimerProps {
  isGameStarted: boolean;
  avgWordLength: number;
}

const Timer: React.FC<TimerProps> = ({
  isGameStarted,
  avgWordLength,
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const { gameSettings, setTypeSettings, typeSettings } = useSettingsStore();
  const [timeLeft, setTimeLeft] = useState(gameSettings.time);
  const { userResults, setUserResults } = useResultStore();
  const prevMistakesRef = useRef(userResults.mistakes);
  const { mistakes, correctChars, allCharsTyped } = userResults;
  
  const wpm = useMemo(() => {
    const wpm = getWpm(
      correctChars,
      avgWordLength,
      gameSettings.time - timeLeft
    );
    return wpm;
  }, [userResults, timeLeft]);

  const rawWpm = useMemo(() => {
    const rawWpm = getWpm(
      allCharsTyped.length,
      avgWordLength,
      gameSettings.time - timeLeft
    );
    return rawWpm;
  }, [userResults, timeLeft]);

  useEffect(() => {
    if (!isGameStarted) {
      if (timerId) {
        clearInterval(timerId);
      }
    } else {
      if (timerId) {
        clearInterval(timerId);
      }
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setTypeSettings({ isTimeOut: true });
            console.log(typeSettings.isTimeOut)
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(id);
    }
  }, [isGameStarted]);

  useEffect(() => {
    setUserResults({ 
      wordsPerMin: [...userResults.wordsPerMin, wpm],
      rawWordsPerMin: [...userResults.rawWordsPerMin, rawWpm],
      });
    // SETTING MISTAKES
    if (mistakes !== prevMistakesRef.current) {
      setUserResults({
        mistakesPerMin: [...userResults.mistakesPerMin, mistakes],
      });
      prevMistakesRef.current = mistakes;
    } else {
      setUserResults({ mistakesPerMin: [...userResults.mistakesPerMin, 0] });
    }
  }, [timeLeft]);

  return <div className="timer text-2xl h-8">{timeLeft}s</div>;
};

export default Timer;
