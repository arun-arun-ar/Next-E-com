import { connectDatabase } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/features/auth/services/authService";

export async function POST(req: NextRequest) {
  try {
    await connectDatabase();
    const { email, password } = await req.json();
    const result = await loginUser({ email, password });
    const response = NextResponse.json({
      message: result.message,
      user: result.user
    });
    response.cookies.set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return response;
  } catch (err: any) {
    // Log error for observability
    console.error("Login error:", err);
    // Hide sensitive error details in production
    const errorMessage = process.env.NODE_ENV === "production"
      ? "Invalid credentials."
      : err.message || "Login failed.";
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
