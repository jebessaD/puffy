import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  let fromCart = false

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      fromCart = session.metadata?.fromCart === "true" || false
      
      // 1. Validate metadata (orderId is the ONLY required field)
      if (!session.metadata?.orderId) {
        throw new Error("Missing orderId in metadata");
      }

      // 2. Update the existing order (no transactionId stored)
      await prisma.order.update({
        where: { id: parseInt(session.metadata.orderId) },
        data: {
          paymentStatus: "PAID",
          orderStatus: "PROCESSING",
          updatedAt: new Date(),
          // Payment record is automatically created via your schema's optional 1:1 relation
          payment: {
            create: {
              status: "PAID",
              amount: session.amount_total ? session.amount_total / 100 : 0,
              // No transactionId stored (per your model)
            },
          },
        },
      });


      console.log(`✅ Order ${session.metadata.orderId} marked as PAID`);
     
    }

    return NextResponse.json(
      {
        received: true,
        fromcart: fromCart,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Payment processing failed" },
      { status: 400 }
    );
  }
}