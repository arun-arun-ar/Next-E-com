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


//delete user by admin
export async function deleteUser(userId: string){
    //fetch the user
    const user = await User.findById(userId);
    //check if user is availavle or not
    if(!user)
        {
            throw new Error("User not found");
        }
        // delete user by id 
        await User.findByIdAndDelete(userId);
        return NextResponse.json({message: "User deleted successfylly"}, {status: 200})
}

//delete vendor by admin
export async function deleteVenodr(vendorId:string){

    const vendor = await User.findById(vendorId);

    if(!vendor || vendor.role !== 'vendor'){
        throw new Error("Vendor doesn't exists")
    };

    await User.findByIdAndDelete(vendorId);

    return NextResponse.json({message: "Vendor deletes succesfully"}, {status: 200});
}

