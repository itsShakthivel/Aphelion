import * as analyticsService from "../services/analyticsService.js";

import {
    getFinancialInsights,
} from "../services/analyticsService.js";

export const getOverview = async (
    req,
    res
) => {

    try {

        const analytics =
            await analyticsService.getOverview(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            message:
                "Analytics overview fetched successfully.",

            data:
                analytics,

        });

    } catch (error) {

        console.error(
            "Analytics Overview Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch analytics overview.",

            error:
                error.message,

        });

    }

};

export const getExpenses = async (
    req,
    res
) => {

    try {

        const analytics =
            await analyticsService.getExpenseAnalytics(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data:
                analytics,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch expense analytics.",

        });

    }

};

export const getMonthlyExpenses = async (
    req,
    res
) => {

    try {

        const data =
            await analyticsService.getMonthlyExpenseTrend(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch monthly expense trend.",

        });

    }

};

export const getIncome = async (
    req,
    res
) => {

    try {

        const data =
            await analyticsService.getIncomeAnalytics(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch income analytics.",

        });

    }

};

export const getCashFlow = async (
    req,
    res
) => {

    try {

        const data =
            await analyticsService.getCashFlowAnalytics(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch cash flow analytics.",

        });

    }

};

export const getInvestments = async (
    req,
    res
) => {

    try {

        const data =
            await analyticsService.getInvestmentAnalytics(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch investment analytics.",

            error:
                error.message,

        });

    }

};

export const getNetWorth = async (
    req,
    res
) => {

    try {

        const data =
            await analyticsService.getNetWorthAnalytics(
                req.user.id
            );

        res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch net worth analytics.",

        });

    }

};

export const getNetWorthTimeline =
    async (
        req,
        res
    ) => {

        try {

            const data =
                await analyticsService.getNetWorthTimeline(
                    req.user.id
                );

            res.status(200).json({

                success: true,

                data,

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch net worth timeline.",

            });

        }

    };

export const getFinancialHealth =
    async (
        req,
        res
    ) => {

        try {

            const data =
                await analyticsService.getFinancialHealth(
                    req.user.id,
                    req.query
                );

            res.status(200).json({

                success: true,

                message:
                    "Financial health fetched successfully.",

                data,

            });

        } catch (error) {

            console.error(
                "Financial Health Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch financial health.",

                error:
                    error.message,

            });

        }

    };

export const getInsights = async (
    req,
    res
) => {

    try {

        const insights =
            await getFinancialInsights(
                req.user.id,
                req.query
            );

        res.status(200).json({

            success: true,

            data:
                insights,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch financial insights.",

        });

    }

};