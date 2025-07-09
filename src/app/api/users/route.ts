import { connectDatabase } from "@/lib/database";
import { getAllUser } from "@/features/auth/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest){
    try {
        await connectDatabase();
        const users = await getAllUser();
        return NextResponse.json(users);
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:400 });
    }
}