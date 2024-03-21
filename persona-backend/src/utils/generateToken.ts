import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env.ts";

export const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment");
  }
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export default generateToken;
