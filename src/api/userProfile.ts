import { getUserId } from "../utils/decodeJwt";
import apiClient from "./apiClient";

export const getUserProfilePicture = async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const userId = getUserId(token);
    try {
      const response = await apiClient.get(`/users/${userId}/avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
      } else {
        throw new Error("Avatar not found");
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  } else {
    console.error("Token not found");
    return null;
  }
};
