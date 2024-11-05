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
}) => {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      username,
      password,
    });

    return response
};

export default loginUser;
