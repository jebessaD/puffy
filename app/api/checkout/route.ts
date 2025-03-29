import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
    try {
        const { checkoutProducts, shippingAddress, totalPrice } = await req.json();

        if (!checkoutProducts || !shippingAddress?.email) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const line_items = checkoutProducts.map((product: any) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
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
                orderItems: JSON.stringify(checkoutProducts) // Store product data
            },
            line_items
        });
        

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
