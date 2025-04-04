"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductInfoSection from "@/app/admin/product/ProductInfoSection";
import ProductOptionsSection from "@/app/admin/product/ProductOptionsSection";
import ProductImagesSection from "@/app/admin/product/ProductImagesSection";
import { Button } from "@/components/ui/button";
import { productSchema, ProductFormValues } from "@/app/lib/schema";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/app/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import useProducts from "@/app/hooks/useProducts";
import { MutatorCallback } from "swr";

interface EditProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  mutate: MutatorCallback;
}

export default function EditProductDialog({
  product,
  isOpen,
  onClose,
  mutate
}: EditProductDialogProps) {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    setValue,
    watch,
    trigger,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stockQuantity: product.stockQuantity,
      color: product.color || [],
      size: product.size || [],
      mainImage: product.mainImage,
      additionalImages: product.additionalImages || [],
    },
  });

  const { updateProduct } = useProducts();

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      await updateProduct(product.id, data);
      await mutate();

      toast({
        title: "Success!",
        description: "Product has been updated successfully.",
        variant: "default",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[900px] h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Edit Product: {product.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <div className="space-y-6">
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
              </div>

              <div className="space-y-6">
                <ProductImagesSection
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  register={register}
                />
              </div>
            </div>

            <div className="sticky bottom-0 flex gap-2 justify-end bg-white py-4 border-t mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
