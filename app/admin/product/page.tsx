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
        stockQuantity: 10000,
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

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" bg-white rounded-2xl p-4"
    >
      <DevTool control={control} />

      <div className="@container grid sm:grid-cols-2 gap-4 ">
        <div className="bg-gray-50 rounded-xl p-6">
          {" "}
          <ProductInfoSection
            register={register}
            errors={errors}
            watch={watch}
          />
          <ProductOptionsSection
            setValue={setValue}
            watch={watch}
            trigger={trigger}
          />
        </div>

        <div className=" gap-4">
          <ProductImagesSection
            setValue={setValue}
            watch={watch}
            errors={errors}
            register={register}
          />

          <div className="p-4">
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="p-5 w-full"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
