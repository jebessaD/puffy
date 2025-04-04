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

    // Store selected product for checkout without affecting cart
    setCheckoutProducts([
      {
        ...product,
        quantity,
        selectedColor,
        selectedSize,
      },
    ]);

    // Redirect to shipping address page
    router.push(`order/shipping-address`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl bg-gray-50 p-4 md:max-h-[90vh] max-h-[80vh] overflow-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="relative bg-gray-50/50 ">
            <div className="h-full flex flex-col">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white mb-3">
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
              <div className="flex gap-4 border border-gray-50 bg-white rounded-xl p-1 overflow-x-auto pb-1 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 border transition-all ${
                      selectedImage === image
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        image.startsWith("http") ? image : productNotAvailable
                      }
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col max-h-[90vh] p-2 ">
            <div className="flex-1 overflow-y-auto p-2 md:px-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <DialogTitle className="text-lg border-b border-gray-100 text-2xl font-bold text-gray-900 pb-3">
                    {product.name}
                  </DialogTitle>
                  {/* <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                            i < Math.floor(product.averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-500">
                      ({product.numReviews} reviews)
                    </span>
                  </div> */}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-col items-baseline gap-1.5">
                    {product.discount ? (
                      <div className="flex items-center gap-1.5">
                        <div className="text-sm md:text-base text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </div>
                        <Badge
                          variant="default"
                          className="ml-1.5 bg-red-500 text-white text-xs shadow-nonne px-1.5 pt-0.5"
                        >
                          {product.discount}% OFF
                        </Badge>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="text-2xl md:text-3xl font-semibold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </div>
                  </div>
                  {/* <p className="text-xs md:text-sm text-gray-500">
                    {product.stockQuantity > 0 ? (
                      <span className="text-green-600 font-medium">
                        In Stock ({product.stockQuantity} available)
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </p> */}
                </div>

                <div className="space-y-3 md:space-y-4 border-gray-100 pb-3">
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  {product.color.length > 0 && (
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1.5">
                        Color
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.color.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative px-2 py-1.5 rounded-md border transition-all flex items-center gap-1.5 text-xs md:text-sm ${
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
                      <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-1.5">
                        Size
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {product.size.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-2 py-1.5 rounded-md border transition-all text-xs md:text-sm ${
                              selectedSize === size
                                ? " bg-primary/5 text-primary"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center border-t border-gray-100 pt-4 gap-2">
                    <h3 className="text-xs md:text-sm font-medium text-gray-900">
                      Quantity
                    </h3>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 bg-gray-50 hover:bg-white py-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-sm md:text-base font-medium border-x">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(
                            Math.min(product.stockQuantity, quantity + 1)
                          )
                        }
                        className="px-2 bg-gray-50 hover:bg-white py-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                        disabled={quantity >= product.stockQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-t-gray-100 ">
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex items-center justify-between">
                  {/* <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 md:h-9 md:w-9"
                  >
                    <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button> */}
                </div>
                <div className="flex items-center justify-between w-full gap-2 md:gap-3">
                  <div className="flex items-center  gap-1.5">
                    <span className="text-xs md:text-sm text-gray-500">
                      Total:
                    </span>
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      ${(discountedPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                  {product.discount ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs md:text-sm text-gray-500">
                        You save:
                      </span>
                      <span className="text-xs md:text-sm font-medium text-green-600">
                        $
                        {((product.price - discountedPrice) * quantity).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full text-xs md:text-sm h-9 md:h-10"
                  disabled={product.stockQuantity === 0}
                >
                  <IoBagCheckOutline className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
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
