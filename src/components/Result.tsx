import React, { useEffect, useState } from "react";
import { ResultData } from "../types/types";
import LineChart from "./rechart/LineChart";
import { getAccuracy } from "../helpers/getAccuray";
import { useTypeSettings } from "../contexts/TypeSettingsContext";

interface ResultProps {
  resultData: ResultData;
  avgWordLength: number;
}

const Result: React.FC<ResultProps> = ({ resultData, avgWordLength }) => {
  const { typeSettings, setTypeSettings } = useTypeSettings();
  const [data, setData] = useState<{ second: number; wpm: number, mpm: number }[]>([
    {
      second: 0,
      wpm: 0,
      mpm: 0,
    },
  ]);

  const { wordsPerMin, mistakes, correctChars, mistakesPerMin, wordsAmount } = resultData;
  useEffect(() => {
    const generatedData = Array.from({ length: wordsPerMin.length }, (_, i) => ({
      second: i + 1,
      wpm: wordsPerMin[i] || 0,
      mpm: mistakesPerMin[i] || 0
    }));
    setData(generatedData);
  }, []);

  const latestWPM = wordsPerMin[wordsPerMin.length - 1];
  const accuracy = Math.round(getAccuracy(wordsAmount, avgWordLength, mistakes, correctChars));

  return (
    <div className="result-container w-full h-full min-h-96">
      <div className="result-upper flex justify-center w-full">
        <div className="result-left flex flex-col justify-around">
          <p className="wpm text-4xl ">
            <span className="">WPM</span> {latestWPM}
          </p>
          <p className="accuracy text-4xl">
            <span className="">ACC</span> {accuracy}%
          </p>
        </div>
        <div className="result-right max-w-screen-lg max-h-64 w-full">
          <LineChart data={data}/>
        </div>
      </div>
      <div className="result-footer flex gap-48 justify-center my-12">
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
    </div>
  );
};

export default Result;
