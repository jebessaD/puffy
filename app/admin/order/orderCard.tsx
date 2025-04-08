"use client";

import DeliveryStatus from "./deliveryStatus";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
      <div className="mb-6 text-gray-800">
        <p className="text-sm">Order ID</p>
        <p className="text-2xl font-bold text-gray-900 break-all">{order.id}</p>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <p className="flex items-center space-x-2">
          <span className="font-medium">Amount:</span>
          <span className="text-lg font-semibold">${order.totalAmount.toFixed(2)}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-medium">Status:</span>
          <DeliveryStatus status={order.orderStatus} id={order.id} />
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-medium">Payment:</span>
          <span>{order.paymentStatus}</span>
        </p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
        <p className="font-medium text-gray-800">Shipping Address:</p>
        <div className="space-y-1">
          <p className="text-gray-800">
            <span className="font-medium text-gray-900">Full Name:</span> {order.shippingAddress.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Email:</span> {order.shippingAddress.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Phone:</span> {order.shippingAddress.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Address:</span> {order.shippingAddress.address}
          </p>
          {order.shippingAddress.address2 && (
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Address 2:</span> {order.shippingAddress.address2}
            </p>
          )}
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">City:</span> {order.shippingAddress.city}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">State:</span> {order.shippingAddress.state || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Postal Code:</span> {order.shippingAddress.postalCode}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">Country:</span> {order.shippingAddress.country}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium text-gray-900 mb-2">🛒 Items:</p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          {order.orderItems.map((item: any) => (
            <li key={item.id} className="flex justify-between text-gray-800 hover:bg-gray-100 rounded-lg px-2 py-1 transition-all duration-200 ease-in-out">
              <span>{item.product?.name || "Unnamed Product"} × {item.quantity}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
