import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma"; // Ensure Prisma client is configured

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;
      const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

      if (!email) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
      }

      // Extract shipping details from metadata
      const metadata = session.metadata;
      const fullName = metadata?.fullName || "Unknown";
      const address = metadata?.address || "Unknown";
      const address2 = metadata?.address2 || "";
      const state = metadata?.state || "";
      const phone = metadata?.phone || "";
      const city = metadata?.city || "Unknown";
      const country = metadata?.country || "Unknown";
      const postalCode = metadata?.postalCode || "000000";

      // Convert orderItems string to array
      const orderItems = JSON.parse(metadata?.orderItems || "[]");

      // 1️⃣ Create shipping address
      const shippingAddress = await prisma.shippingAddress.create({
        data: {
          fullName,
          email,
          phone,
          address: `${address} ${address2}`,
          city,
          state,
          country,
          postalCode,
        },
      });

      // 2️⃣ Create the order
      const order = await prisma.order.create({
        data: {
          shippingAddressId: shippingAddress.id,
          totalAmount,
          paymentStatus: "PAID",
          orderStatus: "PROCESSING",
          orderItems: {
            create: orderItems.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // 3️⃣ Save payment record
      await prisma.payment.create({
        data: {
          orderId: order.id,
          status: "PAID",
          amount: totalAmount,
        },
      });

      console.log(`✅ Order ${order.id} completed for ${email}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
