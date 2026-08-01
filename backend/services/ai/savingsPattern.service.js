import Transaction from "../../models/Transaction.js";

export const analyzeSavingsPattern = async (userId) => {
    const transactions = await Transaction.find({
        user: userId,
    });

    const income = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expense;

    const rate =
        income === 0 ? 0 : (savings / income) * 100;

    let status = "Needs Improvement";

    if (rate >= 30)
        status = "Excellent";
    else if (rate >= 15)
        status = "Average";

    return {
        savings,
        savingsRate: rate.toFixed(1),
        status,
    };
};