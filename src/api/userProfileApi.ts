import apiClient from "./apiClient";

export const getUserProfilePicture = async (userId: number) => {
  const response = await apiClient.get(`/user/${userId}/avatar`, {
    headers: {
      "Cache-Control": "no-cache",
    },
    responseType: "blob",
  });

  return response;
};

export const getUserProfileData = async () => {
  const response = await apiClient.get("/user");
  return response;
};

export const changeProfilePicture = async (formData: FormData) => {
  try {
    const response = await apiClient.post("/uploads/profile_pic", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return Promise.reject({ error: `Error uploading picture: ${error}` });
  }
};
