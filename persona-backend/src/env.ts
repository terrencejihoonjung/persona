import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI: string | undefined = process.env.MONGO_URI;

export const ACCESS_TOKEN_SECRET: string | undefined =
  process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET: string | undefined =
  process.env.REFRESH_TOKEN_SECRET;

export const GOOGLE_CLIENT_ID: string | undefined =
  process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET: string | undefined =
  process.env.GOOGLE_CLIENT_SECRET;

export const NODE_ENV: string | undefined = process.env.NODE_ENV;
