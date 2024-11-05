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
  return apiClient.post("/user/results", {
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
  return apiClient.get(`/user/${userId}/stats`)
}

export const getHistory = async(userId: number, limit: number = 500, page: number = 1) => {
  return apiClient.get(`/user/${userId}/history?page=${page}&limit=${limit}`)
}