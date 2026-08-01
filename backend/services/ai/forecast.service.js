import { generateFinancialTwin } from "./financialTwin.service.js";
import { forecastConfig } from "./config/forecastConfig.js";

const periodMap = {
    "1m": 1,
    "3m": 3,
    "6m": 6,
    "1y": 12,
    "5y": 60,
};

export const generateForecast = async (
    userId,
    period = "1y"
) => {

    const twin = await generateFinancialTwin(userId);

    const months = periodMap[period] || 12;

    let monthlyIncome = twin.profile.income / 12;

    let monthlyExpense = twin.profile.expenses / 12;

    let investmentValue = twin.profile.investmentValue;

    let netWorth = twin.profile.netWorth;

    const forecast = [];

    for (let month = 1; month <= months; month++) {

        // ==========================================
        // Annual Salary Increment
        // ==========================================

        if (month > 1 && (month - 1) % 12 === 0) {

            monthlyIncome *=
                1 +
                forecastConfig.annualIncomeGrowth;

        }

        // ==========================================
        // Monthly Inflation
        // ==========================================

        monthlyExpense *=
            1 +
            forecastConfig.inflationRate / 12;

        // ==========================================
        // Savings
        // ==========================================

        const monthlySavings =
            monthlyIncome - monthlyExpense;

        // ==========================================
        // Monthly Investment Growth
        // ==========================================

        investmentValue *=
            1 +
            forecastConfig.annualInvestmentGrowth / 12;

        // ==========================================
        // Net Worth
        // ==========================================

        netWorth +=
            monthlySavings +
            investmentValue * (forecastConfig.annualInvestmentGrowth / 12);

        // ==========================================
        // Date
        // ==========================================

        const currentDate = new Date();

        currentDate.setMonth(
            currentDate.getMonth() + (month - 1)
        );

        forecast.push({

            index: month,

            label: currentDate.toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    year: "numeric",
                }
            ),

            income: Math.round(monthlyIncome),

            expenses: Math.round(monthlyExpense),

            savings: Math.round(monthlySavings),

            investments: Math.round(investmentValue),

            netWorth: Math.round(netWorth),

        });

    }

    const first = forecast[0];

    const last = forecast[forecast.length - 1];

    // ==========================================
    // Growth %
    // ==========================================

    const incomeGrowth =
        (
            ((last.income - first.income) /
                first.income) *
            100
        ).toFixed(1);

    const expenseGrowth =
        (
            ((last.expenses - first.expenses) /
                first.expenses) *
            100
        ).toFixed(1);

    const investmentGrowth =
        (
            ((last.investments - first.investments) /
                first.investments) *
            100
        ).toFixed(1);

    const netWorthGrowth =
        (
            ((last.netWorth - first.netWorth) /
                first.netWorth) *
            100
        ).toFixed(1);

    // ==========================================
    // Summary
    // ==========================================

    const summary = {

        expectedIncome: last.income,

        incomeGrowth: Number(incomeGrowth),

        expectedExpenses: last.expenses,

        expenseGrowth: Number(expenseGrowth),

        expectedSavings: last.savings,

        expectedInvestments: last.investments,

        investmentGrowth: Number(investmentGrowth),

        expectedNetWorth: last.netWorth,

        netWorthGrowth: Number(netWorthGrowth),

    };

    // ==========================================
    // Insights
    // ==========================================

    const insights = [];

    // Savings

    if (last.savings > 0) {

        insights.push({

            type: "Positive",

            title: "Healthy Savings",

            description:
                "Savings are projected to remain positive throughout the selected forecast period.",

        });

    } else {

        insights.push({

            type: "Critical",

            title: "Negative Savings",

            description:
                "Projected expenses exceed income. Consider reducing discretionary spending.",

        });

    }

    // Net Worth

    if (Number(netWorthGrowth) >= 10) {

        insights.push({

            type: "Positive",

            title: "Strong Net Worth Growth",

            description:
                "Your net worth is projected to grow significantly over the selected period.",

        });

    }

    // Investments

    if (Number(investmentGrowth) >= 10) {

        insights.push({

            type: "Positive",

            title: "Investment Growth",

            description:
                "Investments continue to compound steadily based on current assumptions.",

        });

    }

    // FIRE

    if (twin.score >= 80) {

        insights.push({

            type: "Positive",

            title: "Healthy FIRE Progress",

            description:
                "Your current financial behaviour supports long-term financial independence.",

        });

    }

    // Low Financial Score

    if (twin.score < 60) {

        insights.push({

            type: "Warning",

            title: "Improve Financial Health",

            description:
                "Improving savings and reducing debt can significantly improve future projections.",

        });

    }

    return {

        period,

        summary,

        forecast,

        insights,

    };

};