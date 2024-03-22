import express from "express";
import passport from "passport";
import connectDB from "./db.ts";
import configurePassport from "./passport.ts";
import gracefulShutdown from "./utils/gracefulShutdown.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

// Connect Mongoose to MongoDB Atlas
connectDB();

// Passport Initialization
app.use(passport.initialize());
configurePassport(passport);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json()); // Body parser
app.use(cookieParser()); // Cookie parser
app.use(morgan("dev")); // Logging

// Routes
app.use("/api/users", userRoutes);

// Server Listener
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
