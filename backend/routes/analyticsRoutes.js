import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getExpenses,
    getMonthlyExpenses,
    getOverview,
    getIncome,
} from "../controllers/analyticsController.js";

const router = express.Router();

/*
==========================================
Analytics Routes
==========================================
*/

// Overview Analytics
router.get("/overview", protect, getOverview);
router.get("/expenses", protect, getExpenses);
router.get("/expenses/mpnthly", protect, getMonthlyExpenses);
router.get("/income", protect, getIncome);

export default router;