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
  XIcon,
  Send,
  Check,
  AlertCircle,
} from "lucide-react";
import DeliveryStatus from "./deliveryStatus";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSendEmail } from "@/app/hooks/useOrder";
import { useState } from "react";
import { trackingNumberUpdateHandler } from "@/app/hooks/useOrder";
import { MutatorCallback } from "swr";
import CopyText from "./copyButton";
import { useToast } from "@/components/ui/use-toast";

interface OrderCardProps {
  order: any;
  mutate: MutatorCallback;
}

export default function OrderCard({ order, mutate }: OrderCardProps) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const { sendEmail, isLoading, errorMessage } = useSendEmail();

  const handleSendEmail = async () => {
    if (!trackingNumber) {
      toast({
        title: "Tracking number required",
        description: "Please enter a tracking number before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const emailHTML = generateEmailHTML(order);
      const emailDetails = {
        email: order.shippingAddress.email,
        subject: "Shipping Tracking Number - Puffy Roll",
        html: emailHTML,
      };

      await Promise.all([
        trackingNumberUpdateHandler(trackingNumber, order.id),
        sendEmail(emailDetails),
      ]);

      toast({
        title: "Email sent successfully!",
        description: `Tracking number ${trackingNumber} has been sent to ${order.shippingAddress.email}`,
        variant: "default",
      });

      mutate();
      setTrackingNumber("");
    } catch (error) {
      toast({
        title: "Failed to send email",
        description:
          errorMessage || "An error occurred while sending the email",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const generateEmailHTML = (order: any): string => {
    const lineItemsHTML = order?.orderItems
      ?.map(
        (item: any) => `
        <div style="
          margin-bottom: 12px; 
          padding: 12px; 
          border: 1px solid #eaeaea; 
          border-radius: 8px; 
          background: #fff;
          display: flex;
          gap: 12px;
          align-items: center;
        ">
          ${
            item.product?.mainImage
              ? `
          <div style="flex-shrink: 0;">
            <img 
              src="${item.product.mainImage}" 
              alt="${item.product.name}" 
              style="
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 4px;
                border: 1px solid #f0f0f0;
              " 
            />
          </div>
          `
              : ""
          }
          <div style="flex-grow: 1;">
            <h4 style="margin: 0 0 4px 0; color: #333; font-size: 15px; font-weight: 600;">
              ${item.product?.name || "Product"}
            </h4>
            <div style="display: flex; gap: 12px; font-size: 13px; color: #666;">
              <span>Qty: ${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    return `
    <div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 0;
      background: #f7f7f7;
    ">
      <div style="padding: 24px; background: #2196F3; text-align: center;">
        <h2 style="margin: 0; color: white; font-size: 20px;">
          Your Puffy Roll Order is On the Way! 🚚
        </h2>
      </div>
      
      <div style="padding: 24px;">
        <p style="font-size: 15px; color: #555; line-height: 1.5; margin-bottom: 20px;">
          Hi ${order.shippingAddress.fullName || "Customer"},<br>
          We're excited to let you know that your order has been shipped!
        </p>
        
        <div style="
          background: white; 
          padding: 16px; 
          border-radius: 8px; 
          border: 1px solid #eaeaea;
          margin-bottom: 20px;
        ">
          <h3 style="margin-top: 0; margin-bottom: 16px; color: #333; font-size: 16px;">
            📦 Order Details
          </h3>
            <p style="margin: 8px 0;">
              <strong style="color: #555;">Tracking Number:</strong> 
              <span style="color: #4CAF50; font-weight: 600;">
                ${trackingNumber}
              </span>
            </p>
          ${lineItemsHTML}
          
          <div style="
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px dashed #eaeaea;
            font-size: 14px;
          ">
            <p style="margin: 8px 0;">
              <strong style="color: #555;">Shipping Date:</strong> 
              <span style="color: #666;">
                ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </p>

          </div>
        </div>
        
        <div style="
          background: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          font-size: 14px;
          color: #666;
          border: 1px solid #eaeaea;
        ">
          <p style="margin: 0;">
            Thank you for shopping with Puffy Roll!
          </p>
        </div>
      </div>
      
      <div style="
        padding: 16px;
        text-align: center;
        font-size: 12px;
        color: #999;
        background: #f0f0f0;
      ">
        © ${new Date().getFullYear()} Puffy Roll. All rights reserved.
      </div>
    </div>
  `;
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <div>
          {order.trackingNumber ? (
            <div className="flex items-center  text-gray-500 mb-1">
              <span className="text-xs mr-1 font-medium">Tracking No.</span>
              <Hash className="h-4 w-4" />
              <p className="text- font-bold text-gray-900 truncate max-w-[200px]">
                {order.trackingNumber}
              </p>
              <CopyText text={order.trackingNumber} />
            </div>
          ) : (
            <div className="flex items-center  text-gray-500 mb-1">
              <span className="text-xs mr-1 font-medium">ORDER</span>
              <Hash className="h-4 w-4" />
              <p className="text-xl font-bold text-gray-900 truncate max-w-[200px]">
                {order.id}
              </p>
            </div>
          )}
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
              className="flex items-center gap-3 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
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

              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-medium text-gray-900 truncate">
                  {item.product?.name || "Unnamed Product"}
                </p>
                <div className="flex items-center space-x-2 ">
                  {item.color && (
                    <div className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full border border-gray-200 mr-1"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-500 capitalize">
                        {item.color}
                      </span>
                    </div>
                  )}
                  {item.size && (
                    <div className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                      {item.size}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </p>

                <p className="text-xs text-gray-500">
                  ${(item.price * item.quantity).toFixed(2)}{" "}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border-l px-2">
                {" "}
                <p className="text-xs text-gray-500">Qty</p>
                <p className="text-sm text-gray-600 ">
                  <span className="font-bold text-lg flex items-center">
                    <XIcon size={14} />
                    {item.quantity}
                  </span>
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
      </div>

      <div className="flex gap-1 mb-6">
        <Input
          placeholder="Tracking Number"
          value={trackingNumber.toUpperCase()}
          onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
        />
        <Button onClick={handleSendEmail} disabled={isSending || isLoading}>
          {isSending || isLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Send
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send
            </div>
          )}
        </Button>
      </div>

      {/* Shipping Address */}
      <div className="">
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
