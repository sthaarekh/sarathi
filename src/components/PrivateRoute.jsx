import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../context/Hook/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();
  // console.log(auth.userId);
  // console.log(auth.token);

  // Check if user is logged in
  if (!auth.userId || !auth.token) {
    console.log("login ma jaa");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
