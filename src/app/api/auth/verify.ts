import { connectDatabase } from "@/lib/database";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

//function to get verification token
export async function GET(req: NextRequest) {
  try {
    //database call
    await connectDatabase();
    const token = req.nextUrl.searchParams.get("token");

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 400 });
    }
    user.isVerified = true;
    user.verificationToken = "";
    await user.save();
    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
