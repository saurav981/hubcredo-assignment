import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    await logout();
    toast.success("Log out successful");
    navigate("/");
  }

  return (
    <div className="grid place-content-center text-center h-screen gap-6">
      <h1 className="text-4xl font-mono">Dashboard page</h1>
      <h2 className="text-2xl font-mono">Welcome, {user.name}!</h2>
      <h3 className="text-xl font-mono">Your email is {user.email}</h3>

      <div className="flex mx-auto gap-3">
        <Link to="/" className="btn-normal">
          Home
        </Link>
        <button className="btn-normal" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
