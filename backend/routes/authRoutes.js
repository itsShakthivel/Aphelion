import express from "express";
import protect from "../middleware/authMiddleware.js";
import {register,login, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.get("/profile", protect, getProfile)
router.post("/register", register);
router.post("/login", login);
export default router;