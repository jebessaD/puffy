"use client";

import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";
import OrderCard from "./orderCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Page() {
  const {
    data: orders,
    error,
    isLoading,
    mutate
  } = useSWR("/api/orders", fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const [allOrder, setAllOrder] = useState(false);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-gray-600">Loading orders...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-red-500">Failed to load orders</div>
      </div>
    );

  const handleToggle = (checked: boolean) => {
    mutate();
    setAllOrder(checked);
  };

  return (
    <div className="p-3 md:p-8 min-h-screen bg-gray-50">
      <div className="flex items-baseline justify-between">
        <h1 className="text-lg md:text-3xl font-bold mb-6 text-gray-800">
          📦 Admin Orders Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={allOrder}
            onCheckedChange={handleToggle}
          />
          <Label className="text-nowrap" htmlFor="airplane-mode">All Orders</Label>
        </div>
      </div>

      {orders.length === 0 && !allOrder ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {(allOrder
            ? orders
            : orders.filter((order: any) => order.orderStatus !== "DELIVERED")
          ).map((order: any) => (
            <OrderCard key={order.id} order={order} mutate={mutate} />
          ))}
        </div>
      )}
    </div>
  );
}
