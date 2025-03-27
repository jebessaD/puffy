"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema, ShippingAddress } from "@/app/lib/schema";
import { FormFields } from "./FormFields";
import ProgressSteps from "./ProgressSteps";
import PaymentMethods from "./PaymentMethods";

const ShippingAddressForm: React.FC = () => {
  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
  });

  const steps = ["Shipping Address", "Checkout"];

  const onSubmit = (data: ShippingAddress) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="container mx-auto p-6 space-y-8"
    >
      <ProgressSteps steps={steps} currentStep={0} />
      <FormFields register={form.register} errors={form.formState.errors} />
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 rounded-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <PaymentMethods />
    </form>
  );
};

export default ShippingAddressForm;
