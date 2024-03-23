import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../env.ts";

export const generateToken = (userId: string): string => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET not defined in environment");
  }
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

export default generateToken;
