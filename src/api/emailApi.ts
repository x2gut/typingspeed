import apiClient from "./apiClient";

export const changeEmail = async ({email, userId, password}: {email: string, userId: number, password: string}) => {
  return apiClient.put("/user/email", {
    user_id: userId,
    password: password,
    new_email: email,
  });
};
