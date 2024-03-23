import { Request, Response, NextFunction } from "express";
import { User } from "../interfaces/User.ts";
import passport from "passport";
import generateToken from "../utils/generateToken.ts";
import { verifyRefreshToken } from "../redisClient.ts";

interface PassportInfo {
  message?: string;
}

const verifyUserAndToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error | null, user: User | false, info: PassportInfo | undefined) => {
      if (err) {
        return next(err); // Handle authentication error
      }

      if (!user && req.cookies["refreshToken"]) {
        // Access token might be expired, and refresh token is present
        return handleRefreshToken(req, res, next);
      } else if (!user) {
        // No user and no valid refresh token
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["refreshToken"];

  try {
    const userData = await verifyRefreshToken(refreshToken);
    if (!userData) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    req.user = userData;

    const newToken = generateToken(userData._id.toString());
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60000, // 1800000 - 30 minutes, 60000 - 1 minute
    });

    next();
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export default verifyUserAndToken;
