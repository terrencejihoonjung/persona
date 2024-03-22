import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/account" replace />;
}

export default ProtectedRoute;
