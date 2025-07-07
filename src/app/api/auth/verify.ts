import { connectDatabase } from "@/lib/database";
import User from "@/models/UserModel";
import { Ewert } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDatabase();
    const token = req.nextUrl.searchParams.get("token");

    const user = await User.findOne({ verificationToken: token });

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
