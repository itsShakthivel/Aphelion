import Loan from "../../models/Loan.js";

export const analyzeDebtPattern = async (userId) => {
    const loans = await Loan.find({
        user: userId,
    });

    const totalDebt = loans.reduce(
        (sum, loan) => sum + (loan.remainingAmount || loan.amount || 0),
        0
    );

    let health = "Healthy";

    if (totalDebt > 100000)
        health = "Moderate";

    if (totalDebt > 500000)
        health = "Risky";

    if (totalDebt > 1000000)
        health = "Critical";

    return {
        totalDebt,
        health,
    };
};