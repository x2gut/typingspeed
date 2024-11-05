import apiClient from "./apiClient";

export const getLeaderboard = async (
  limit: number = 50,
  mode: string = "time",
  words: number = 25,
  time: number = 60
) => {
  return apiClient.get(`/user/leaderboard?limit=${limit}&time=${time}&mode=${mode}&words=${words}`);
};
