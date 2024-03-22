import express from "express";
import passport from "passport";
import connectDB from "./db.ts";
import configurePassport from "./passport.ts";
import gracefulShutdown from "./utils/gracefulShutdown.ts";
import https from "https";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.ts";

const app = express();
const serverOptions = {
  key: fs.readFileSync("../localhost+2-key.pem"), // Your generated key
  cert: fs.readFileSync("../localhost+2.pem"), // Your generated certificate
};

// Connect Mongoose to MongoDB Atlas
connectDB();

// Passport Initialization
app.use(passport.initialize());
configurePassport(passport);

app.use(
  cors({
    origin: "https://localhost:5173",
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
https.createServer(serverOptions, app).listen(port, () => {
  console.log(`HTTPS server running on https://localhost:${port}`);
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
