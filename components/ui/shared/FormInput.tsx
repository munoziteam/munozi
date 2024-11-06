import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Text from "./Text";
import { Input } from "../input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormInputProps {
  label?: string;
  id?: string;
  placeholder?: string;
  type: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="">
        <Text className=" font-bold">{label}</Text>
      </label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={label || placeholder}
          className={`w-full mt-1 py-5 bg-bg border-[1.5px] ${
            error ? "border-red-500" : ""
          }`}
          {...register}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
