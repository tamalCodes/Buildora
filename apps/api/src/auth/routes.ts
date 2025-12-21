import { Router } from "express";
import {
  authenticateUser,
  forgotPassword,
  getMe,
  identifyUser,
  resetPassword,
} from "@/auth/controllers";

const router = Router();

router.post("/identify", identifyUser);
router.post("/authenticate", authenticateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", getMe);

export default router;
