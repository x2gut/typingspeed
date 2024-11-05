import React, { useEffect, useState } from "react";
import { ResultData, TimeStats, WordsStats } from "../../../types/types";
import LineChart from "./rechart/LineChart";
import { getAccuracy } from "../../../helpers/getAccuray";
import WordsHistory from "./WordsHistory";
import { useMutation } from "react-query";
import { addResults } from "../../../api/resultsApi";
import useAuthStore from "../../../store/auth-store";
import useSettingsStore from "../../../store/settings-store";
import useResultStore from "../../../store/result-store";
import { PiCrownSimpleFill } from "react-icons/pi";
import Tooltip from "../../common/Tooltip";

interface ResultProps {
  avgStats: {
    time: TimeStats,
    words: WordsStats
  }
}

const Result: React.FC<ResultProps> = ({ avgStats }) => {
  const { userId } = useAuthStore();
  const {userResults} = useResultStore();
  const { wordsPerMin, mistakes, correctChars, mistakesPerMin, rawWordsPerMin } = userResults;
  const { gameSettings } = useSettingsStore();
  const [accuracy] = useState<number>(Math.round(getAccuracy(mistakes, correctChars)));
  const [latestWPM] = useState<number>(wordsPerMin[wordsPerMin.length - 1]);
  const [wpmDifference, setWpmDifference] = useState<number | null>(null)

  const [data, setData] = useState<
    { second: number; wpm: number; mpm: number, rawWpm: number }[]
  >([
    {
      second: 0,
      wpm: 0,
      mpm: 0,
      rawWpm: 0,
    },
  ]);
  const mutation = useMutation(addResults, {
    onSuccess: (data) => {
      console.log(`added: ${data.data}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function isNewBest()  {
    const { mode, time, words } = gameSettings;
    const bestWPM = mode === "time" 
      ? avgStats.time[`best_wpm_time_${time}` as keyof TimeStats] 
      : avgStats.words[`best_wpm_words_${words}` as keyof WordsStats];
      console.log(latestWPM - bestWPM)
      return latestWPM - bestWPM
  };

  useEffect(() => {
    const generatedData = Array.from(
      { length: wordsPerMin.length },
      (_, i) => ({
        second: i + 1,
        wpm: wordsPerMin[i] || 0,
        rawWpm: rawWordsPerMin[i],
        mpm: mistakesPerMin[i] || 0,
      })
    );
    setData(generatedData);
    mutation.mutate({
      user_id: userId,
      wpm: latestWPM,
      accuracy: accuracy,
      mistakes: mistakes,
      time:
        gameSettings.mode === "time" ? gameSettings.time : wordsPerMin.length,
      words:
        gameSettings.mode === "words"
          ? gameSettings.words
          : userResults.wordsAmount,
      mode: gameSettings.mode,
      language: gameSettings.lang,
    });
    setWpmDifference(isNewBest());
  }, []);

  return (
    <div className="result-container w-full h-full min-h-96">
      <div className="result-upper flex justify-center w-full">
        <div className="result-left flex flex-col justify-around">
          <p className="wpm flex items-center gap-3">
            {wpmDifference !== null && wpmDifference >= 0 && 
            <Tooltip tooltipLabel={`+${wpmDifference}`}>
              <PiCrownSimpleFill size={24} fill="var(--text-correct-color)"/>
              </Tooltip>}
            <span className="text-4xl">WPM</span> <span className="text-4xl">{latestWPM}</span>
          </p>
          <p className="accuracy text-4xl">
            <span className="">ACC</span> {accuracy}%
          </p>
        </div>
        <div className="result-right max-w-screen-lg max-h-64 w-full">
          <LineChart data={data} />
        </div>
      </div>
      <div className="result-footer">
        <div className="result-data flex gap-48 justify-center my-12">
          <p className="type-mode text-2xl">
            <span className="">type mode </span>
            {gameSettings.mode}
          </p>
          <p className="type-mode text-2xl ">
            <span className="">characters </span>
            {correctChars + mistakes}
          </p>
          <p className="type-mode text-2xl">
            <span className="">total time </span>
            {wordsPerMin.length}s
          </p>
        </div>
        {gameSettings.wordsHistory && (
          <WordsHistory
            wordsTyped={userResults.wordsTyped}
            letterStates={userResults.letterStates}
          />
        )}
      </div>
    </div>
  );
};

export default Result;
