import React, { createContext, useEffect, useState } from "react";
import {
  getLocalSession,
  clearLocalSession,
  // setLocalSession,
} from "../utils/storage.utils";
import { getUserDetailsFromToken, authenticated } from "../utils/auth.utils";

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthToken: any;
  user: any;
  signOut: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuthenticated: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthToken: () => {},
  user: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialAuthToken = getLocalSession("@fun-token") || null;

  const [isAuthenticated, setIsAuthenticated] = useState(authenticated());
  const [authToken, setAuthToken] = useState(initialAuthToken);

  const [user, setUser] = useState<any>(
    getUserDetailsFromToken(authToken) || {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authenticated());
  }, [authToken]);

  const signOut = () => {
    clearLocalSession("@fun-token");
    setIsAuthenticated(false);
    setUser({});

    clearLocalSession("@myapp-firstName");
    clearLocalSession("@myapp-lastName");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setAuthToken,
        user,
        signOut,
        isLoading,
        setIsLoading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
