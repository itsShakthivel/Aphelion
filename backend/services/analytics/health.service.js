import Transaction from "../../models/Transaction.js";
import Investment from "../../models/Investment.js";
import Loan from "../../models/Loan.js";
import Insurance from "../../models/Insurance.js";
import Goal from "../../models/Goal.js";

import { getDateRange } from "../../utils/analyticsUtils.js";

import { calculateFinancialHealth } from "../../utils/financialHealthEngine.js";

import {
    getTransactionSummary,
    getInvestmentSummary,
    getLoanSummary,
    getGoalSummary,
} from "../../utils/financialCalculations/index.js";

export const getFinancialHealth = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const [
        transactions,
        investments,
        loans,
        insurances,
        goals,
    ] = await Promise.all([

        Transaction.find({
            user: userId,
            date: {
                $gte: start,
                $lte: end,
            },
        }),

        Investment.find({
            user: userId,
        }),

        Loan.find({
            user: userId,
        }),

        Insurance.find({
            user: userId,
        }),

        Goal.find({
            user: userId,
        }),

    ]);

    const transactionSummary =
        getTransactionSummary(transactions);

    const investmentSummary =
        getInvestmentSummary(investments);

    const loanSummary =
        getLoanSummary(loans);

    const goalSummary =
        getGoalSummary(goals);

    const debtToIncomeRatio =

        transactionSummary.income > 0

            ? Number(

                (

                    (
                        loanSummary.monthlyEMI /
                        transactionSummary.income
                    ) * 100

                ).toFixed(2)

            )

            : 0;

    return calculateFinancialHealth({

        totalIncome:
            transactionSummary.income,

        totalExpense:
            transactionSummary.expenses,

        totalSavings:
            transactionSummary.savings,

        totalInvestments:
            investmentSummary.currentValue,

        insurances,

        loans,

        monthlyEMI:
            loanSummary.monthlyEMI,

        debtToIncomeRatio,

        completedGoals:
            goalSummary.completed,

        totalGoals:
            goalSummary.total,

        retirement: null,

    });

};