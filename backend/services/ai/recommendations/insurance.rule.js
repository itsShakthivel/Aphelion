import { createRecommendation } from "./recommendationHelper.js";

export const insuranceRule = (twin) => {

    const recommendations = [];

    if (
        twin.profile.insuranceCoverage <
        twin.profile.loanBalance
    ) {

        recommendations.push(

            createRecommendation({

                category: "Insurance",

                priority: "High",

                title: "Increase Insurance Coverage",

                description:
                    "Insurance coverage is lower than your liabilities.",

                impact: "High",

                action:
                    "Review life and health insurance coverage.",

            })

        );

    }

    return recommendations;

};