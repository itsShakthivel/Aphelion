import Transaction from "../../models/Transaction.js";
import Investment from "../../models/Investment.js";
import Loan from "../../models/Loan.js";
import Goal from "../../models/Goal.js";
import Insurance from "../../models/Insurance.js";

export const generateFinancialProfile = async (userId) => {
    const [
        transactions,
        investments,
        loans,
        goals,
        insurance,
    ] = await Promise.all([
        Transaction.find({ user: userId }),
        Investment.find({ user: userId }),
        Loan.find({ user: userId }),
        Goal.find({ user: userId }),
        Insurance.find({ user: userId }),
    ]);

    const income = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expenses;

    const investmentValue = investments.reduce(
        (sum, inv) => sum + (inv.currentValue || inv.amount || 0),
        0
    );

    const loanBalance = loans.reduce(
        (sum, loan) => sum + (loan.remainingAmount || loan.amount || 0),
        0
    );

    const insuranceCoverage = insurance.reduce(
        (sum, item) => sum + (item.coverageAmount || item.coverage || 0),
        0
    );

    const goalCompletion =
        goals.length === 0
            ? 0
            : (
                  goals.reduce(
                      (sum, goal) =>
                          sum +
                          ((goal.currentAmount || 0) /
                              (goal.targetAmount || 1)) *
                              100,
                      0
                  ) / goals.length
              ).toFixed(1);

    return {
        income,
        expenses,
        savings,
        investmentValue,
        loanBalance,
        insuranceCoverage,
        goals: goals.length,
        goalCompletion,
        netWorth:
            savings + investmentValue + insuranceCoverage - loanBalance,
    };
};