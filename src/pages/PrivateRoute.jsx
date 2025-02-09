import { Navigate, Outlet, useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);
  const { clubId } = useParams();

  // Check if user is logged in
  if (!auth.token || auth.userId !== clubId) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
