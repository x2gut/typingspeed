import { jwtDecode } from "jwt-decode";

export const getUsername = (token: string): string | undefined => {
  {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;
    return username;
  }
};

export const getUserId = (token: string): number | undefined => {
  const decodedToken = jwtDecode<{ id: number }>(token);
  const id = decodedToken.id;
  return id;
};
