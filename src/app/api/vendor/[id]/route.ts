import { connectDatabase } from "@/lib/database";
import { deleteVenodr } from "@/features/auth/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, context: {params: Promise<{id:string}>}){
    try {
        await connectDatabase();
        const {id} = await context.params;
        const result = await deleteVenodr(id);
        return result;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}
