// All authentication-related business logic
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/mailer";
import { generateToken } from "@/utils/generateToken";

export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
  // Basic input validation
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists using this email");
  }

  // Generate verification token and create user
  const token = generateToken();
  const user = new User({ name, email, password, verificationToken: token });
  await user.save();
  await sendVerificationEmail(email, token);
  return { message: "User registered successfully. Check your email to verify." };
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    throw new Error("Invalid credentials or account not verified.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials.");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
  return {
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

export async function logoutUser() {
  // No-op for stateless JWT, but you can implement blacklist if needed
  return { message: "Logged Out Successfully" };
}
