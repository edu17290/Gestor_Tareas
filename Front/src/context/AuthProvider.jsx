import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth.context";
import AuthService from "../services/auth.services";

const authService = new AuthService(); 

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("authToken"));
  const [fetchError, setFetchError] = useState(null);

  const login = useCallback(async ({ username, password }) => {
    setFetchError(null); 

    try {
      const { token, error } = await authService.login({ username, password });

      if (error) {
        throw new Error(error);
      }

      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
    } catch (error) {
      setFetchError(error.message || "Error al ingresar");
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    setFetchError(null); 
    localStorage.removeItem("authToken");
  }, []);

  const value = useMemo(() => ({
    login,
    logout,
    token,
    isAuthenticated,
    fetchError
  }), [login, logout, token, isAuthenticated, fetchError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
