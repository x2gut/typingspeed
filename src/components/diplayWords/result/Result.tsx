import React, { useEffect, useState } from "react";
import { ResultData } from "../../../types/types";
import LineChart from "./rechart/LineChart";
import { getAccuracy } from "../../../helpers/getAccuray";
import { useTypeSettings } from "../../../contexts/TypeSettingsContext";
import WordsHistory from "./WordsHistory";
import { useMutation } from "react-query";
import { addResults } from "../../../api/resultsApi";
import { useAuth } from "../../../contexts/authContext";

interface ResultProps {
  resultData: ResultData;
}

const Result: React.FC<ResultProps> = ({ resultData }) => {
  const { wordsPerMin, mistakes, correctChars, mistakesPerMin } = resultData;
  const { userId }: { userId: number } = useAuth();
  const { typeSettings } = useTypeSettings();
  const [accuracy] = useState<number>(
    Math.round(getAccuracy(mistakes, correctChars))
  );
  const [latestWPM] = useState<number>(
    wordsPerMin[wordsPerMin.length - 1]
  );
  const [data, setData] = useState<
    { second: number; wpm: number; mpm: number }[]
  >([
    {
      second: 0,
      wpm: 0,
      mpm: 0,
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

  useEffect(() => {
    const generatedData = Array.from(
      { length: wordsPerMin.length },
      (_, i) => ({
        second: i + 1,
        wpm: wordsPerMin[i] || 0,
        mpm: mistakesPerMin[i] || 0,
      })
    );
    setData(generatedData);
    mutation.mutate({
      user_id: userId,
      wpm: latestWPM,
      accuracy: accuracy,
      mistakes: mistakes,
      time: typeSettings.mode === "time" ? typeSettings.time : wordsPerMin.length,
      words: typeSettings.mode === "words" ? typeSettings.words : resultData.wordsAmount,
      mode: typeSettings.mode,
      language: typeSettings.lang
    });
  }, []);

  return (
    <div className="result-container w-full h-full min-h-96">
      <div className="result-upper flex justify-center w-full">
        <div className="result-left flex flex-col justify-around">
          <p className="wpm text-4xl ">
            <span className="">WPM</span> {latestWPM}
          </p>
          <p className="accuracy text-4xl">
            <span className="">ACC</span>{" "}
            {accuracy}%
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
            {typeSettings.mode}
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
        {typeSettings.wordsHistory && (
          <WordsHistory
            wordsTyped={resultData.wordsTyped}
            letterStates={resultData.letterStates}
          />
        )}
      </div>
    </div>
  );
};

export default Result;
