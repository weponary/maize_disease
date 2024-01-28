import jwtDecode from "jwt-decode";
import { getTokenFromStorage } from "./storage.utils";

export const isTokenExpired = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getUserDetailsFromToken = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded) {
      return decoded;
    }
  } catch (e) {
    return null;
  }
};

export interface DecodedToken {
  user: User;
  iat: number;
  exp: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const authenticated = () => {
  const token = getTokenFromStorage();

  if (token && !isTokenExpired(token)) {
    return true;
  }
  return false;
};
