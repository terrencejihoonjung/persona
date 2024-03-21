import express from "express";
import passport from "passport";
import connectDB from "./db.ts";
import configurePassport from "./passport.ts";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

// Connect Mongoose to MongoDB Atlas
connectDB();

// Passport Initialization
configurePassport(passport);
app.use(passport.initialize());

app.use(express.json()); // Body parser

// Routes
app.use("/api/users", userRoutes);

// Server Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
