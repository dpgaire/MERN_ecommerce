import express from "express";
import {
  authUser,
  getUserProfile,
  regiserUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.post("/register", regiserUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
