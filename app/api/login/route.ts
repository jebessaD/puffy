import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if email matches the admin email from .env
  if (email !== process.env.EMAIL_USERNAME) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const hash = process.env.ADMIN_PASSWORD_HASH!;

  // Compare the entered password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, hash);

  if (isPasswordCorrect) {
    // Optionally, set a cookie or a JWT token for session
    const response = NextResponse.json({ success: true });
    response.cookies.set("userEmail", email);
    return response;
  } else {
    return NextResponse.json(
      { success: false, message: "Incorrect password" },
      { status: 401 }
    );
  }
}
