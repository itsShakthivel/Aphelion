import { generateFinancialTwin } from "./financialTwin.service.js";
import { generateRecommendations } from "./recommendation.service.js";
import { generateForecast } from "./forecast.service.js";

export const generateAIReport = async (userId) => {

    const twin =
        await generateFinancialTwin(userId);

    const recommendationData =
        await generateRecommendations(userId);

    const forecast =
        await generateForecast(userId);

    const report = {

        generatedAt: new Date(),

        executiveSummary: {

            score: twin.score,

            grade: twin.grade,

            risk: twin.risk,

            personality: twin.personality,

            summary: twin.summary,

        },

        financialHealth: {

            score: twin.score,

            strengths: twin.strengths,

            weaknesses: twin.weaknesses,

            focusAreas: twin.focusAreas,

        },

        recommendations:
            recommendationData.recommendations,

        forecast: forecast.summary,

        insights: forecast.insights,

        actionPlan: [],

    };

    // ===============================
    // Action Plan
    // ===============================

    if (twin.score < 60) {

        report.actionPlan.push(

            "Increase monthly savings."

        );

    }

    if (
        recommendationData.summary.high > 0
    ) {

        report.actionPlan.push(

            "Resolve all High Priority recommendations."

        );

    }

    if (
        recommendationData.summary.critical > 0
    ) {

        report.actionPlan.push(

            "Address Critical financial risks immediately."

        );

    }

    if (
        forecast.summary.netWorthGrowth > 10
    ) {

        report.actionPlan.push(

            "Maintain your current investment strategy."

        );

    }

    return report;

};