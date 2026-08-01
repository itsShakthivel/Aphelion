import Transaction from "../../models/Transaction.js";

export const analyzeIncomePattern = async (userId) => {
    const income = await Transaction.find({
        user: userId,
        type: "Income",
    }).sort({ date: 1 });

    if (income.length === 0) {
        return {
            stability: "Unknown",
            averageIncome: 0,
        };
    }

    const values = income.map((i) => i.amount);

    const average =
        values.reduce((a, b) => a + b, 0) / values.length;

    const variance =
        values.reduce((sum, value) => {
            return sum + Math.pow(value - average, 2);
        }, 0) / values.length;

    const deviation = Math.sqrt(variance);

    let stability = "Stable";

    if (deviation > average * 0.40)
        stability = "Irregular";
    else if (deviation > average * 0.20)
        stability = "Seasonal";

    return {
        averageIncome: average,
        deviation,
        stability,
    };
};