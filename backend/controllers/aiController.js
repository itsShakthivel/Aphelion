import { generateFinancialProfile } from "../services/ai/profile.service.js";
import { analyzeFinancialBehavior } from "../services/ai/behavior.service.js";
import { analyzeSpendingPattern } from "../services/ai/spendingPattern.service.js";
import { analyzeIncomePattern } from "../services/ai/incomePattern.service.js";
import { analyzeInvestmentPattern } from "../services/ai/investmentPattern.service.js";
import { analyzeDebtPattern } from "../services/ai/debtPattern.service.js";
import { analyzeSavingsPattern } from "../services/ai/savingsPattern.service.js";
import { generateFinancialTwin } from "../services/ai/financialTwin.service.js";
import { generateRecommendations } from "../services/ai/recommendation.service.js";
import { generateForecast } from "../services/ai/forecast.service.js";
import { generateAIReport } from "../services/ai/aiReport.service.js";

// ===========================================
// Financial Profile
// ===========================================

export const getFinancialProfile = async (req, res) => {
    try {
        const profile = await generateFinancialProfile(req.user.id);

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate financial profile",
            error: error.message,
        });
    }
};

// ===========================================
// Overall Behaviour
// ===========================================

export const getFinancialBehavior = async (req, res) => {
    try {
        const behavior = await analyzeFinancialBehavior(req.user.id);

        res.status(200).json(behavior);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze financial behavior",
            error: error.message,
        });
    }
};

// ===========================================
// Spending
// ===========================================

export const getSpendingPattern = async (req, res) => {
    try {
        const result = await analyzeSpendingPattern(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze spending",
            error: error.message,
        });
    }
};

// ===========================================
// Income
// ===========================================

export const getIncomePattern = async (req, res) => {
    try {
        const result = await analyzeIncomePattern(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze income",
            error: error.message,
        });
    }
};

// ===========================================
// Investment
// ===========================================

export const getInvestmentPattern = async (req, res) => {
    try {
        const result = await analyzeInvestmentPattern(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze investments",
            error: error.message,
        });
    }
};

// ===========================================
// Debt
// ===========================================

export const getDebtPattern = async (req, res) => {
    try {
        const result = await analyzeDebtPattern(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze debt",
            error: error.message,
        });
    }
};

// ===========================================
// Savings
// ===========================================

export const getSavingsPattern = async (req, res) => {
    try {
        const result = await analyzeSavingsPattern(req.user.id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze savings",
            error: error.message,
        });
    }
};

// ===========================================
// Financial Twin
// ===========================================

export const getFinancialTwin = async (req, res) => {
    try {
        const twin = await generateFinancialTwin(req.user.id);

        res.status(200).json(twin);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate Financial Twin",
            error: error.message,
        });
    }
};

// ===========================================
// AI Recommendations
// ===========================================

export const getRecommendations = async (req, res) => {

    try {

        const recommendations =
            await generateRecommendations(req.user.id);

        res.status(200).json(recommendations);

    } catch (error) {

        res.status(500).json({

            message: "Failed to generate recommendations",

            error: error.message,

        });

    }

};

// ===========================================
// Forecast
// ===========================================

export const getForecast = async (req, res) => {

    try {

        const {

            period = "1y",

        } = req.query;

        const forecast =
            await generateForecast(

                req.user.id,

                period

            );

        res.status(200).json(forecast);

    }

    catch (error) {

        res.status(500).json({

            message:
                "Failed to generate forecast",

            error: error.message,

        });

    }

};

export const getAIReport = async (

    req,

    res

) => {

    try {

        const report =
            await generateAIReport(
                req.user.id
            );

        res.json(report);

    }

    catch (error) {

        res.status(500).json({

            message:
                "Failed to generate AI report",

            error: error.message,

        });

    }

};