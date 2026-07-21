import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Loan from "../models/Loan.js";
import Insurance from "../models/Insurance.js";
import Goal from "../models/Goal.js";

import {
    getDateRange,
    roundAmount,
} from "../utils/analyticsUtils.js";

import { calculateFinancialHealth } from "../utils/financialHealthEngine.js";
import { generateFinancialInsights } from "../utils/financialInsightsEngine.js";

import {
    getTransactionSummary,
    getInvestmentSummary,
    getLoanSummary,
    getInsuranceSummary,
    getGoalSummary,
    getNetWorthSummary,
} from "../utils/financialCalculations/index.js";

export const getOverview = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const transactions = await Transaction.find({
        user: userId,
        date: {
            $gte: start,
            $lte: end,
        },
    });

    const investments = await Investment.find({
        user: userId,
    });

    const loans = await Loan.find({
        user: userId,
    });

    const insurances = await Insurance.find({
        user: userId,
    });

    const goals = await Goal.find({
        user: userId,
    });

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

        loans: loanSummary,

        insurance: insuranceSummary,

        goals: goalSummary,

    };

};

export const getExpenseAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const expenseAnalytics = await Transaction.aggregate([

        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                type: "expense",
                date: {
                    $gte: start,
                    $lte: end,
                },
            },
        },

        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },

        {
            $unwind: "$category",
        },

        {
            $group: {

                _id: "$category.name",

                amount: {

                    $sum: "$amount",

                },

            },

        },

        {
            $project: {

                _id: 0,

                category: "$_id",

                amount: 1,

            },

        },

        {
            $sort: {

                amount: -1,

            },

        },

    ]);

    return expenseAnalytics;

};

export const getMonthlyExpenseTrend = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const monthlyExpenses = await Transaction.aggregate([

        {
            $match: {

                user: new mongoose.Types.ObjectId(userId),

                type: "expense",

                date: {

                    $gte: start,

                    $lte: end,

                },

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

                amount: {

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

        {
            $project: {

                _id: 0,

                month: {

                    $concat: [

                        {

                            $arrayElemAt: [

                                [

                                    "",

                                    "Jan",

                                    "Feb",

                                    "Mar",

                                    "Apr",

                                    "May",

                                    "Jun",

                                    "Jul",

                                    "Aug",

                                    "Sep",

                                    "Oct",

                                    "Nov",

                                    "Dec",

                                ],

                                "$_id.month",

                            ],

                        },

                        " ",

                        {

                            $toString: "$_id.year",

                        },

                    ],

                },

                amount: 1,

            },

        },

    ]);

    return monthlyExpenses;

};

export const getIncomeAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const incomeAnalytics = await Transaction.aggregate([

        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                type: "income",
                date: {
                    $gte: start,
                    $lte: end,
                },
            },
        },

        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
            },
        },

        {
            $unwind: "$category",
        },

        {
            $group: {
                _id: "$category.name",
                amount: {
                    $sum: "$amount",
                },
            },
        },

        {
            $project: {
                _id: 0,
                source: "$_id",
                amount: 1,
            },
        },

        {
            $sort: {
                amount: -1,
            },
        },

    ]);

    return incomeAnalytics;

};

export const getCashFlowAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const cashFlow = await Transaction.aggregate([

        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                date: {
                    $gte: start,
                    $lte: end,
                },
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

                income: {

                    $sum: {

                        $cond: [

                            { $eq: ["$type", "income"] },

                            "$amount",

                            0,

                        ],

                    },

                },

                expense: {

                    $sum: {

                        $cond: [

                            { $eq: ["$type", "expense"] },

                            "$amount",

                            0,

                        ],

                    },

                },

            },

        },

        {
            $project: {

                _id: 0,

                month: {

                    $concat: [

                        {

                            $arrayElemAt: [

                                [

                                    "",

                                    "Jan",

                                    "Feb",

                                    "Mar",

                                    "Apr",

                                    "May",

                                    "Jun",

                                    "Jul",

                                    "Aug",

                                    "Sep",

                                    "Oct",

                                    "Nov",

                                    "Dec",

                                ],

                                "$_id.month",

                            ],

                        },

                        " ",

                        {

                            $toString: "$_id.year",

                        },

                    ],

                },

                income: 1,

                expense: 1,

                cashFlow: {

                    $subtract: [

                        "$income",

                        "$expense",

                    ],

                },

            },

        },

        {
            $sort: {

                "_id.year": 1,

                "_id.month": 1,

            },

        },

    ]);

    return cashFlow;

};

export const getNetWorthAnalytics = async (userId) => {

    const investments = await Investment.find({
        user: userId,
    });

    const loans = await Loan.find({
        user: userId,
    });

    const savingsTransactions = await Transaction.find({
        user: userId,
        type: "saving",
    });

    const savings = savingsTransactions.reduce(

        (sum, transaction) =>

            sum + transaction.amount,

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

    const investments = await Investment.find({
        user: userId,
    });

    const loans = await Loan.find({
        user: userId,
    });

    const savings = await Transaction.aggregate([

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

    ]);

    const investmentSummary =
        getInvestmentSummary(investments);

    const loanSummary =
        getLoanSummary(loans);

    return savings.map((item) => ({

        month:

            [

                "",

                "Jan",

                "Feb",

                "Mar",

                "Apr",

                "May",

                "Jun",

                "Jul",

                "Aug",

                "Sep",

                "Oct",

                "Nov",

                "Dec",

            ][item._id.month] +

            " " +

            item._id.year,

        netWorth: roundAmount(

            item.savings +

            investmentSummary.currentValue -

            loanSummary.outstanding

        ),

    }));

};

export const getFinancialHealth = async (userId, query) => {

    const { start, end } = getDateRange(query);

    const transactions = await Transaction.find({
        user: userId,
        date: {
            $gte: start,
            $lte: end,
        },
    });

    const investments = await Investment.find({
        user: userId,
    });

    const loans = await Loan.find({
        user: userId,
    });

    const insurances = await Insurance.find({
        user: userId,
    });

    const goals = await Goal.find({
        user: userId,
    });

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
                    (loanSummary.monthlyEMI /
                        transactionSummary.income) *
                    100
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

export const getFinancialInsights = async (userId, query) => {

    const overview =
        await getOverview(userId, query);

    const expenseAnalytics =
        await getExpenseAnalytics(userId, query);

    const incomeAnalytics =
        await getIncomeAnalytics(userId, query);

    const cashFlow =
        await getCashFlowAnalytics(userId, query);

    const financialHealth =
        await getFinancialHealth(userId, query);

    const input = {

        totalIncome:
            overview.income,

        totalExpense:
            overview.expenses,

        totalSavings:
            overview.savings,

        totalInvestments:
            overview.investments.currentValue,

        netWorth:
            overview.netWorth,

        savingsRate:
            overview.savingsRate,

        debtRatio:
            financialHealth.metrics.debtToIncomeRatio,

        emergencyFund:
            financialHealth.breakdown.emergency.score,

        completedGoals:
            overview.goals.completed,

        fireProgress:
            financialHealth.breakdown.fire.score,

        expenseAnalytics,

        incomeAnalytics,

        cashFlow,

    };

    return generateFinancialInsights(input);

};