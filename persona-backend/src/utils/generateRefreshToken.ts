import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../env.ts";

export const generateRefreshToken = (userId: string): string => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET not defined in environment");
  }
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "12h" });
};

export default generateRefreshToken;
