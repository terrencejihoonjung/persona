import express from "express";
import verifyUserAndToken from "../middleware/verifyUserAndToken.ts";
import {
  verifyUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.ts";

const router = express.Router();

router.get("/verify", verifyUserAndToken, verifyUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
