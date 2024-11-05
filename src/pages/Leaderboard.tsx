import Spinner from "../components/common/Spinner";
import LeaderboardData from "../components/leaderboard/LeaderboardData";
import useLeaderboard from "../hooks/useLeaderboard";
import LeaderboardFilter from "../components/leaderboard/LeaderboardFilter";
import { useState } from "react";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";

const Leaderboard = () => {
  const [mode, setMode] = useState("time");
  const [time, setTime] = useState(60);
  const [words, setWords] = useState(25);
  const { leaderboardData, isLoading } = useLeaderboard(mode, time, words);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="container">
      <h2 className="text-3xl text-[--text-correct-color] text-center">
        All Time{" "}
        <span className="text-[--main-color] font-bold">Leaderboard</span>
      </h2>
      <LeaderboardFilter
        setMode={setMode}
        setTime={setTime}
        setWords={setWords}
        time={time}
        words={words}
        mode={mode}
      />
      <LeaderboardHeader />
      {leaderboardData.map((user, index) => (
        <LeaderboardData
          index={index}
          key={user.gameId}
          user_id={user.user_id}
          username={user.username}
          wpm={user.wpm}
          accuracy={user.accuracy}
          date={user.created_at}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
