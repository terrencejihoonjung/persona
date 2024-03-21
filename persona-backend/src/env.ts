import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI: string | undefined = process.env.MONGO_URI;
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;
