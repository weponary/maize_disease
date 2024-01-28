import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth: any = () => {
  return useContext(AuthContext);
};
