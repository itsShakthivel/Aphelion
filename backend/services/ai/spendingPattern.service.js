import Transaction from "../../models/Transaction.js";

export const analyzeSpendingPattern = async (userId) => {
    const expenses = await Transaction.find({
        user: userId,
        type: "Expense",
    });

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const dining = expenses
        .filter((t) => t.category === "Dining")
        .reduce((sum, t) => sum + t.amount, 0);

    const entertainment = expenses
        .filter((t) => t.category === "Entertainment")
        .reduce((sum, t) => sum + t.amount, 0);

    const discretionary = dining + entertainment;

    const ratio = total === 0 ? 0 : discretionary / total;

    let personality = "Balanced Spender";

    if (ratio < 0.15) personality = "Conservative Spender";
    else if (ratio < 0.35) personality = "Balanced Spender";
    else if (ratio < 0.55) personality = "Aggressive Spender";
    else personality = "Impulse Spender";

    return {
        totalExpenses: total,
        discretionary,
        ratio,
        personality,
    };
};