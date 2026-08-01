import { generateFinancialProfile } from "./profile.service.js";
import { analyzeFinancialBehavior } from "./behavior.service.js";

import { calculateTwinScore } from "./score.service.js";
import { determineFinancialPersonality } from "./personality.service.js";
import { generateAISummary } from "./summary.service.js";
import { generateInsights } from "./insignts.service.js";

export const generateFinancialTwin = async (userId) => {

    const profile =
        await generateFinancialProfile(userId);

    const behavior =
        await analyzeFinancialBehavior(userId);

    const annualIncome =
        profile.income || 1;

    const savingsRate =
        Number(behavior.savings.savingsRate);

    const investmentRatio =
        profile.investmentValue / annualIncome;

    const debtToIncome =
        profile.loanBalance / annualIncome;

    const insuranceRatio =
        profile.insuranceCoverage / annualIncome;

    const fireProgress =
        Math.min(10, savingsRate / 4);

    const score = calculateTwinScore({

        savingsRate,

        debtToIncome,

        investmentRatio,

        incomeStability:
            behavior.income.stability,

        goalCompletion:
            Number(profile.goalCompletion),

        insuranceRatio,

        fireProgress,

    });

    const {

        strengths,

        weaknesses,

        focusAreas,

    } = generateInsights({

        savingsRate,

        debtToIncome,

        investmentRatio,

        score,

    });

    const personality =
        determineFinancialPersonality({

            savingsRate,

            investmentRatio,

            debtToIncome,

        });

    const summary =
        generateAISummary({

            score,

            savingsRate,

            debtToIncome,

            investmentRatio,

        });

    const monthlyHealth = [
        62,
        65,
        68,
        70,
        74,
        77,
        80,
        83,
        score,
    ];

    const grade =
        score >= 90 ? "A+" :
        score >= 80 ? "A" :
        score >= 70 ? "B" :
        score >= 60 ? "C" :
        "D";

    const risk =
        debtToIncome > 0.70
            ? "High"
            : debtToIncome > 0.40
            ? "Medium"
            : "Low";
    
    const overview = [

        {

            title: "Income",

            value: profile.income,

            status: "Healthy",

        },

        {

            title: "Expenses",

            value: profile.expenses,

            status: "Controlled",

        },

        {

            title: "Savings",

            value: profile.savings,

            status: behavior.savings.status,

        },

        {

            title: "Net Worth",

            value: profile.netWorth,

            status: "Growing",

        },

    ];

    const behaviorCards = [

        {

            title: "Spending",

            value: behavior.spending.personality,

            score: 82,

            description:
                "Healthy discretionary spending.",

        },

        {

            title: "Income",

            value: behavior.income.stability,

            score: 91,

            description:
                "Stable monthly income.",

        },

        {

            title: "Investment",

            value: behavior.investment.profile,

            score: 75,

            description:
                "Portfolio is steadily growing.",

        },

        {

            title: "Savings",

            value: behavior.savings.status,

            score: Number(
                behavior.savings.savingsRate
            ),

            description:
                "Savings discipline is improving.",

        },

        {

            title: "Debt",

            value: behavior.debt.health,

            score:
                behavior.debt.health === "Healthy"
                    ? 90
                    : 55,

            description:
                "Debt remains manageable.",

        },

    ];

    return {

        score,

        grade,

        risk,

        personality,

        summary,

        strength,

        weaknesses,

        focusAreas,

        overview,

        profile,

        behavior,

        behaviourCards,

        monthlyHealth,

    };
};