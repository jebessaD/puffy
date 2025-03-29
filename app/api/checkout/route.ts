import { NextResponse } from "next/server";
import { createStripeCheckoutSession } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { checkoutProducts, shippingAddress } = await req.json();

    if (!checkoutProducts || !shippingAddress?.email) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const session = await createStripeCheckoutSession({
      line_items: checkoutProducts.map((product: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      customer_email: shippingAddress.email,
      metadata: {
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        address2: shippingAddress.address2 || "",
        state: shippingAddress.state || "",
        phone: shippingAddress.phone || "",
        city: shippingAddress.city,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode,
        orderItems: JSON.stringify(checkoutProducts),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
