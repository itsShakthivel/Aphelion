import { createRecommendation } from "./recommendationHelper.js";

export const goalsRule = (twin) => {

    const recommendations = [];

    if (
        Number(twin.profile.goalCompletion) < 50
    ) {

        recommendations.push(

            createRecommendation({

                category: "Goals",

                priority: "Medium",

                title: "Improve Goal Progress",

                description:
                    "Your financial goals are progressing slower than expected.",

                impact: "Medium",

                action:
                    "Increase monthly goal contributions.",

            })

        );

    }

    return recommendations;

};