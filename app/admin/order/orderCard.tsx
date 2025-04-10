"use client";

import {
  Package,
  CreditCard,
  Truck,
  User,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calendar,
  Hash,
  Send,
} from "lucide-react";
import DeliveryStatus from "./deliveryStatus";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSendEmail } from "@/app/hooks/useOrder";
import { useState } from "react";
import { trackingNumberUpdateHandler } from "@/app/hooks/useOrder";
import { MutatorCallback } from "swr";

interface OrderCardProps {
  order: any;
  mutate: MutatorCallback;
}

export default function OrderCard({ order, mutate }: OrderCardProps) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const { sendEmail } = useSendEmail();

  const handleSendEmail = async () => {

    if (!trackingNumber) {
      alert("Please enter a tracking number.");
      return;
    }

    const emailHTML = generateEmailHTML(order);
    const emailDetails = {
      email: order.shippingAddress.email,
      subject: "Shipping Tracking Number - Puffy Roll",
      html: emailHTML,
    };

    await trackingNumberUpdateHandler(trackingNumber, order.id);

    await sendEmail(emailDetails);

    mutate();

    setTrackingNumber("");
  };

  const generateEmailHTML = ({order}: OrderCardProps): string => {
    const lineItemsHTML = order?.orderItems
      ?.map(
        (item: any) => `
        <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
          <h4 style="margin: 0; color: #333;">${item.name}</h4>
          <p style="margin: 5px 0; color: #555;">Quantity: ${item.quantity}</p>
          <div style="text-align: center; margin: 10px 0;">
            <img src="${item.image}" alt="${item.name}" style="max-width: 100%; height: auto; border-radius: 8px;" />
          </div>
        </div>
      `
      )
      .join("");

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
      <h2 style="color: #2196F3; text-align: center;">Hey ${order.shippingAddress.fullName || "Customer"}, your order is on the way! 🚚</h2>
      
      <p style="font-size: 16px; color: #333;">We're excited to let you know that your order from <strong>Puffy Roll</strong> has been shipped. Here are the details:</p>
      
      <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #333;">📦 Items in Shipment</h3>
        ${lineItemsHTML}
        <p><strong>Shipping Date:</strong> ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
        <p><strong>Shipping Ticket Number:</strong> <span style="color: #4CAF50;">#${trackingNumber || "N/A"}</span></p>
      </div>

      <p style="font-size: 16px; text-align: center; color: #555; margin-top: 20px;">
        Thank you for choosing Puffy Roll! If you have any questions or need help tracking your order, feel free to reach out.
      </p>

      <p style="font-size: 14px; text-align: center; color: #999; margin-top: 20px;">© 2025 Puffy Roll. All rights reserved.</p>
    </div>
  `;
  };

  console.log(order);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center  text-gray-500 mb-1">
            <span className="text-xs mr-1 font-medium">ORDER</span>{" "}
            <Hash className="h-4 w-4" />{" "}
            <p className="text-xl font-bold text-gray-900 truncate max-w-[200px]">
              {order.id}
            </p>
          </div>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Order Items Section - Prioritized at the top */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs font-medium">ITEMS</span>
        </div>
        <div className="space-y-3">
          {order.orderItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.product?.mainImage && (
                  <Image
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    width={48}
                    height={48}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {item.product?.name || "Unnamed Product"}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg flex justify-center flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium">TOTAL</span>
          </div>
          <p className="text-lg font-bold text-gray-900">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Package className="h-4 w-4" />
            <span className="text-xs font-medium">STATUS</span>
          </div>
          <DeliveryStatus status={order.orderStatus} id={order.id} />
        </div>

        {/* <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs font-medium">PAYMENT</span>
          </div>
          <div
            className={`text-sm font-medium ${
              order.paymentStatus === "PAID"
                ? "text-green-600"
                : "text-amber-600"
            }`}
          >
            {order.paymentStatus}
          </div>
        </div> */}
      </div>

      <div>
        {order.trackingNumber ? (
          <div className="flex items-center gap-1">
            Tracking Number:{" "}
            {<div className="text-gray-500">{order.trackingNumber}</div>}
          </div>
        ) : null}
      </div>

      <div className="flex gap-1">
        <Input
          placeholder="Tracking Number"
          value={trackingNumber.toUpperCase()}
          onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
        />
        <Button onClick={handleSendEmail}>
          <Send />
        </Button>
      </div>

      {/* Shipping Address */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-xs font-medium">SHIPPING ADDRESS</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-gray-600">{order.shippingAddress.email}</p>
              <p className="text-gray-600">{order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Truck className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-900">{order.shippingAddress.address}</p>
              {order.shippingAddress.address2 && (
                <p className="text-gray-900">
                  {order.shippingAddress.address2}
                </p>
              )}
              <p className="text-gray-600">
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state || "N/A"}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
