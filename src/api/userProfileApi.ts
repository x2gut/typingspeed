import apiClient from "./apiClient";

export const getUserProfilePicture = async (userId: number) => {
  const response = await apiClient.get(
    `/profile/profile-picture?user_id=${userId}`,
    {
      headers: {
        "Cache-Control": "no-cache",
      },
      responseType: "blob",
    }
  );

  return response;
};

export const getUserProfileData = async (userId: number) => {
  const response = await apiClient.get(`/user/?user_id=${userId}`);
  return response;
};

export const changeProfilePicture = async (formData: FormData) => {
  try {
    const response = await apiClient.put(
      "profile/profile-picture",
      formData,
      {}
    );
    return response;
  } catch (error) {
    return Promise.reject({ error: `Error uploading picture: ${error}` });
  }
};

export const sendEmail = async ({email, userId}: {email: string, userId: number}) => {
  return apiClient.post("/user/send-email", {
    email: email,
    user_id: userId,
  });
};
