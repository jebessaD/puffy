import { NextResponse } from "next/server";
import stripe from "@/lib/stripe"; // Ensure stripe is correctly initialized in `lib/stripe.ts`

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(session);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 500 });
  }
}
