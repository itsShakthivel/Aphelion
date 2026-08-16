import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Goal from "../models/Goal.js";
import Insurance from "../models/Insurance.js";
import Loan from "../models/Loan.js";
import Retirement from "../models/Retirement.js";

import {
    calculateFinancialHealth,
} from "../utils/financialHealthEngine.js";

export const getDashboardAnalytics = async (
    req,
    res
) => {

    try {

        const userId = req.user.id;

        const transactions =
            await Transaction.find({
                user: userId,
            })
                .populate("category")
                .populate("investmentId")
                .sort({
                    date: -1,
                });

        const investments =
            await Investment.find({
                user: userId,
            });

        const goals =
            await Goal.find({
                user: userId,
            });

        const insurances =
            await Insurance.find({
                user: userId,
            });

        const loans =
            await Loan.find({
                user: userId,
            });

        const retirement =
            await Retirement.findOne({
                user: userId,
            });

        const totalIncome =
            transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "income"
                )
                .reduce(
                    (sum, transaction) =>
                        sum +
                        Number(
                            transaction.amount
                        ),
                    0
                );

        const totalExpense =
            transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "expense"
                )
                .reduce(
                    (sum, transaction) =>
                        sum +
                        Number(
                            transaction.amount
                        ),
                    0
                );

        const totalSavings =
            transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "saving"
                )
                .reduce(
                    (sum, transaction) =>
                        sum +
                        Number(
                            transaction.amount
                        ),
                    0
                );

        const totalInvestmentTransactions =
            transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "investment"
                )
                .reduce(
                    (sum, transaction) =>
                        sum +
                        Number(
                            transaction.amount
                        ),
                    0
                );

        const totalInvestments =
            investments.reduce(
                (sum, investment) =>
                    sum +
                    Number(
                        investment.currentValue || 0
                    ),
                0
            );

        const totalInvested =
            investments.reduce(
                (sum, investment) =>
                    sum +
                    Number(
                        investment.investedAmount ||
                        0
                    ),
                0
            );

        const investmentGainLoss =
            totalInvestments -
            totalInvested;

        const netWorth =
            totalSavings +
            totalInvestments -
            loans.reduce(
                (sum, loan) =>
                    sum +
                    Number(
                        loan.outstandingAmount ||
                        0
                    ),
                0
            );

        const savingsRate =
            totalIncome > 0
                ? (
                    totalSavings /
                    totalIncome
                ) * 100
                : 0;

        const completedGoals =
            goals.filter(
                (goal) =>
                    Number(
                        goal.currentAmount || 0
                    ) >=
                    Number(
                        goal.targetAmount || 0
                    )
            ).length;

        const monthlyEMI =
            loans.reduce(
                (sum, loan) =>
                    sum +
                    Number(
                        loan.emi || 0
                    ),
                0
            );

        const totalOutstandingDebt =
            loans.reduce(
                (sum, loan) =>
                    sum +
                    Number(
                        loan.outstandingAmount ||
                        0
                    ),
                0
            );

        const debtToIncomeRatio =
            totalIncome > 0
                ? (
                    monthlyEMI /
                    totalIncome
                ) * 100
                : 0;

        const totalInsuranceCoverage =
            insurances.reduce(
                (sum, insurance) =>
                    sum +
                    Number(
                        insurance.coverage ||
                        insurance.coverageAmount ||
                        0
                    ),
                0
            );

        const expenseDistribution =
            transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "expense"
                )
                .reduce(
                    (result, transaction) => {

                        const categoryName =
                            transaction.category?.name ||
                            "Others";

                        const existing =
                            result.find(
                                (item) =>
                                    item.name ===
                                    categoryName
                            );

                        if (existing) {

                            existing.value +=
                                Number(
                                    transaction.amount
                                );

                        } else {

                            result.push({
                                name:
                                    categoryName,

                                value:
                                    Number(
                                        transaction.amount
                                    ),
                            });

                        }

                        return result;

                    },
                    []
                );

        const investmentAllocation =
            investments.reduce(
                (result, investment) => {

                    const investmentType =
                        investment.type ||
                        "other";

                    const existing =
                        result.find(
                            (item) =>
                                item.name ===
                                investmentType
                        );

                    if (existing) {

                        existing.value +=
                            Number(
                                investment.currentValue ||
                                0
                            );

                    } else {

                        result.push({
                            name:
                                investmentType,

                            value:
                                Number(
                                    investment.currentValue ||
                                    0
                                ),
                        });

                    }

                    return result;

                },
                []
            );

        const recentTransactions =
            transactions.slice(
                0,
                5
            );

        const financialHealth =
            calculateFinancialHealth({
                totalIncome,
                totalExpense,
                totalSavings,
                totalInvestments,
                insurances,
                loans,
                monthlyEMI,
                debtToIncomeRatio,
                completedGoals,
                totalGoals:
                    goals.length,
                retirement,
            });

        res.json({

            summary: {

                income:
                    totalIncome,

                expenses:
                    totalExpense,

                savings:
                    totalSavings,

                investments:
                    totalInvestments,

                investmentTransactions:
                    totalInvestmentTransactions,

                netWorth,

                savingsRate,

            },

            financialMetrics: {

                savingsRate,

                debtToIncomeRatio,

                monthlyEMI,

                outstandingDebt:
                    totalOutstandingDebt,

                insuranceCoverage:
                    totalInsuranceCoverage,

                netWorth,

            },

            loans: {

                count:
                    loans.length,

                monthlyEMI,

                outstandingDebt:
                    totalOutstandingDebt,

                debtToIncomeRatio,

            },

            insurance: {

                count:
                    insurances.length,

                coverage:
                    totalInsuranceCoverage,

            },

            goals: {

                completed:
                    completedGoals,

                total:
                    goals.length,

            },

            investments: {

                totalInvested,

                currentValue:
                    totalInvestments,

                gainLoss:
                    investmentGainLoss,

            },

            charts: {

                expenseDistribution,

                investmentAllocation,

                netWorthTimeline: [
                    {
                        month:
                            "Current",

                        netWorth,
                    },
                ],

            },

            recentTransactions,

            financialHealth,

            retirement,

        });

    } catch (error) {

        console.error(
            "========== DASHBOARD ERROR =========="
        );

        console.error(
            error
        );

        console.error(
            "====================================="
        );

        res.status(500).json({
            success: false,
            message:
                error.message,
        });

    }

};