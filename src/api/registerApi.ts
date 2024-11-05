import axios from "axios";
import apiClient from "./apiClient";

const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<{ status: number; error?: string }[]> => {
  try {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });
    return [{ status: response.status }];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (Array.isArray(data.detail)) {
        const errors = data.detail.map((item: any) => ({
          status,
          error:
            item.msg.toLowerCase().replace("string", item.loc[1]) ||
            "Unknown error",
        }));

        return Promise.reject(errors)

      }

      if (Array.isArray(data.detail) && data.detail.length > 0) {
        const errorDetail = data.detail[0];
        const errorMessage = errorDetail.ctx?.reason || "Unknown error";

        return Promise.reject([
          {
            status,
            error: errorMessage,
          },
        ]);
      }

      return Promise.reject([
        {
          status,
          error: data.detail || "Unknown error",
        },
      ]);
    }

    return Promise.reject([{ status: 500, error: "Network error" }]);
  }
};

export default registerUser;
