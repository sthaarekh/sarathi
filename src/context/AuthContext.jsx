import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("authToken") || null,
  });

  // Function to update auth state
  const loginUser = (userId, token) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("authToken", token);
    setAuth({ userId, token });
  };

  const logoutUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    setAuth({ userId: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
