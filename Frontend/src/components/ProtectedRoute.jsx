import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Protect routes: If non-logged user tries to goto any protected route, redirect to Login page
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
