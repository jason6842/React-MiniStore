import { createContext, ReactNode, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

type AuthContextType = {
  token: string | null;
  refreshToken: () => Promise<void>;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: "",
  refreshToken: async () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.access_token);
      setToken(response.data.access_token);
    } catch (error) {
      logout();
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
