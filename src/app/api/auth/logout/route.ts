import { NextResponse } from "next/server";

export async function  POST(){
    const response = NextResponse.json({message: "Logged Out Succesfully"});
    response.cookies.set("auth_token", "",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(0)
    });
    return response;

}