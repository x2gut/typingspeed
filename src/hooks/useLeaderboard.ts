import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getLeaderboard } from "../api/leaderboardApi";
import { useNoticeStore } from "../store/notification-store";

interface UserResult {
  gameId: number;
  user_id: number;
  username: string;
  wpm: number;
  accuracy: number;
  created_at: string;
}

const useLeaderboard = (mode: string, time: number, words: number) => {
  const [leaderboardData, setLeaderboardData] = useState<UserResult[]>([]);
  const showNotice = useNoticeStore((state) => state.showNotice)
  const [isLoading, setIsLoading] = useState(true);

  const queryLeaderboard = useQuery(
    ["leaderboard"],
    () => getLeaderboard(50, mode, words, time),
    {
      onSuccess: (data) => {
        setLeaderboardData(data.data);
        setIsLoading(false);
      },
      onError: (error) => {
        showNotice(`Error fetching leaderboard: ${error}`, "error", 5000);
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    queryLeaderboard.refetch();
  }, [mode, time, words]);

  return { leaderboardData, isLoading };
};

export default useLeaderboard;
