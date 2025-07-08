import { NextResponse } from "next/server";
import { logoutUser } from "@/features/auth/services/authService";

export async function POST() {
  const result = await logoutUser();
  const response = NextResponse.json(result);
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0)
  });
  return response;
}