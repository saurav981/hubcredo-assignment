import { Loader } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="grid place-content-center h-screen gap-3">
      <Loader size={30} className="animate-spin mx-auto " />

      <p className="text-gray-900">Loading...</p>
    </div>
  );
};

export const Spinner = () => {
  return <Loader className="animate-spin mx-auto" />;
};
