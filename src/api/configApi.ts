import { TypeSettings } from "../types/types";
import apiClient from "./apiClient";

export const updateConfig = async (config: TypeSettings) => {
  const response = await apiClient.post("/user/config", { config: [config] });

  return response;
};

export const getConfig = async () => {
  const response = await apiClient.get("/user/config");

  return response;
};

export const updateTheme = async ({
  user_id,
  newTheme,
}: {
  user_id: number;
  newTheme: string;
}) => {
  const response = await apiClient.post("/user/theme", {
    id: user_id,
    theme: newTheme,
  });

  return response;
};
