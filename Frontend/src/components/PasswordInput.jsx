import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const iconSize = 16;

  return (
    <div className="flex items-center rounded-md border-[1.5px] px-3 py-2">
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="outline-none bg-transparent flex-1 w-full"
        value={value}
        onChange={onChange}
      />
      <button type="button" className="ml-2" onClick={toggleShowPassword}>
        {isShowPassword ? (
          <Eye className="text-neutral-600" size={iconSize} />
        ) : (
          <EyeOff className="text-neutral-600" size={iconSize} />
        )}
      </button>
    </div>
  );
};
