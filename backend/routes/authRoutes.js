import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    register,
    login,
    getProfile,
    checkEmail,
    resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

/*
==========================================
Authentication
==========================================
*/

router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, getProfile);

/*
==========================================
Forgot Password
==========================================
*/

router.post("/check-email", checkEmail);

router.post("/reset-password", resetPassword);

export default router;