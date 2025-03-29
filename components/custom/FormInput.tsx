import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  label2?: string;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  name,
  register,
  placeholder = "",
  type = "text",
  error, 
  label2,
}) => (
  <div>
    <label className="block mb-1 text-sm text-gray-800">{label} {label2 && <span className="text-gray-500">{label2}</span>}</label>
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border rounded-sm focus:border-gray-700 outline-none"
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
