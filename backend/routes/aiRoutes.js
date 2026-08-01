import express from "express";

import {
    getFinancialProfile,
    getFinancialBehavior,
    getSpendingPattern,
    getIncomePattern,
    getInvestmentPattern,
    getDebtPattern,
    getSavingsPattern,
    getFinancialTwin,
    getRecommendations,
    getForecast,
} from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getFinancialProfile);

router.get("/behavior", getFinancialBehavior);

router.get("/spending", getSpendingPattern);

router.get("/income", getIncomePattern);

router.get("/investments", getInvestmentPattern);

router.get("/debt", getDebtPattern);

router.get("/savings", getSavingsPattern);

router.get("/twin", getFinancialTwin);

router.get("/recommendations", getRecommendations);

router.get("/forecast", getForecast);

export default router;