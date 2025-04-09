import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      totalProducts,
      totalOrders,
      deliveredOrders,
      processingOrders,
      shippedOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.product.count({
        where: { isDeleted: false },
      }),
      prisma.order.count(),
      prisma.order.count({
        where: { orderStatus: "DELIVERED" },
      }),
      prisma.order.count({
        where: { orderStatus: "PROCESSING" },
      }),
      prisma.order.count({
        where: { orderStatus: "SHIPPED" },
      }),
      prisma.order.count({
        where: { orderStatus: "CANCELLED" },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: "PAID" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        deliveredOrders,
        processingOrders,
        shippedOrders,
        cancelledOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}