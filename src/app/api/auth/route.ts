//imports database, user model and so on
import { connectDatabase } from "@/lib/database";
import User from "@/models/UserModel";
import { generateToken } from "@/utils/generateToken";
import { sendVerificationEmail } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


//function for user registration
export async function POST(req:NextRequest){
    try {
        //databse call 
        await connectDatabase();
        const {name, email, password} = await req.json();

        // Basic input validation
        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error: "User already exists using this email"}, {status: 400});
        }

        // Hash the password
        const token = generateToken();
        try {
          const user = new User({ name, email, password, verificationToken: token });
          await user.save();
        } catch (err) {
          console.error('User save error:', err);
          return NextResponse.json({ error: 'User save error', details: String(err) }, { status: 500 });
        }

        try {
          await sendVerificationEmail(email, token);
        } catch (err) {
          console.error('Verification email error:', err);
          return NextResponse.json({ error: 'User saved, but failed to send verification email', details: String(err) }, { status: 500 });
        }
        return NextResponse.json({message: "User registered successfully. Check your email to verify."});
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status: 500});
    }
}