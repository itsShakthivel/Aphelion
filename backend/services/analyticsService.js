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

/*
===========================================
Analytics Service
===========================================
*/

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

    /*
    ===========================================
    Transactions
    ===========================================
    */

    let income = 0;
    let expenses = 0;
    let savings = 0;
    let investmentTransactions = 0;

    transactions.forEach((transaction) => {

        switch (transaction.type) {

            case "income":
                income += transaction.amount;
                break;

            case "expense":
                expenses += transaction.amount;
                break;

            case "saving":
                savings += transaction.amount;
                break;

            case "investment":
                investmentTransactions += transaction.amount;
                break;

            default:
                break;

        }

    });

    /*
    ===========================================
    Investments
    ===========================================
    */

    const totalInvested = investments.reduce(

        (total, investment) =>

            total + investment.investedAmount,

        0

    );

    const currentInvestmentValue = investments.reduce(

        (total, investment) =>

            total + investment.currentValue,

        0

    );

    /*
    ===========================================
    Loans
    ===========================================
    */

    const outstandingLoans = loans.reduce(

        (total, loan) =>

            total + loan.outstandingAmount,

        0

    );

    /*
    ===========================================
    Insurance
    ===========================================
    */

    const totalCoverage = insurances.reduce(

        (total, insurance) =>

            total + insurance.coverage,

        0

    );

    /*
    ===========================================
    Goals
    ===========================================
    */

    const completedGoals = goals.filter(

        goal => goal.currentAmount >= goal.targetAmount

    ).length;

    const activeGoals = goals.length - completedGoals;

    /*
    ===========================================
    Response
    ===========================================
    */

    return {

        income: roundAmount(income),

        expenses: roundAmount(expenses),

        savings: roundAmount(savings),

        investmentTransactions: roundAmount(investmentTransactions),

        investments: {

            totalInvested: roundAmount(totalInvested),

            currentValue: roundAmount(currentInvestmentValue),

            gainLoss: roundAmount(

                currentInvestmentValue - totalInvested

            ),

        },

        loans: {

            outstanding: roundAmount(outstandingLoans),

            totalLoans: loans.length,

        },

        insurance: {

            totalPolicies: insurances.length,

            totalCoverage: roundAmount(totalCoverage),

        },

        goals: {

            total: goals.length,

            completed: completedGoals,

            active: activeGoals,

        },

    };

};


/*
==========================================
Expense Analytics
GET /api/analytics/expenses
==========================================
*/

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
                amount: "$amount",
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

/*
==========================================
Monthly Expense Trend
GET /api/analytics/expenses/monthly
==========================================
*/

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

/*
==========================================
Income Analytics
GET /api/analytics/income
==========================================
*/

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