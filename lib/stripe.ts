// import Stripe from 'stripe';

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
// const stripe = new Stripe(stripeSecretKey, {
//   apiVersion: '2023-10-16',
// });

// interface CreateCheckoutSessionParams {
//   line_items: {
//     price: string;
//     quantity: number;
//   }[];
//   customer_email?: string;
//   metadata?: Record<string, string>;
// }

// export async function createStripeCheckoutSession({
//   line_items,
//   customer_email,
//   metadata,
// }: CreateCheckoutSessionParams) {
//   return await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items,
//     mode: 'payment',
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/canceled`,
//     customer_email,
//     metadata,
//   });
// }

// export default stripe;