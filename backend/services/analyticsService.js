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
import { generateFinancialInsights } from "../utils/financialInsightsEngine.js"

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

/*
==========================================
Cash Flow Analytics
GET /api/analytics/cash-flow
==========================================
*/

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

                month: 1,

            },

        },

    ]);

    return cashFlow;

};

/*
==========================================
Net Worth Analytics
GET /api/analytics/net-worth
==========================================
*/

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

    /*
    ==========================================
    Assets
    ==========================================
    */

    const savings = savingsTransactions.reduce(

        (total, transaction) =>

            total + transaction.amount,

        0

    );

    const investmentsValue = investments.reduce(

        (total, investment) =>

            total + investment.currentValue,

        0

    );

    const totalAssets =

        savings +

        investmentsValue;

    /*
    ==========================================
    Liabilities
    ==========================================
    */

    const liabilities = loans.reduce(

        (total, loan) =>

            total + loan.outstandingAmount,

        0

    );

    /*
    ==========================================
    Net Worth
    ==========================================
    */

    const netWorth =

        totalAssets -

        liabilities;

    return {

        assets: roundAmount(totalAssets),

        liabilities: roundAmount(liabilities),

        netWorth: roundAmount(netWorth),

    };

};

/*
==========================================
Net Worth Timeline
GET /api/analytics/net-worth/timeline
==========================================
*/

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

    const investmentValue = investments.reduce(

        (total, investment) =>

            total + investment.currentValue,

        0

    );

    const liabilities = loans.reduce(

        (total, loan) =>

            total + loan.outstandingAmount,

        0

    );

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

        netWorth:

            roundAmount(

                item.savings +

                investmentValue -

                liabilities

            ),

    }));

};

/*
==========================================
Financial Health
GET /api/analytics/financial-health
==========================================
*/

export const getFinancialHealth = async (userId, query) => {

    const { start, end } = getDateRange(query);

    /*
    ==========================================
    Fetch Data
    ==========================================
    */

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
    ==========================================
    Transaction Totals
    ==========================================
    */

    let totalIncome = 0;
    let totalExpense = 0;
    let totalSavings = 0;

    transactions.forEach((transaction) => {

        switch (transaction.type) {

            case "income":
                totalIncome += transaction.amount;
                break;

            case "expense":
                totalExpense += transaction.amount;
                break;

            case "saving":
                totalSavings += transaction.amount;
                break;

            default:
                break;

        }

    });

    /*
    ==========================================
    Investments
    ==========================================
    */

    const totalInvestments = investments.reduce(

        (sum, investment) =>

            sum + investment.currentValue,

        0

    );

    /*
    ==========================================
    Goals
    ==========================================
    */

    const completedGoals = goals.filter(

        goal => goal.currentAmount >= goal.targetAmount

    ).length;

    /*
    ==========================================
    Debt Metrics
    ==========================================
    */

    const monthlyEMI = loans.reduce(

        (sum, loan) =>

            sum + loan.emi,

        0

    );

    const debtToIncomeRatio =

        totalIncome > 0

            ? Number(

                ((monthlyEMI / totalIncome) * 100)

                .toFixed(2)

            )

            : 0;

    /*
    ==========================================
    FIRE Placeholder
    ==========================================
    */

    const retirement = null;

    /*
    ==========================================
    Financial Health Engine
    ==========================================
    */

    return calculateFinancialHealth({

        totalIncome,

        totalExpense,

        totalSavings,

        totalInvestments,

        insurances,

        loans,

        monthlyEMI,

        debtToIncomeRatio,

        completedGoals,

        totalGoals: goals.length,

        retirement,

    });

};

export const getFinancialInsights = async (userId, query) => {

    /*
    ==========================================
    Existing Analytics Data
    ==========================================
    */

    const overview = await getOverview(userId, query);

    const expenseAnalytics = await getExpenseAnalytics(userId, query);

    const incomeAnalytics = await getIncomeAnalytics(userId,query);

    const cashFlow = await getCashFlowAnalytics(userId,query);

    const financialHealth = await getFinancialHealth(userId,query);

    /*
    ==========================================
    Prepare Engine Input
    ==========================================
    */

    const input = {

        totalIncome: overview.totalIncome,

        totalExpense: overview.totalExpenses,

        totalSavings: overview.totalSavings,

        totalInvestments: overview.totalInvestments,

        netWorth: overview.netWorth,

        savingsRate: overview.savingsRate,

        debtRatio:
            financialHealth.metrics.debtToIncomeRatio,

        emergencyFund:
            financialHealth.breakdown.emergency.score,

        completedGoals:
            overview.completedGoals || 0,

        fireProgress:
            financialHealth.breakdown.fire.score,

    };

    /*
    ==========================================
    Generate Insights
    ==========================================
    */

    const insights = generateFinancialInsights(input);

    return insights;

};