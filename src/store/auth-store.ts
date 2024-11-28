import { create } from "zustand";
import { User } from "../types/types";
import apiClient from "../api/apiClient";


interface AuthStore {
  isAuthenticated: boolean;
  username: string;
  userId: number;
  email: string;
  isActive: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (userData: User) => void;
  Logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  username: "",
  userId: 0,
  email: "",
  isActive: false,
  setUser: (userData) => {
    set({
      username: userData.username,
      userId: userData.id,
      email: userData.email,
      isActive: userData.isActive,
    })
  },
  setIsAuthenticated: (value) => {
    set({
      isAuthenticated: value
    })
  },
  Logout: () => {
    set({
      isAuthenticated: false,
      username: "",
      userId: 0,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    apiClient.get("/auth/logout")
  },
}));

