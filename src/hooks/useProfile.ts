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
  TimeStats,
  WordsStats,
} from "../types/types";
import { queryClient } from "..";
import { useNoticeStore } from "../store/notification-store";
import useAuthStore from "../store/auth-store";

interface UseProfileOptions {
  fetchUserPicture?: boolean;
  fetchProfileData?: boolean;
  fetchResultsData?: boolean;
  fetchHistory?: boolean;
}

const useProfile = (userId: number, options: UseProfileOptions) => {
  const { isAuthenticated } = useAuthStore();
  const showNotice = useNoticeStore((state) => state.showNotice);
  const [isLoading, setIsLoading] = useState(true);
  const [userPicture, setUserPicture] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData>({
    username: null,
    email: null,
    id: null,
    isActive: null,
    created_at: "",
  });
  const [history, setHistory] = useState<{
    total_items: number;
    history: ProfileResultsData[];
  }>({
    total_items: 0,
    history: [],
  });
  const [avgStats, setAvgStats] = useState<{
    time: TimeStats;
    words: WordsStats;
  } | null>(null);

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
    () => getUserProfilePicture(userId),
    {
      enabled: options.fetchUserPicture ?? false,
      onSuccess: (response) => {
        const blobUrl = URL.createObjectURL(response.data);
        setUserPicture(blobUrl);
        setIsLoading(false);
      },
      onError: (error) => {
        showNotice(`Error fetching avatar: ${error}`, "error", 5000);
      },
      refetchOnWindowFocus: false,
    }
  );

  const profileQuery = useQuery(["userProfile"], () => getUserProfileData(), {
    enabled: options.fetchProfileData ?? false,
    onSuccess: (data) => {
      setProfileData({
        username: data.data.username,
        email: data.data.email,
        id: data.data.id,
        isActive: data.data.is_active,
        created_at: data.data.created_at,
      });
    },
    onError: (error) => {
      showNotice(`Error fetching user data: ${error}`, "error", 5000);
    },
    refetchOnWindowFocus: false,
  });

  const queryResultsData = useQuery(["userResults"], () => getStats(userId), {
    enabled: (options.fetchResultsData && isAuthenticated) ?? false,
    onSuccess: (data) => {
      setAvgStats(data.data);
    },
    onError: (error) => {
      showNotice(`Error fetching results data: ${error}`, "error", 5000);
    },
    refetchOnWindowFocus: false,
  });

  const queryHistory = useQuery(
    ["userHistory"],
    () => getHistory(userId, 500, 1),
    {
      enabled: options.fetchHistory ?? false,
      onSuccess: (data) => {
        setHistory(data.data);
      },
      onError: (error) => {
        showNotice(`Error fetching history: ${error}`, "error", 5000);
      },
      refetchOnWindowFocus: false,
    }
  );

  return {
    userPicture,
    profileData,
    avgStats,
    history,
    handlePictureChange,
    isLoading,
  };
};

export default useProfile;
