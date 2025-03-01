import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: Cookies.get("userId") || null,
    token: Cookies.get("authToken") || null,
  });

  useEffect(() => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("authToken");

    if (userId && token) {
      setAuth({ userId, token });
    }
  }, []);

  const loginUser = (userId, token) => {
    Cookies.set("userId", userId);
    Cookies.set("authToken", token);
    setAuth({ userId, token });
  };

  const logoutUser = () => {
    Cookies.remove("userId");
    Cookies.remove("authToken");
    setAuth({ userId: null, token: null });
  };

  const isAuthenticated = () => {
    console.log(auth.token);
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
