import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { PasswordInput } from "../components/PasswordInput";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/dashboard");
      toast.success("Signup successful");
    } catch (err) {
      err;
      toast.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navbar */}
      <Navbar />

      {/* SignUp Form */}
      <div
        className="grid place-content-center text-center gap-4 max-sm:p-4"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="max-w-sm w-full">
          <h2 className="text-4xl font-mono mb-8">Sign Up</h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              className="input-box w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box w-full"
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

            <button className="btn-normal">
              {isLoading ? <Spinner /> : "Create Account"}
            </button>
            <p className="text-sm mt-4">
              Have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
