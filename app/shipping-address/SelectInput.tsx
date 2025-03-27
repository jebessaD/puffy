import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { countries } from "country-data-list";

interface SelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const SelectInput: React.FC<SelectProps> = ({
  label,
  name,
  register,
  error,
}) => (
  <div>
    <label className="block mb-1">{label}</label>
    <select
      {...register(name)}
      className="w-full px-4 py-3 border rounded-sm focus:border-gray-700 outline-none"
    >
      <option value="">Select Country</option>
      {countries.all.map((country, index) => (
        <option key={index} value={country.alpha3}>
          {country.name}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
