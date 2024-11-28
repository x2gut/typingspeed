import { TypeSettings } from "../types/types";
import apiClient from "./apiClient";

export const createConfig = async ({
  userId,
  theme,
  config,
}: {
  userId: number;
  theme: string;
  config: TypeSettings;
}) => {
  const response = await apiClient.post("/config", {
    user_id: userId,
    config: config,
    theme: theme,
  });
  return response;
};

export const updateConfig = async ({config, userId}: {config: TypeSettings, userId: number}) => {
  const response = await apiClient.put("/config", { user_id: userId, config: config });

  return response;
};

export const getConfig = async (userId: number) => {
  const response = await apiClient.get(`/config/${userId}`);

  return response;
};

export const updateTheme = async ({
  user_id,
  newTheme,
}: {
  user_id: number;
  newTheme: string;
}) => {
  const response = await apiClient.put("/config/theme", {
    user_id: user_id,
    theme: newTheme,
  });

  return response;
};
