//imports database, user model and so on
import { connectDatabase } from "@/lib/database";
import User from "@/models/UserModel";
import { generateToken } from "@/utils/generateToken";
import { sendVerificationEmail } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { send } from "node:process";


//function for user registration
export async function POST(req:NextRequest){
    try {
        //databse call 
        await connectDatabase();
        const {name, email, password} = await req.json();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({error: "User alredy exists using this email"}, {status: 400})
        }

        const token = generateToken();
        const user = new User ({name, email, password, verificationToken: token});
        await user.save();

        await sendVerificationEmail(email, token);
        return NextResponse.json({message: "User register sucessfully. Check your email to verify."});
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500});
    }
}