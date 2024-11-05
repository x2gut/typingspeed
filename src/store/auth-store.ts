import { create } from "zustand";
import { getUserId, getUsername } from "../utils/decodeJwt";

interface AuthStore {
  isAuthenticated: boolean;
  username: string;
  userId: number;
  setIsAuthenticated: () => void;
  Logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  username: "",
  userId: 0,
  setIsAuthenticated: () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const username = getUsername(token);
      const userId = getUserId(token);
      set({
        isAuthenticated: true,
        username: username,
        userId: userId,
      });
    }
  },
  Logout: () => {
    set({
      isAuthenticated: false,
      username: "",
      userId: 0,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));

useAuthStore.getState().setIsAuthenticated();

export default useAuthStore;
