import { connectDatabase } from "@/lib/database";
import { getUserById, updateUser } from "@/features/auth/services/userService";
import { NextRequest, NextResponse } from "next/server";

//get user by id a
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDatabase();
    const { id } = await context.params;
    const user = await getUserById(id); // Fetch user by ID from the database
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

//get user by id and update user details
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDatabase();
    const data = await req.json();
    const { id } = await context.params;
    const result = await updateUser(id, data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
