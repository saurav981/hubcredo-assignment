import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="p-4">
      <Link
        to="/"
        className="font-mono text-2xl font-bold text-bright hover:underline transition px-2"
      >
        {import.meta.env.VITE_APP_NAME || "HubCredo"}
      </Link>
    </div>
  );
};
