import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getFamilyAnalyticsOverview,
    getContributionTrend,
    getFamilyExpenseBreakdown,
    getTreasuryGrowth,
    getFamilyGoalProgress,
    getFamilyInvestmentAllocation,
    getFamilyDebtAnalysis,
} from "../controllers/familyAnalyticsController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Household Analytics
// ============================================

router.get(

    "/:familyId/:treasuryId/overview",

    getFamilyAnalyticsOverview

);

router.get(

    "/:familyId/:treasuryId/contributions",

    getContributionTrend

);

router.get(

    "/:familyId/:treasuryId/expenses",

    getFamilyExpenseBreakdown

);

router.get(

    "/:familyId/:treasuryId/treasury-growth",

    getTreasuryGrowth

);

router.get(

    "/:familyId/:treasuryId/goals",

    getFamilyGoalProgress

);

router.get(

    "/:familyId/:treasuryId/investments",

    getFamilyInvestmentAllocation

);

router.get(

    "/:familyId/:treasuryId/debt",

    getFamilyDebtAnalysis

);

export default router;