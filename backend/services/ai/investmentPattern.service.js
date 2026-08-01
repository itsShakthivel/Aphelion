import Investment from "../../models/Investment.js";

export const analyzeInvestmentPattern = async (userId) => {
    const investments = await Investment.find({
        user: userId,
    });

    const total = investments.reduce(
        (sum, item) => sum + (item.currentValue || item.amount || 0),
        0
    );

    let profile = "Balanced";

    if (total < 50000)
        profile = "Conservative";
    else if (total < 200000)
        profile = "Balanced";
    else if (total < 1000000)
        profile = "Growth";
    else profile = "Aggressive";

    return {
        totalInvestment: total,
        profile,
    };
};