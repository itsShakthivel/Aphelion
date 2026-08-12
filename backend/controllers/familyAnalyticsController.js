import {
    getFamilyAnalyticsOverviewService,
    getContributionTrendService,
    getFamilyExpenseBreakdownService,
    getTreasuryGrowthService,
    getFamilyGoalProgressService,
    getFamilyInvestmentAllocationService,
    getFamilyDebtAnalysisService,
} from "../services/family/familyAnalytics.service.js";

// ============================================
// Overview
// ============================================

export const getFamilyAnalyticsOverview =
async (
    req,
    res
) => {

    try {

        const data =
            await getFamilyAnalyticsOverviewService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Contribution Trend
// ============================================

export const getContributionTrend =
async (
    req,
    res
) => {

    try {

        const data =
            await getContributionTrendService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Expense Breakdown
// ============================================

export const getFamilyExpenseBreakdown =
async (
    req,
    res
) => {

    try {

        const data =
            await getFamilyExpenseBreakdownService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Treasury Growth
// ============================================

export const getTreasuryGrowth =
async (
    req,
    res
) => {

    try {

        const data =
            await getTreasuryGrowthService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Goal Progress
// ============================================

export const getFamilyGoalProgress =
async (
    req,
    res
) => {

    try {

        const data =
            await getFamilyGoalProgressService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Investment Allocation
// ============================================

export const getFamilyInvestmentAllocation =
async (
    req,
    res
) => {

    try {

        const data =
            await getFamilyInvestmentAllocationService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Debt Analysis
// ============================================

export const getFamilyDebtAnalysis =
async (
    req,
    res
) => {

    try {

        const data =
            await getFamilyDebtAnalysisService(

                req.params.familyId,

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};