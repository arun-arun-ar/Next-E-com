import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
//get single user by id
export async function getUserById(userId: string) {
  const user = await User.findById(userId).select("-password -verificationToken");
  if (!user) throw new Error("User not found");
  return user;
}

//get all user (only admin can view all users)
export async function getAllUser() {
  return await User.find().select("-password -verificationToken");
}

//update user by id
export async function updateUser(
  userId: string,
  update: Partial<{ name: string; email: string; password: string }>
) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if(update.name)user.name = update.name;
  if(update.email)user.email = update.email;
  if(update.password){
    user.password = await bcrypt.hash(update.password, 10)
  }

  await user.save();
  return NextResponse.json({message: "User data updated succesfully"}, {status: 200});
}
