import { createRecommendation } from "./recommendationHelper.js";

export const expensesRule = (twin) => {

    const recommendations = [];

    if (
        twin.behavior.spending.personality ===
        "Impulse Spender"
    ) {

        recommendations.push(

            createRecommendation({

                category: "Expenses",

                priority: "High",

                title: "Control Discretionary Spending",

                description:
                    "Your discretionary spending is higher than recommended.",

                impact: "High",

                action:
                    "Reduce dining, shopping and entertainment expenses.",

            })

        );

    }

    return recommendations;

};