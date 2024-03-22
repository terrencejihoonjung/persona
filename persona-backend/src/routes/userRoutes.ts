import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import {
  verifyUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.ts";

const router = express.Router();

router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  verifyUser
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
