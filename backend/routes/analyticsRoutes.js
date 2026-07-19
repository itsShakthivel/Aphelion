import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getExpenses,
    getMonthlyExpenses,
    getOverview,
    getIncome,
    getCashFlow,
    getNetWorth,
    getNetWorthTimeline,
    getFinancialHealth,
    getInsights,
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
router.get("/expenses/monthly", protect, getMonthlyExpenses);
router.get("/income", protect, getIncome);
router.get("/cash-flow", protect, getCashFlow);
router.get("/net-worth", protect, getNetWorth);
router.get("/net-worth/timeline", protect, getNetWorthTimeline);
router.get("/financial-health", protect, getFinancialHealth);
router.get("/insights", protect, getInsights);

export default router;