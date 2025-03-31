"use client";

import Image from "next/image";
import { Product } from "@/app/lib/types";
import { ShoppingCart, Heart, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { productNotAvailable } from "@/app/lib/utils";
import { useCartStore } from "../store/useCartStore";
import { usePathname, useRouter } from "next/navigation";
import EditProductDialog from "@/app/admin/edit/EditProductDialog";
import { MutatorCallback } from "swr";
import { LiaShippingFastSolid } from "react-icons/lia";

interface ProductCardProps {
  product: Product;
  mutate: MutatorCallback;
}

export default function ProductCard({ product, mutate }: ProductCardProps) {
  const { items, removeItem, addItem } = useCartStore();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isAdminEdit = pathname.startsWith("/admin/edit");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Check if product is in cart
  const isInCart = items.some((item) => item.product.id === product.id);

  // Default image URL if mainImage is not provided or invalid
  const imageUrl = product.mainImage?.startsWith("http")
    ? product.mainImage
    : productNotAvailable;

  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleCartClick = () => {
    if (product.stockQuantity > 0) {
      if (isInCart) {
        removeItem(product.id);
        toast({
          title: "Removed from cart",
          description: "Product removed from cart.",
          variant: "default",
        });
      } else {
        addItem(product);
        toast({
          title: "Added to cart",
          description: "Product added to cart.",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Error!",
        description: "Product is out of stock.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast({
        title: "Success",
        description: "Product deleted successfully",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div
        className="group relative overflow-hidden rounded  border border-gray-200 bg-white transition-all lg:hover:border-gray-200 cursor-pointer"
        onClick={isAdminEdit ? undefined : () => setShowModal(true)}
      >
        {/* Image Container */}
        <div className="relative bg-white h-32 lg:h-auto lg:aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 lg:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Content Container with Background - Move transform to this div */}
        <div className="relative flex flex-col bg-white transform transition-transform duration-300 lg:group-hover:-translate-y-[56px]">
          {/* Product Info - Remove transform from here */}
          <div className="p-2 md:p-4 relative h-48 border-t border-slate-50 lg:h-full lg:pb-4 lg:pt-4">
            {/* Main Content */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="text-lg text-gray-900 mb-1">{product.name}</h3>
                {/* Stock Status */}
                {/* <div>
                  {product.stockQuantity > 0 ? (
                    <span className="text-sm text-green-600">In Stock ({product.stockQuantity})</span>
                  ) : (
                    <span className="text-sm text-red-600">Out of Stock</span>
                  )}
                </div> */}
              </div>

              {/* Price */}
              <div className="">
                <div className="flex w-full items-end justify-between gap-2">
                  <div className="">
                    {product.discount ? (
                      <div className="flex text-xs items-center gap-1 sm:gap-2">
                        <span className="text-gray-500 line-through">
                          ${product?.price?.toFixed(2)}
                        </span>
                        <span className="rounded-full flex justify-end bg-green-100 px-2 py-px text-xs font-medium text-green-600">
                          -{product.discount}%
                        </span>
                      </div>
                    ) : (
                      <div className="h-4"></div>
                      // <></>
                    )}
                    <span className="text-xl font-medium text-gray-900 flex items-end">
                      <span>{Math.floor(discountedPrice)}</span>

                      <span className="text-sm mb-0.5 font-normal text-gray-700">
                        .{discountedPrice.toFixed(2).split(".")[1]}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm bg-green-100 p-1 h-fit space-x-2 items-center rounded px-2 text-green-600 flex">
                    <LiaShippingFastSolid />{" "}
                    <span className="text-xs">Free Shipping</span>{" "}
                  </p>
                </div>

                {/* Rating */}
                {/* {product.averageRating > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {product.averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.numReviews})
                    </span>
                  </div>
                )} */}
              </div>

              {/* Category */}
              {/* <div>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div> */}
            </div>

            {/* Add to Cart Button - Positioned absolutely */}
            {isAdminEdit ? (
              // Admin Edit/Delete Buttons
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 
                      rounded-sm font-medium transform transition-all duration-300
                      opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                      flex items-center justify-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100
                      rounded-sm font-medium transform transition-all duration-300
                      opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                      flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCartClick();
                }}
                disabled={product.stockQuantity === 0}
                className={`
                absolute left-4 right-4 px-4 py-2 rounded-sm mb-4 mt-auto font-medium
                transform transition-all duration-300
                ${
                  isInCart
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-black text-white hover:bg-gray-800"
                }
                opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                translate-y-4 lg:translate-y-2 lg:group-hover:translate-y-4
                disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
              `}
              >
                <div className="flex items-center md:text-base text-sm justify-center gap-2">
                  <ShoppingCart className="h-3 md:h-5 w-3 md:w-5" />
                  {isInCart ? "Remove" : "Add to Cart"}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <ProductDetailModal
        product={product}
        open={showModal}
        onOpenChange={setShowModal}
      />

      <EditProductDialog
        product={product}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        mutate={mutate}
      />
    </>
  );
}
