import mongoose from "mongoose";
import { MONGO_URI } from "./env.ts";

const connectDB = async () => {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not defined in environment");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
