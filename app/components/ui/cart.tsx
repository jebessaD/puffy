"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { emptyImage, productNotAvailable } from "@/app/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LiaShoppingBagSolid } from "react-icons/lia";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/app/store/useCartStore";
import { Product } from "@/app/lib/types";
import useProducts from "@/app/hooks/useProducts";

interface CheckoutProduct extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    setCheckoutProducts,
    totalPrice,
  } = useCartStore();

  const { products } = useProducts();

  const router = useRouter();

  useEffect(() => {
    if (products.length > 0) {
      items.forEach((item) => {
        const exists = products.some(
          (product: Product) => product.id === item.product.id
        );

        if (!exists) {
          removeItem(item.product.id, item.size, item.color);
        }
      });
    }
  }, [products, items, removeItem]);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;

    const checkoutData: CheckoutProduct[] = items.map((item) => ({
      ...item.product,
      quantity: item.quantity,
      selectedColor: "not selected",
      selectedSize: "not selected",
    }));

    setCheckoutProducts(checkoutData);
    router.push("/order/shipping-address");
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <LiaShoppingBagSolid className="hover:scale-125 transition duration-500 text-3xl " />
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="max-sm:px-3 text-gray-800 max-sm:w-4/5 flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-center">Shopping Cart</SheetTitle>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={emptyImage}
                className="overlay"
                alt="No products found"
                width={200}
                height={200}
              />
              <SheetDescription className="text-center">
                Your cart is empty
              </SheetDescription>
            </div>
          ) : (
            <SheetDescription className="text-center">
              {`${totalItems()} items in your cart`}
            </SheetDescription>
          )}
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.map((item) => {
            const originalPrice = item.product.price;
            const discount = item.product.discount || 0; // Assuming discount is in percentage
            const discountedPrice =
              originalPrice - (originalPrice * discount) / 100;

            return (
              <div
                key={item.product.id}
                className="flex items-center gap-4 py-4 border-b"
              >
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src={
                      item.product.mainImage.startsWith("http")
                        ? item.product.mainImage
                        : productNotAvailable
                    }
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <div className="text-sm text-gray-500">
                    <span className="line-through text-xs">
                      ${originalPrice.toFixed(2)}
                    </span>{" "}
                    <span className="text-green-500">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto p-1 hover:bg-gray-100 rounded text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Footer */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-medium">${totalPrice().toFixed(2)}</span>
          </div>
          <SheetClose asChild>
            <Button
              onClick={handleProceedToCheckout}
              type="submit"
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
