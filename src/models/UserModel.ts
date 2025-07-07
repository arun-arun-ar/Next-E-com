//imports 
import bcrypt from "bcryptjs";
import { Users } from "lucide-react";
import mongoose, { Document, Schema } from "mongoose";

//defining interface for type checking
//extends Document: Ensures it includes Mongoose document methods like .save(), .toObject(), etc.
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: "user" | "vendor" | "superadmin";
  //verificaiton token may or may not be present
  verificationToken?: string;
}

//create a user schema 
const UserSchema = new Schema<IUser>({
    //defining fields 
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address",
    ],
  },
  password: {type: String, required:true},
  isVerified: {type: Boolean, default: false},
  role: {type: String, enum:['user', 'vendor', 'superadmin'], default: 'user'},
  verificationToken: {type:String}
},{timestamps:true});

// pre-save middleware to hash password
UserSchema.pre<IUser>("save", async function (next){
  if(!this.isModified("password"))
    return next() // only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    
  } catch (err:any) {
    next(err)
  }
})

//method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};



//creating the model with safty check 
const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


//export user model 
export default UserModel;
