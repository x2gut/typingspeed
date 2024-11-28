import { jwtDecode } from "jwt-decode";

export const getUsername = (token: string): string | undefined => {
  {
    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;
    return username;
  }
};

export const getUserId = (token: string): number => {
  const decodedToken = jwtDecode<{ id: number }>(token);
  const id = decodedToken.id;
  return id;
};

export const getUserEmail = (token: string): string => {
  const decodedToken = jwtDecode<{ email: string }>(token);
  const email = decodedToken.email;
  return email;
};

export const getUserStatus = (token: string): boolean => {
  const decodedToken = jwtDecode<{ is_active: boolean }>(token);
  const status = decodedToken.is_active;
  return status;
};
