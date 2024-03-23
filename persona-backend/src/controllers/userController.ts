import { Request, Response } from "express";
import User from "../models/User.ts";
import argon2 from "argon2";
import generateToken from "../utils/generateToken.ts";
import generateRefreshToken from "../utils/generateRefreshToken.ts";
import { redisClient, storeRefreshToken } from "../redisClient.ts";

interface User {
  _id: string;
  username: string;
  email: string;
}

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.user) {
    const { _id, username, email } = req.user as User;
    res.json({
      message: "Access granted",
      user: { id: _id, username, email },
    });
  }
};

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

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    storeRefreshToken(refreshToken, user._id.toString(), 43200); // 12 hours exp

    // Access Token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1800000, // 1800000 milliseconds - 30 minutes, 60000 milliseconds - 1 minute
    });

    // Refresh Token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 43200000, // 12 hours
    });

    // User Data
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

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    storeRefreshToken(refreshToken, user._id.toString(), 43200); // 12 hours exp

    // Access Token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1800000, // 1800000 milliseconds - 30 minutes, 60000 milliseconds - 1 minute
    });

    // Refresh Token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 43200000, // 12 hours
    });

    // User Data
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
    const refreshToken = req.cookies["refreshToken"];
    if (refreshToken) {
      await redisClient.del(`refreshToken:${refreshToken}`);
    }

    res
      .setHeader("Cache-Control", "no-store")
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(refreshToken ? 200 : 401)
      .json({
        message: refreshToken
          ? "Logged out successfully"
          : "Unauthorized User, Refresh Token Not Found",
      });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
