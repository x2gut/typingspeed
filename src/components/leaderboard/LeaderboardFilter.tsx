import React, { Dispatch, SetStateAction } from "react";
import LeaderboardBtn from "./LeaderboardBtn";

interface LeaderboardFilterProps {
  time: number;
  words: number;
  mode: string;
  setTime: Dispatch<SetStateAction<number>>;
  setWords: Dispatch<SetStateAction<number>>;
  setMode: Dispatch<SetStateAction<string>>;
}

const LeaderboardFilter: React.FC<LeaderboardFilterProps> = ({
  setTime,
  setMode,
  setWords,
  time,
  words,
  mode,
}) => {
  return (
    <div className="options m-5 flex gap-10">
      <div className="flex flex-col items-center gap-1 p-1 border-r-2 border-[--sub-accent-color] max-w-52 pr-10">
        <h3 className="text-[--text-correct-color] text-xl">Mode: {mode}</h3>
        <div className="buttons flex gap-3">
          <LeaderboardBtn label="Words" callback={() => setMode("words")} />
          <LeaderboardBtn label="Time" callback={() => setMode("time")} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 p-1 border-r-2 border-[--sub-accent-color] max-w-64 pr-10">
        {mode === "time" ? (
          <>
            <h3 className="text-[--text-correct-color] text-xl">
              Seconds: {time}
            </h3>
            <div className="buttons flex gap-3">
              <LeaderboardBtn label="15" callback={() => setTime(15)} />
              <LeaderboardBtn label="30" callback={() => setTime(30)} />
              <LeaderboardBtn label="60" callback={() => setTime(60)} />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[--text-correct-color] text-xl">
              Words: {words}
            </h3>
            <div className="buttons flex gap-3">
            <LeaderboardBtn label="25" callback={() => setWords(25)} />
            <LeaderboardBtn label="50" callback={() => setWords(50)} />
            <LeaderboardBtn label="100" callback={() => setWords(100)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardFilter;
