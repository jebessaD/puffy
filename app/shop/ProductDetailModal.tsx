"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { Product } from "../lib/types";
import { Button } from "@/components/ui/button";
import { productNotAvailable } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "../store/useCartStore";
import { useRouter } from "next/navigation";
import { PiContactlessPayment } from "react-icons/pi";
import { IoBagCheckOutline } from "react-icons/io5";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const allImages = [product.mainImage, ...product.additionalImages];

  const router = useRouter();
  const { setCheckoutProducts, checkoutProducts } = useCartStore();
  const { toast } = useToast();

  const handleProceedToCheckout = () => {
    if (!selectedSize && product.size.length > 0) {
      toast({
        title: "Please select a size",
        description: "Size selection is required",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor && product.color.length > 0) {
      toast({
        title: "Please select a color",
        description: "Color selection is required",
        variant: "destructive",
      });
      return;
    }

    setCheckoutProducts([
      {
        ...product,
        quantity,
        selectedColor,
        selectedSize,
      },
    ]);

    router.push(`order/shipping-address`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl bg-gray-50 p-4 max-h-[80dvh] overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left Column - Images */}
          <div className="flex flex-col h-full min-h-0">
            <div className="relative flex-1 min-h-[300px] md:min-h-0 aspect-square rounded-xl bg-white mb-3">
              <Image
                src={
                  selectedImage.startsWith("http")
                    ? selectedImage
                    : productNotAvailable
                }
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex gap-2 border border-gray-50 bg-white rounded-xl p-1 overflow-x-auto pb-1 scrollbar-hide">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden flex-shrink-0 border transition-all ${
                    selectedImage === image
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image.startsWith("http") ? image : productNotAvailable}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-y-auto p-2 md:px-4">
              <div className="space-y-3">
                <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                  {product.name}
                </DialogTitle>

                <div className="space-y-2">
                  {product.discount && (
                    <div className="flex items-center gap-1.5">
                      <div className="text-sm md:text-base text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </div>
                      <Badge
                        variant="default"
                        className="bg-red-500 text-white text-xs px-1.5"
                      >
                        {product.discount}% OFF
                      </Badge>
                    </div>
                  )}
                  <div className="text-xl md:text-2xl font-semibold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {product.color.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1.5">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.color.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-2 py-1 rounded-md border transition-all flex items-center gap-1.5 text-sm ${
                            selectedColor === color
                              ? "bg-primary/10 text-primary"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className="w-4 h-3 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="capitalize">{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.size.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1.5">
                      Size
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.size.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-2 py-1 rounded-md border transition-all text-sm ${
                            selectedSize === size
                              ? "bg-primary/10 text-primary"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center border-t border-gray-100 pt-3 gap-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Quantity
                  </h3>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 bg-gray-50 hover:bg-white py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium border-x">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stockQuantity, quantity + 1)
                        )
                      }
                      className="px-2 bg-gray-50 hover:bg-white py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm"
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Section - Always visible */}
            <div className="border-t border-gray-100 pt-3 mt-auto">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-gray-500">Total:</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${(discountedPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                  {product.discount && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-500">You save:</span>
                      <span className="text-sm font-medium text-green-600">
                        $
                        {((product.price - discountedPrice) * quantity).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full text-sm h-10"
                  disabled={product.stockQuantity === 0}
                >
                  <IoBagCheckOutline className="w-4 h-4 mr-1.5" />
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
