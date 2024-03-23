import { Redis } from "ioredis";
import User from "./models/User.ts";
import { REFRESH_TOKEN_SECRET } from "./env.ts";
import jwt, { JwtPayload } from "jsonwebtoken";

// Connect to Redis server.
export const redisClient = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
});

export const storeRefreshToken = async (
  refreshToken: string,
  userId: string,
  ttl: number
) => {
  await redisClient.set(`refreshToken:${refreshToken}`, userId, "EX", ttl);
};

export const verifyRefreshToken = async (refreshToken: string) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET not defined in environment");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("Refresh token is invalid");
  }

  // If the token is valid, check if it exists in Redis
  const userId = await redisClient.get(`refreshToken:${refreshToken}`);
  if (!userId || userId !== decodedToken.id) {
    throw new Error("Refresh token is invalid or expired");
  }

  // If the token exists and matches the user, fetch the user from the database
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
