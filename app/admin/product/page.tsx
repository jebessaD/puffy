"use client";

import {
  useForm,
  Controller,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ProductInfoSection from "@/app/components/ProductInfoSection";
import ProductOptionsSection from "@/app/components/ProductOptionsSection";
import ProductImagesSection from "@/app/components/ProductImagesSection";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/app/lib/data.type";
import { fetcher, post } from "@/app/lib/fetcher";
import useSWR from "swr";
import { DevTool } from '@hookform/devtools';

const ProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    setValue,
    watch,
    trigger
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      color: [],
      size: [],
      mainImage: "",
      additionalImages: [],
    },
  });

  const { data, error, mutate } = useSWR("/api/products", fetcher);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price.toString()), // ensure float
      discount: parseFloat(data.discount.toString()), // ensure float
      stockQuantity: parseInt(data.stockQuantity.toString(), 10), // ensure int
    };
    await post("/api/products", formattedData);
    mutate(); // Refresh data
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-6 sm:pt-4 sm:px-12 bg-white rounded-2xl sm:shadow-md sm:m-8"
    >
      <DevTool control={control} />
      <ProductInfoSection register={register} errors={errors} />
      <div className="flex flex-col gap-4">
        <ProductOptionsSection
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
        <ProductImagesSection
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          register={register}
        />
        <Button type="submit" disabled={isSubmitting} className="py-5 w-full">
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
