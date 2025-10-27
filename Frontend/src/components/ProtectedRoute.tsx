import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../features/auth/store/auth.store";

export default function ProtectedRoute() {
  const { token, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
