// API route to fetch order history for a user.
// It should handle GET requests to retrieve past orders.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: "PAID",
      },
      include: {
        shippingAddress: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// status update endpoint
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { orderStatus: status },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
