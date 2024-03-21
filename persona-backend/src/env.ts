import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI: string = process.env.MONGO_URI!;
