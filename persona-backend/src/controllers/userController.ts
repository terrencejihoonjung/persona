import { Request, Response } from "express";
import { NODE_ENV } from "../env.ts";
import User from "../models/User.ts";
import argon2 from "argon2";
import generateToken from "../utils/generateToken.ts";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    if (await User.findOne({ email })) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true, // The cookie cannot be accessed by client-side JS
      secure: NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Strictly enforce same site policy
      maxAge: 3600000, // Set cookie expiry, e.g., 1 hour
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Verify the password with Argon2
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true, // The cookie cannot be accessed by client-side JS
      secure: NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax", // Strictly enforce same site policy
      maxAge: 3600000, // Set cookie expiry, e.g., 1 hour
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
