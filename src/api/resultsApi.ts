import apiClient from "./apiClient";

export const addResults = async ({
  user_id,
  wpm,
  accuracy,
  mistakes,
  time,
  words,
  mode,
  language,
}: {
  user_id: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
  time: number,
  words: number,
  mode: string,
  language: string
}) => {
  return await apiClient.post("results", {
    user_id: user_id,
    wpm: wpm,
    accuracy: accuracy,
    mistakes: mistakes,
    time: time,
    words: words,
    mode: mode,
    language: language,
  });
};


export const getStats = async (userId: number) => {
  return apiClient.get(`/results/stats/${userId}`)
}

export const getHistory = async(userId: number, limit: number = 500, page: number = 1) => {
  return apiClient.get(`/results/history/${userId}?limit=${limit}`)
}

export const getLeaderboard = async (
  limit: number = 50,
  mode: string = "time",
  words: number = 25,
  time: number = 60
) => {
  return apiClient.get(`/results/leaderboard?limit=${limit}&time=${time}&mode=${mode}&words=${words}`);
};
