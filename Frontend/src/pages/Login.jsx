import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { PasswordInput } from "../components/PasswordInput";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard");
      toast.success("Login successful");
    } catch (err) {
      err;
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navbar */}
      <Navbar />

      {/* Login Form */}
      <div
        className="grid place-content-center text-center gap-4"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="max-w-sm w-full">
          <h2 className="text-4xl font-mono mb-8">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <PasswordInput
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button type="submit" className="btn-normal">
              {isLoading ? <Spinner /> : "Login"}
            </button>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
