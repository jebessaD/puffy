import { NextResponse } from "next/server";
import sendMail from "../../lib/sendMail";

export async function POST(req: Request) {
  try {
    const { email, subject, html } = await req.json();

    if (!email || !subject || !html) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendMail({ email, subject, html });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
