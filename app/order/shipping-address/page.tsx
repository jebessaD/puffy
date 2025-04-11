"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "@/app/lib/schema";
import type { ShippingAddress } from "@/app/lib/schema";
import { FormFields } from "./FormFields";
import ProgressSteps from "./ProgressSteps";
import PaymentMethods from "./PaymentMethods";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../../store/useCartStore";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/ui/loading";

function ShippingAddressForm() {
  const [isDefault, setIsDefault] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkoutProducts, setShippingAddress } = useCartStore();
  const steps = ["Shipping Address", "Checkout"];

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      address2: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
    },
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem("defaultShippingAddress");
    if (savedAddress) {
      const parsedAddress: ShippingAddress = JSON.parse(savedAddress);
      form.reset(parsedAddress);
      setIsDefault(true);
    }

    const fromCart = searchParams.get("fromCart");
  }, [form, searchParams]);

  const onSubmit = async (data: ShippingAddress) => {
    setLoading(true);
    try {
      setShippingAddress(data);

      if (isDefault) {
        localStorage.setItem("defaultShippingAddress", JSON.stringify(data));
      }
      const fromCart = searchParams.get("fromCart");
      router.push(`/order/info-confirmation${fromCart ? `?fromCart=${fromCart}` : ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="container mx-auto p-6 space-y-8 pb-20"
      autoComplete="on"
    >
      <div className="fixed left-0 right-0 top-0 flex items-center justify-between p-4 bg-white z-20 shadow-sm">
        <ProgressSteps steps={steps} currentStep={0} />
      </div>

      <FormFields register={form.register} errors={form.formState.errors} />
      <PaymentMethods />

      <div className="fixed left-0 right-0 bottom-0 flex items-center justify-between p-4 bg-white shadow-[0_-0.1px_2px_rgba(0,0,0,0.1)]">
        <div className="flex items-center space-x-2 p-2 px-6">
          <input
            type="checkbox"
            id="defaultAddress"
            className="w-4 h-4 accent-black"
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
          />
          <label htmlFor="defaultAddress" className="text-sm text-gray-600">
            Make this my default address
          </label>
        </div>

        <Button
          size={"lg"}
          className="rounded-sm h-10"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Continue to Payment"}
        </Button>
      </div>
    </form>
  );
}

export default function ShippingAddress() {
  return (
    <Suspense
      fallback={
        <p className="text-center py-12">
          <Loading />
        </p>
      }
    >
      <ShippingAddressForm />
    </Suspense>
  );
}
