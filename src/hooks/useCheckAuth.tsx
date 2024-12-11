import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";
import { getAuthStatus } from "../api/authApi";

export const useAuthCheck = () => {
  const { setUser } = useAuthStore();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const query = useQuery("authStatus", getAuthStatus, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.data)
    },
    onError: (error: AxiosError) => {
      console.error("Auth check failed:", error.message);
      setIsAuthenticated(false);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  return {
    ...query,
    refetchAuthStatus: query.refetch
  }
};
