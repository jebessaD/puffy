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
    <label className="block mb-1 text-sm text-gray-800">{label}</label>
    <select
      {...register(name)}
      className="w-full px-4 py-3 border rounded-sm focus:border-gray-700 outline-none"
    >
      <option className="text-gray-700" value="">Select Country</option>
      {countries.all
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((country, index) => (
          <option key={index} value={country.alpha3}>
            {country.name}
          </option>
        ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);
