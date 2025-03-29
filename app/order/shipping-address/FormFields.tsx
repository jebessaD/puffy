import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TextInput } from "../../../components/custom/FormInput";
import { SelectInput } from "./SelectInput";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const FormFields: React.FC<Props> = ({ register, errors }) => (
  <div className="p-4">
    {/* Personal Info */}

    <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <TextInput
        label="Full Name"
        name="fullName"
        register={register}
        error={errors.fullName as any}
      />
      <TextInput
        label="Email"
        name="email"
        register={register}
        error={errors.email as any}
      />
      <TextInput
        label="Phone Number "
        label2="(with country code)"
        name="phone"
        register={register}
        error={errors.phone as any}
      />
    </div>
    {/* Address Info */}
    <h2 className="text-lg font-semibold mb-2">Address Info</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SelectInput
        label="Country"
        name="country"
        register={register}
        error={errors.country as any}
      />
      <TextInput
        label="Address"
        name="address"
        register={register}
        error={errors.address as any}
      />
      <TextInput
        label="Address Line 2"
        label2="(Optional)"
        name="address2"
        register={register}
      />
      <TextInput
        label="City"
        name="city"
        register={register}
        error={errors.city as any}
      />
      <TextInput
        label="State "
        label2="(Optional)"
        name="state"
        register={register}
      />

      <TextInput
        label="Postal Code"
        name="postalCode"
        register={register}
        error={errors.postalCode as any}
      />
    </div>
  </div>
);
