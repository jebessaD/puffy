"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductInfoSection from "@/app/admin/product/ProductInfoSection";
import ProductOptionsSection from "@/app/admin/product/ProductOptionsSection";
import ProductImagesSection from "@/app/admin/product/ProductImagesSection";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import useProducts from "@/app/hooks/useProducts";
import { productSchema, ProductFormValues } from "@/app/lib/schema";
import { useToast } from "../../../components/ui/use-toast";

const ProductForm = () => {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    setValue,
    watch,
    trigger,
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      color: [],
      size: [],
      mainImage: "",
      additionalImages: [],
    },
  });

  const { createProduct } = useProducts();

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      await createProduct(data);
      toast({
        title: "Success!",
        description: "Product has been created successfully.",
        variant: "default",
      });
      reset({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        stockQuantity: 0,
        color: [],
        size: [],
        mainImage: "",
        additionalImages: [],
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    }
  };

  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-6 sm:pt-4 sm:px-12 bg-white rounded-2xl sm:shadow-md sm:m-8"
    >
      <DevTool control={control} />
      <ProductInfoSection register={register} errors={errors} watch={watch} />
      <div className="flex flex-col gap-4">
        <ProductOptionsSection
          control={control}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
        />
        <ProductImagesSection
          setValue={setValue}
          watch={watch}
          errors={errors}
          register={register}
        />
        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="py-5 w-full"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
