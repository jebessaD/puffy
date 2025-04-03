import { NextResponse } from "next/server";
import stripe from "@/lib/stripe"; // Ensure stripe is correctly initialized in `lib/stripe.ts"
import type { Stripe } from "stripe"; // Import Stripe types

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  try {
    // Retrieve session with expanded line_items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"], // Expands product details
    });

    // Ensure line_items exists and is not null
    const lineItems = session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product | undefined; // Ensure `product` is correctly typed
      
      return {
        name: product?.name || "Unknown Product", // Handle potential null values
        image: product?.images?.[0] || null, // Handle missing images
        quantity: item.quantity || 0, // Default quantity if missing
      };
    }) || [];

    const responseData = {
      id: session.id,
      customer_details: session.customer_details,
      amount_total: session.amount_total,
      line_items: lineItems,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 500 });
  }
}
