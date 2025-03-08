import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: Cookies.get("userId") || null,
    token: Cookies.get("authToken") || null,
    isMainAdmin: Cookies.get("isMainAdmin") === "true" || false
  });

  useEffect(() => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("authToken");
    const isMainAdmin = Cookies.get("isMainAdmin") === "true";
    
    if (userId && token) {
      setAuth({ userId, token, isMainAdmin });
    }
  }, []);

  const loginUser = (userId, token, isMainAdmin = false) => {
    Cookies.set("userId", userId);
    Cookies.set("authToken", token);
    Cookies.set("isMainAdmin", isMainAdmin);
    setAuth({ userId, token, isMainAdmin });
  };

  const logoutUser = () => {
    Cookies.remove("userId");
    Cookies.remove("authToken");
    Cookies.remove("isMainAdmin");
    setAuth({ userId: null, token: null, isMainAdmin: false });
  };

  const isAuthenticated = () => {
    return Boolean(auth.token);
  };

  return (
    <AuthContext.Provider
      value={{ auth, loginUser, setAuth, logoutUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;