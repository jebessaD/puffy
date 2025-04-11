import { NextResponse } from "next/server";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { checkoutProducts, shippingAddress } = await req.json();

    
    if (!checkoutProducts?.length || !shippingAddress?.email) {
      return NextResponse.json(
        { error: "Products and email are required" },
        { status: 400 }
      );
    }

    // Calculate total amount (price * quantity after discount)
    const totalAmount = checkoutProducts.reduce(
      (sum: number, item: any) =>
        sum + (item.price * (100 - item.discount || 0) / 100) * item.quantity,
      0
    );

    // Create shipping address first
    const shippingAddressRecord = await prisma.shippingAddress.create({
      data: {
        fullName: shippingAddress.fullName,
        email: shippingAddress.email,
        phone: shippingAddress.phone || null,
        address: shippingAddress.address,
        address2: shippingAddress.address2 || null,
        city: shippingAddress.city,
        state: shippingAddress.state || null,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode,
      },
    });

    const order = await prisma.order.create({
      data: {
        shippingAddressId: shippingAddressRecord.id,
        totalAmount,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
        orderItems: {
          create: checkoutProducts.map((product: any) => ({
            product: { connect: { id: product.id } },
            color: product?.selectedColor,
            size: product?.selectedSize,
            quantity: product.quantity,
            price: product.price * (100 - product.discount || 0) / 100, // Store discounted price
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Create Stripe checkout session
    const session = await createStripeCheckoutSession({
      line_items: checkoutProducts.map((product: any) => {
        const unitAmount = Math.round(
          product.price * (100 - product.discount || 0) / 100 * 100
        ); // Convert discounted price to cents
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: product.mainImage ? [product.mainImage] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: product.quantity,
        };
      }),
      customer_email: shippingAddress.email,
      metadata: {
        orderId: order.id.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Checkout processing failed" },
      { status: 500 }
    );
  }
}
