import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/Hook/useAuth";

const AdminPrivateRoute = () => {
  const { auth } = useAuth();
  
  // Check if user is logged in
  if (!auth.userId || !auth.token) {
    console.log("Not logged in, redirecting to login");
    return <Navigate to="/login" />;
  }

  // Check if user is a main admin
  if (!auth.isMainAdmin) {
    console.log("Not authorized as main admin, redirecting to home");
    return <Navigate to="/" />;
  }

  // If user is logged in and is a main admin, grant access
  return <Outlet />;
};

export default AdminPrivateRoute;