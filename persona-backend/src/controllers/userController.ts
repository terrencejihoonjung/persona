import { Request, Response } from "express";
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

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
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

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
