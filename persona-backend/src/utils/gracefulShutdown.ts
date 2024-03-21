import mongoose from "mongoose";

// Gracefully closing the MongoDB connection
export default function gracefulShutdown(msg: string, callback: () => void) {
  mongoose.disconnect();
  console.log(`Mongoose disconnected through ${msg}`);
  callback();
}
