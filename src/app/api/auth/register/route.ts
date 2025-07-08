//imports database, user model and so on
import { connectDatabase } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/features/auth/services/authService";


//function for user registration
export async function POST(req:NextRequest){
    try {
        //databse call 
        await connectDatabase();
        const {name, email, password} = await req.json();
        const result = await registerUser({ name, email, password });
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}