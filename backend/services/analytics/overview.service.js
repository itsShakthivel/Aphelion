import Transaction from "../../models/Transaction.js";
import Investment from "../../models/Investment.js";
import Loan from "../../models/Loan.js";
import Insurance from "../../models/Insurance.js";
import Goal from "../../models/Goal.js";

import { getDateRange } from "../../utils/analyticsUtils.js";

import {
    getTransactionSummary,
    getInvestmentSummary,
    getLoanSummary,
    getInsuranceSummary,
    getGoalSummary,
    getNetWorthSummary,
} from "../../utils/financialCalculations/index.js";

export const getOverview = async (userId, query) => {

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

    const insuranceSummary =
        getInsuranceSummary(insurances);

    const goalSummary =
        getGoalSummary(goals);

    const netWorthSummary =
        getNetWorthSummary({

            savings:
                transactionSummary.savings,

            investmentValue:
                investmentSummary.currentValue,

            liabilities:
                loanSummary.outstanding,

        });

    return {

        ...transactionSummary,

        assets:
            netWorthSummary.assets,

        liabilities:
            netWorthSummary.liabilities,

        netWorth:
            netWorthSummary.netWorth,

        investments: {

            totalInvested:
                investmentSummary.totalInvested,

            currentValue:
                investmentSummary.currentValue,

            gainLoss:
                investmentSummary.gainLoss,

            totalMonthlyContribution:
                investmentSummary.totalMonthlyContribution,

        },

        loans:
            loanSummary,

        insurance:
            insuranceSummary,

        goals:
            goalSummary,

    };

};