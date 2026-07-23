import createInsight from "./createInsight.js";


export const generateFinancialInsights = ({

    totalSavings,

    totalInvestments,

    netWorth,

    savingsRate,

    debtRatio,

    emergencyFund,

    completedGoals,

    fireProgress,

}) => {

    const insights = [];

    /*
    ============================
    Savings
    ============================
    */

    if (savingsRate >= 30) {

        insights.push(

            createInsight({

                priority: "low",

                category: "savings",

                title: "Excellent Savings Rate",

                description:
                    `You're saving ${savingsRate}% of your income.`,

                recommendation:
                    "Maintain this habit and gradually increase investments.",

                impact: "positive",

                score: 95,

            })

        );

    }

    else if (savingsRate < 15) {

        insights.push(

            createInsight({

                priority: "high",

                category: "savings",

                title: "Low Savings Rate",

                description:
                    `Only ${savingsRate}% of income is being saved.`,

                recommendation:
                    "Reduce discretionary expenses and target at least 20%.",

                impact: "negative",

                score: 25,

            })

        );

    }

    /*
    ============================
    Debt
    ============================
    */

    if (debtRatio > 40) {

        insights.push(

            createInsight({

                priority: "critical",

                category: "debt",

                title: "Debt Level is High",

                description:
                    `Debt consumes ${debtRatio}% of your income.`,

                recommendation:
                    "Prioritize high-interest debt repayment.",

                impact: "negative",

                score: 10,

            })

        );

    }

    /*
    ============================
    Investments
    ============================
    */

    if (totalInvestments > totalSavings) {

        insights.push(

            createInsight({

                priority: "info",

                category: "investment",

                title: "Healthy Investment Allocation",

                description:
                    "Investments exceed idle savings.",

                recommendation:
                    "Continue consistent SIP contributions.",

                impact: "positive",

                score: 90,

            })

        );

    }

    /*
    ============================
    Emergency Fund
    ============================
    */

    if (emergencyFund < 6) {

        insights.push(

            createInsight({

                priority: "medium",

                category: "cashflow",

                title: "Emergency Fund Needs Improvement",

                description:
                    `Current reserve covers ${emergencyFund} months.`,

                recommendation:
                    "Build a 6-month emergency fund before increasing risk.",

                impact: "negative",

                score: 40,

            })

        );

    }

    /*
    ============================
    Goals
    ============================
    */

    if (completedGoals >= 3) {

        insights.push(

            createInsight({

                priority: "low",

                category: "goals",

                title: "Goals Progress",

                description:
                    `${completedGoals} financial goals completed.`,

                recommendation:
                    "Create a new long-term investment goal.",

                impact: "positive",

                score: 85,

            })

        );

    }

    /*
    ============================
    FIRE
    ============================
    */

    if (fireProgress >= 50) {

        insights.push(

            createInsight({

                priority: "info",

                category: "fire",

                title: "Strong FIRE Progress",

                description:
                    `You have reached ${fireProgress}% of your FIRE target.`,

                recommendation:
                    "Stay consistent and increase income where possible.",

                impact: "positive",

                score: 92,

            })

        );

    }

    /*
    ============================
    Net Worth
    ============================
    */

    if (netWorth > 0) {

        insights.push(

            createInsight({

                priority: "info",

                category: "networth",

                title: "Positive Net Worth",

                description:
                    "Assets currently exceed liabilities.",

                recommendation:
                    "Continue growing appreciating assets.",

                impact: "positive",

                score: 80,

            })

        );

    }

    /*
    ============================
    Sort
    ============================
    */

    const order = {

        critical: 1,

        high: 2,

        medium: 3,

        low: 4,

        info: 5,

    };

    insights.sort(

        (a, b) =>

            order[a.priority] -

            order[b.priority]

    );

    return insights;

};