import { createRecommendation } from "./recommendationHelper.js";

export const debtRule = (twin) => {

    const recommendations = [];

    if (
        twin.behavior.debt.health ===
        "Risky"
    ) {

        recommendations.push(

            createRecommendation({

                category: "Debt",

                priority: "Critical",

                title: "Reduce Outstanding Debt",

                description:
                    "Your debt burden is significantly impacting financial health.",

                impact: "Critical",

                action:
                    "Prioritize repayment of high-interest loans.",

            })

        );

    }

    return recommendations;

};