import express from "express";
import { Request, Response } from "express";
import verifyUser from "../middleware/verifyUser.ts";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.ts";

const router = express.Router();

router.get("/verifyUser", verifyUser, (req: Request, res: Response) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
