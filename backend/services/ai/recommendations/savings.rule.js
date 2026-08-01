import { createRecommendation } from "./recommendationHelper.js";

export const savingsRule = (twin) => {

    const recommendations = [];

    const savingsRate = Number(
        twin.behavior.savings.savingsRate
    );

    if (savingsRate < 20) {

        recommendations.push(

            createRecommendation({

                category: "Savings",

                priority: "High",

                title: "Increase Savings Rate",

                description:
                    "Your savings rate is below the recommended 20%.",

                impact: "High",

                action:
                    "Reduce discretionary spending and automate monthly savings.",

            })

        );

    } else {

        recommendations.push(

            createRecommendation({

                category: "Savings",

                priority: "Positive",

                title: "Excellent Savings Habit",

                description:
                    "You are maintaining a healthy savings discipline.",

                impact: "Positive",

                action:
                    "Maintain your current savings strategy.",

            })

        );

    }

    return recommendations;

};