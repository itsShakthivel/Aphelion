export const generateFIRERecommendations = (planner) => {

    const recommendations = [];

    // ==========================
    // Progress
    // ==========================

    if (planner.progress >= 75) {

        recommendations.push({

            type: "success",

            title: "Excellent Progress",

            description:
                `You have already completed ${planner.progress}% of your FIRE journey.`,

        });

    } else if (planner.progress >= 40) {

        recommendations.push({

            type: "info",

            title: "Great Momentum",

            description:
                `You're ${planner.progress}% toward financial independence. Stay consistent.`,

        });

    } else {

        recommendations.push({

            type: "warning",

            title: "Early Stage",

            description:
                "Your FIRE journey has just begun. Consistency is your biggest advantage.",

        });

    }

    // ==========================
    // Monthly Investment
    // ==========================

    recommendations.push({

        type: "investment",

        title: "Increase Monthly Investment",

        description:
            "Increasing your monthly investment by ₹5,000 can significantly reduce your FIRE timeline.",

    });

    // ==========================
    // Expense Optimization
    // ==========================

    if (planner.monthlyExpense > 50000) {

        recommendations.push({

            type: "expense",

            title: "Reduce Monthly Expenses",

            description:
                "Reducing your monthly expenses by 10% lowers your required FIRE corpus considerably.",

        });

    }

    // ==========================
    // Retirement Goal
    // ==========================

    recommendations.push({

        type: "goal",

        title: "Retirement Outlook",

        description:
            `At your current pace you're projected to reach FIRE around age ${planner.estimatedFireAge}.`,

    });

    return recommendations;

};