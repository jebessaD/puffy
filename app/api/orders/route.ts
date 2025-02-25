import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @route   POST /api/orders/
 * @desc    Fetch order tracking details by email and order number
 * @access  Public (Anyone with email & order number can track)
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: { email?: string; orderNumber?: string } = await req.json();
    const { email, orderNumber } = body;

    if (!email || !orderNumber) {
      return NextResponse.json(
        { error: "Email and Order Number are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderNumber),
        shippingAddress: {
          email: email,
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
        shippingAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
