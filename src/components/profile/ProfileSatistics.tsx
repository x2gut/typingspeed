import { useEffect, useState } from "react";
import { TimeStats, WordsStats } from "../../types/types";
import ProfileStatItem from "./ProfileStatIem";

interface ProfileStatisticsProps {
  avgStats: {
    time: TimeStats;
    words: WordsStats;
  };
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({ avgStats }) => {
  const [currentMode, setCurrentMode] = useState<"time" | "words">("time");
  const [statistics, setStatistics] = useState({
    time: {
      avg_wpm_time_15: avgStats.time.avg_wpm_time_15,
      avg_wpm_time_30: avgStats.time.avg_wpm_time_30,
      avg_wpm_time_60: avgStats.time.avg_wpm_time_60,
      best_wpm_time_15: avgStats.time.best_wpm_time_15,
      best_wpm_time_30: avgStats.time.best_wpm_time_30,
      best_wpm_time_60: avgStats.time.best_wpm_time_60,
    },
    words: {
      avg_wpm_words_25: avgStats.words.avg_wpm_words_25,
      avg_wpm_words_50: avgStats.words.avg_wpm_words_50,
      avg_wpm_words_100: avgStats.words.avg_wpm_words_100,
      best_wpm_words_25: avgStats.words.best_wpm_words_25,
      best_wpm_words_50: avgStats.words.best_wpm_words_50,
      best_wpm_words_100: avgStats.words.best_wpm_words_100,
    },
  });

  useEffect(() => {
    setStatistics({
      time: {
        avg_wpm_time_15: avgStats.time.avg_wpm_time_15,
        avg_wpm_time_30: avgStats.time.avg_wpm_time_30,
        avg_wpm_time_60: avgStats.time.avg_wpm_time_60,
        best_wpm_time_15: avgStats.time.best_wpm_time_15,
        best_wpm_time_30: avgStats.time.best_wpm_time_30,
        best_wpm_time_60: avgStats.time.best_wpm_time_60,
      },
      words: {
        avg_wpm_words_25: avgStats.words.avg_wpm_words_25,
        avg_wpm_words_50: avgStats.words.avg_wpm_words_50,
        avg_wpm_words_100: avgStats.words.avg_wpm_words_100,
        best_wpm_words_25: avgStats.words.best_wpm_words_25,
        best_wpm_words_50: avgStats.words.best_wpm_words_50,
        best_wpm_words_100: avgStats.words.best_wpm_words_100,
      },
    });
  }, [avgStats]);

  return (
    <div className="profile-right bg-[--bg-color] brightness-90 w-[50%] h-96">
      <div className="upper-stat h-full">
        <h4 className="text-center text-2xl font-semibold text-[--text-correct-color] py-3">
          Statistics
        </h4>
        <div className="flex gap-5 items-center justify-center my-5">
          <button
            className={`h-[40px] w-[130px] bg-[--bg-color] rounded-md text-[--sub-color] hover:brightness-75 duration-150 ${
              currentMode === "time" ? "brightness-90" : ""
            }`}
            onClick={() => {
              setCurrentMode("time");
            }}
          >
            Time
          </button>
          <button
            className={`h-[40px] w-[130px] bg-[--bg-color] rounded-md text-[--sub-color] hover:brightness-75 duration-150 ${
              currentMode === "words" ? "brightness-90" : ""
            }`}
            onClick={() => {
              setCurrentMode("words");
            }}
          >
            Words
          </button>
        </div>
        <div className="alltime-best flex justify-between p-2">
          <ProfileStatItem
            time={currentMode === "time" ? 15 : 0}
            words={currentMode === "words" ? 25 : 0}
            best={
              currentMode === "time"
                ? statistics.time.best_wpm_time_15
                : statistics.words.best_wpm_words_25
            }
            avg={
              currentMode === "time"
                ? Number(statistics.time.avg_wpm_time_15.toFixed(1))
                : Number(statistics.words.avg_wpm_words_25.toFixed(1))
            }
          />
          <ProfileStatItem
            time={currentMode === "time" ? 30 : 0}
            words={currentMode === "words" ? 50 : 0}
            best={
              currentMode === "time"
                ? statistics.time.best_wpm_time_30
                : statistics.words.best_wpm_words_50
            }
            avg={
              currentMode === "time"
                ? Number(statistics.time.avg_wpm_time_30.toFixed(1))
                : Number(statistics.words.avg_wpm_words_50.toFixed(1))
            }
          />
          <ProfileStatItem
            time={currentMode === "time" ? 60 : 0}
            words={currentMode === "words" ? 100 : 0}
            best={
              currentMode === "time"
                ? statistics.time.best_wpm_time_60
                : statistics.words.best_wpm_words_100
            }
            avg={
              currentMode === "time"
                ? Number(statistics.time.avg_wpm_time_60.toFixed(1))
                : Number(statistics.words.avg_wpm_words_100.toFixed(1))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStatistics;
