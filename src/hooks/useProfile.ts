import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  changeProfilePicture,
  getUserProfileData,
  getUserProfilePicture,
} from "../api/userProfileApi";
import { getHistory, getStats } from "../api/resultsApi";
import {
  ProfileData,
  ProfileResultsData,
  ShowNotice,
  TimeStats,
  WordsStats,
} from "../types/types";
import { queryClient } from "..";

const useProfile = (showNotice: ShowNotice, userId: number, limit: number) => {
  const [userPicture, setUserPicture] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData>({
    username: null,
    email: null,
    id: null,
    isActive: null,
  });
  const [history, setHistory] = useState<{
    total_items: number;
    history: ProfileResultsData[];
  }>({
    total_items: 0,
    history: []
  });
  const [avgStats, setAvgStats] = useState<{
    time: TimeStats;
    words: WordsStats;
  }>({
    time: {
      avg_wpm_time_15: 0,
      avg_wpm_time_30: 0,
      avg_wpm_time_60: 0,
      best_wpm_time_15: 0,
      best_wpm_time_30: 0,
      best_wpm_time_60: 0,
    },
    words: {
      avg_wpm_words_25: 0,
      avg_wpm_words_50: 0,
      avg_wpm_words_100: 0,
      best_wpm_words_25: 0,
      best_wpm_words_50: 0,
      best_wpm_words_100: 0,
    },
  });

  const mutation = useMutation(changeProfilePicture, {
    onSuccess: () => {
      showNotice("Profile picture updated", "success", 5000);
      queryClient.invalidateQueries("userPic");
    },
    onError: () => {
      showNotice("Failed updating profile picture", "error", 5000);
    },
  });

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append("profilePicture", file);

      mutation.mutate(formData);
    }
  };

  const queryProfilePicture = useQuery(
    ["userPic"],
    () => {
      return getUserProfilePicture(userId);
    },
    {
      onSuccess: (response) => {
        const blobUrl = URL.createObjectURL(response.data);
        setUserPicture(blobUrl);
      },
      onError: (error) => {
        showNotice(`Error fetching avatar: ${error}`, "error", 5000);
      },
      refetchOnWindowFocus: false,
    }
  );

  const queryProfileData = useQuery(["userProfile"], getUserProfileData, {
    onSuccess: (data) => {
      setProfileData({
        username: data.data.username,
        email: data.data.email,
        id: data.data.id,
        isActive: data.data.is_active,
      });
    },
    onError: (error) => {
      showNotice(`Error fetching user data: ${error}`, "error", 5000);
    },
    refetchOnWindowFocus: false,
  });

  const queryResultsData = useQuery(["userResults"], () => getStats(userId), {
    onSuccess: (data) => {
      setAvgStats(data.data);
    },
    onError: (error) => {
      showNotice(`Error fetching results data: ${error}`, "error", 5000);
    },
    refetchOnWindowFocus: false,
  });

  const queryHistory = useQuery(
    ["userHistory", limit],
    () => getHistory(userId, limit, 1),
    {
      onSuccess: (data) => {
        setHistory(data.data);
      },
      onError: (error) => {
        showNotice(`Error fetching history: ${error}`, "error", 5000);
      },
      refetchOnWindowFocus: false
    }
  );

  return { userPicture, profileData, avgStats, history, handlePictureChange };
};

export default useProfile;
