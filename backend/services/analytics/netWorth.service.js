import mongoose from "mongoose";

import Transaction from "../../models/Transaction.js";
import Investment from "../../models/Investment.js";
import Loan from "../../models/Loan.js";

import {
    roundAmount,
    MONTH_NAMES,
} from "../../utils/analyticsUtils.js";

import {
    getInvestmentSummary,
    getLoanSummary,
    getNetWorthSummary,
} from "../../utils/financialCalculations/index.js";

export const getNetWorthAnalytics = async (userId) => {

    const [
        investments,
        loans,
        savingsTransactions,
    ] = await Promise.all([

        Investment.find({
            user: userId,
        }),

        Loan.find({
            user: userId,
        }),

        Transaction.find({
            user: userId,
            type: "saving",
        }),

    ]);

    const savings = savingsTransactions.reduce(

        (total, transaction) => total + transaction.amount,

        0

    );

    const investmentSummary =
        getInvestmentSummary(investments);

    const loanSummary =
        getLoanSummary(loans);

    return getNetWorthSummary({

        savings,

        investmentValue:
            investmentSummary.currentValue,

        liabilities:
            loanSummary.outstanding,

    });

};

export const getNetWorthTimeline = async (userId) => {

    const [
        investments,
        loans,
        savings,
    ] = await Promise.all([

        Investment.find({
            user: userId,
        }),

        Loan.find({
            user: userId,
        }),

        Transaction.aggregate([

            {
                $match: {

                    user: new mongoose.Types.ObjectId(userId),

                    type: "saving",

                },

            },

            {
                $group: {

                    _id: {

                        year: {

                            $year: "$date",

                        },

                        month: {

                            $month: "$date",

                        },

                    },

                    savings: {

                        $sum: "$amount",

                    },

                },

            },

            {
                $sort: {

                    "_id.year": 1,

                    "_id.month": 1,

                },

            },

        ]),

    ]);

    const investmentSummary =
        getInvestmentSummary(investments);

    const loanSummary =
        getLoanSummary(loans);

    return savings.map((item) => ({

        month:

            MONTH_NAMES

            [item._id.month] +

            " " +

            item._id.year,

        netWorth: roundAmount(

            item.savings +

            investmentSummary.currentValue -

            loanSummary.outstanding

        ),

    }));

};