import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// If a 'LoggedIn/Authenticated' user goes to these routes (Login/Signup), redirect them to dashboard
export const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return children;
};
