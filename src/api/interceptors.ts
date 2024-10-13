import axios, { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          const refreshToken = localStorage.getItem("refresh_token");
          const response = await apiClient.get("/token/refresh", {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          const newAccessToken = response.data.access_token;
          localStorage.setItem("access_token", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.log("Error refreshing token ", refreshError);
      }
    }
    return Promise.reject(error);
  }
);
