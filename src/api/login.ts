import axios from "axios";
import apiClient from "./apiClient";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ status: number; error?: string }> => {
  try {
    const response = await apiClient.post<LoginResponse>("/user/login", {
      username,
      password,
    });

    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return { status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject({
        status: error.response.status,
        error: error.response.data?.detail || "Unknown error",
      });
    }
    return Promise.reject({ status: 500, error: "Network error" });
  }
};

export default loginUser;
