import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

interface CreateCheckoutSessionParams {
  line_items: {
    price_data: {
      currency: string;
      product_data: { name: string; images: string[] };
      unit_amount: number;
    };
    quantity: number;
  }[];
  customer_email?: string;
  metadata?: Record<string, string>;
}

export async function createStripeCheckoutSession({
  line_items,
  customer_email,
  metadata,
}: CreateCheckoutSessionParams) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    customer_email,
    metadata,
    line_items,
  });
}

export default stripe;
