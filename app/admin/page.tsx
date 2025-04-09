"use client";

import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";

// Importing individual icons from lucide-react
import {
  Package,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  Cog,
  Truck,
  Ban,
  Loader2,
} from "lucide-react";
import { useStats } from "../hooks/useOrder";
import Loading from "../components/ui/loading";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  deliveredOrders: number;
  processingOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export default function DashboardPage() {

    const {isLoading, errorMessage, stats} = useStats()


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon={<Package className="h-6 w-6" />}
          className="border-l-4 border-gray-600"
        />
        <DashboardCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingCart className="h-6 w-6" />}
          className="border-l-4 border-gray-600"
        />
        {/* <DashboardCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
        /> */}

        <DashboardCard
          title="Delivered Orders"
          value={stats?.deliveredOrders || 0}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          className="border-l-4 border-green-500"
        />
        <DashboardCard
          title="Processing Orders"
          value={stats?.processingOrders || 0}
          icon={<Cog className="h-6 w-6 text-yellow-500" />}
          className="border-l-4 border-yellow-500"
        />
        <DashboardCard
          title="Shipped Orders"
          value={stats?.shippedOrders || 0}
          icon={<Truck className="h-6 w-6 text-blue-500" />}
          className="border-l-4 border-blue-500"
        />
        <DashboardCard
          title="Cancelled Orders"
          value={stats?.cancelledOrders || 0}
          icon={<Ban className="h-6 w-6 text-red-500" />}
          className="border-l-4 border-red-500"
        />
      </div>
    </div>
  );
}
