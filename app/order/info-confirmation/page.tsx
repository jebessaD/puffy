"use client";
import { useCartStore } from "@/app/store/useCartStore";
import ProgressSteps from "../shipping-address/ProgressSteps";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Home } from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcPaypal,
  FaApple,
  FaGoogle,
} from "react-icons/fa";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  mainImage: string;
  price: number;
  discount?: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

const CheckoutPage = () => {
  const { checkoutProducts, shippingAddress } = useCartStore();
  const steps = ["Shipping Address", "Checkout"];

  const calculateDiscountedPrice = (
    price: number,
    discount?: number
  ): number => {
    return discount ? price - (price * discount) / 100 : price;
  };

  const totalPrice = checkoutProducts.reduce((acc, product) => {
    return (
      acc +
      product.quantity *
        calculateDiscountedPrice(product.price, product.discount)
    );
  }, 0);

  const totalOriginal = checkoutProducts.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);


  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutProducts, shippingAddress, totalPrice }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe
      }
    } catch (error) {
      console.error("Checkout error", error);
    } finally {
      setLoading(false);
    }
  };

  if (!checkoutProducts || checkoutProducts.length === 0) {
    return <p className="text-red-500 font-semibold">No products in cart.</p>;
  }

  return (
    <div className="flex">
      <div className="fixed flex-col sm:flex-row bg-white border-b border-gray-100 left-0 right-0 top-0 flex items-center justify-between sm:p-4 p-2 bg-gray-50 z-20">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <ProgressSteps steps={steps} currentStep={2} />
      </div>

      <div className="flex flex-col sm:flex-row w-full mx-auto">
        <div className="basis-1/2 md:basis-3/4 py-16 px-8 md:px-16">
          {checkoutProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-16 h-16 rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Color: {product.selectedColor || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {product.selectedSize || "N/A"}
                </p>
                <p className="font-semibold text-lg">
                  $
                  {calculateDiscountedPrice(
                    product.price,
                    product.discount
                  ).toFixed(2)}{" "}
                  × {product.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-6 text-lg font-semibold space-y-2">
            <div className="flex justify-between">
              <div className="flex justify-between">
                <span>Total</span>
              </div>

              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="basis-1/2  md:basis-1/4 flex h-[89vh] flex-col justify-between bg-white h-full p-6 rounded-lg">
          <div className="mb-8 mt-4">
            <h2 className="font-semibold text-lg border-b mb-3 border-gray-100 py-2">
              Ship to
            </h2>
            {shippingAddress ? (
              <div className="border-b pb-4 border-gray-100">
                <div className=" space-y-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{shippingAddress.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{shippingAddress.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{shippingAddress.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>{shippingAddress.address}</div>
                  </div>{" "}
                  <div>
                    {shippingAddress.city} - {shippingAddress.country} -{" "}
                    {shippingAddress.postalCode}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">No shipping address available.</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-4">
              Payment
              <span className="text-gray-500 ">
                {" "}
                <span>|</span> Credit Cards
              </span>
            </h2>
            <div className="flex justify-between">
              <FaCcVisa className="text-3xl text-neutral-700" />
              <FaCcMastercard className="text-3xl text-neutral-700" />{" "}
              <FaCcAmex className="text-3xl text-neutral-700" />{" "}
              <FaCcDiscover className="text-3xl text-neutral-700" />{" "}
              <FaCcPaypal className="text-3xl text-neutral-700" />{" "}
            </div>
            {/* <select className="w-full p-2 border rounded-md">
              <option>Credit Card</option>
              <option>PayPal</option>
            </select> */}{" "}
            <Button
              onClick={handleCheckout}
              size={"lg"}
              className="rounded-sm h-10 w-full mt-4"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
