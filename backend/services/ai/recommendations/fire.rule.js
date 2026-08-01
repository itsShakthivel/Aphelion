import { createRecommendation } from "./recommendationHelper.js";

export const fireRule = (twin) => {

    const recommendations = [];

    if (twin.score >= 80) {

        recommendations.push(

            createRecommendation({

                category: "FIRE",

                priority: "Positive",

                title: "Excellent FIRE Progress",

                description:
                    "You are progressing well toward financial independence.",

                impact: "Positive",

                action:
                    "Continue your current investment strategy.",

            })

        );

    }

    return recommendations;

};