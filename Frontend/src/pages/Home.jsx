import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="grid place-content-center text-center h-screen gap-6">
      <h1 className="text-4xl font-mono">Homepage</h1>

      <div className="flex mx-auto gap-3">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-normal">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn-normal">
              Login
            </Link>
            <Link to="/signup" className="btn-normal">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
