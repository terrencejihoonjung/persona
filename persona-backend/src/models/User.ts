import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
    },
    googleId: { type: String, unique: true, sparse: true }, // sparse index allows for nulls
    isEmailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);

export default User;
