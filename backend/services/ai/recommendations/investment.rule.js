import { createRecommendation } from "./recommendationHelper.js";

export const investmentRule = (twin) => {

    const recommendations = [];

    if (
        twin.behavior.investment.profile ===
        "Conservative"
    ) {

        recommendations.push(

            createRecommendation({

                category: "Investment",

                priority: "Medium",

                title: "Increase Monthly SIP",

                description:
                    "Increasing SIP by ₹2,000/month could accelerate long-term wealth creation.",

                impact: "Medium",

                action:
                    "Increase your monthly SIP investment.",

                estimatedSavings: 24000,

            })

        );

    }

    return recommendations;

};