"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedAuthToken = sessionStorage.getItem("authToken");
    if (savedAuthToken !== "" && savedAuthToken) {
      setIsAuthenticated(true);
      setAuthToken(savedAuthToken);
      startSessionTimeout();
      return;
    }
    setAuthToken("");
  }, []);

  const startSessionTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      logout();
    }, 300000);
    setTimeoutId(id);
  };

  const login = (token: string) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    sessionStorage.setItem("authToken", token ?? "");
    startSessionTimeout();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    sessionStorage.removeItem("authToken");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
