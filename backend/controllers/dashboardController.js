import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Goal from "../models/Goal.js";
import Insurance from "../models/Insurance.js";
import Loan from "../models/Loan.js";
import Retirement from "../models/Retirement.js";
import { calculateFinancialHealthV2 } from "../utils/financialHealthEngine.js";

export const getDashboardAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({
            user: userId,
        }).populate("category");

        const investments = await Investment.find({
            user: userId,
        });

        const goals = await Goal.find({
            user: userId,
        });

        const insurances = await Insurance.find({
            user: userId,
        });

        const loans = await Loan.find({
            user: userId,
        });
        const retirement = await Retirement.findOne({
            user: userId,
        });

        //Income
        const totalIncome = transactions
            .filter(
            t => t.type === "income"
            )
            .reduce(
            (sum, t) => sum + t.amount, 0
        );

        //Expence

        const totalExpense = transactions
            .filter(
                t => t.type === "expense"
            )
            .reduce(
                (sum, t) => sum + t.amount, 0
        );

        //Savings

        const totalSavings = transactions
            .filter(
                t => t.type === "saving"
            )
            .reduce(
                (sum, t) =>
                    sum + t.amount, 0
        );

        //Investments

        const totalInvestments = investments
            .reduce(
                (sum, inv) => sum + inv.currentValue, 0
        );

        //Net Worth

        const netWorth = totalSavings + totalInvestments;

        //Saving Rate

        const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

        const completedGoals = goals.filter(
            goal => goal.currentAmount >= goal.targetAmount
        ).length;

        const totalOutstandingDebt = loans.reduce(
            (sum, loan) => sum + loan.outstandingAmount, 0
        );

        const monthlyEMI = loans.reduce(
            (sum, loan) => sum + loan.emi, 0
        );

        const debttoIncomeRatio = totalIncome > 0 ? (monthlyEMI / totalIncome) * 100 : 0;

        const totalInsuranceCoverage = insurances.reduce(
            (sum, insurance) => sum + insurance.coverageAmount, 0
        );

        const financialHealth = calculateFinancialHealthV2({
            totalIncome,
            totalExpense,
            totalSavings,
            totalInvestments,
            insurances,
            loans,
            completedGoals,
            totalGoals: goals.length,
            retirement
        })
        

        res.json({
            financeHealth,
            totalIncome,
            totalExpense,
            totalSavings,
            totalInvestments,
            netWorth,
            savingsRate,
            totalGoals: goals.length,
            totalTransactions: transactions.length,
            totalOutstandingDebt,
            monthlyEMI,
            debttoIncomeRatio,
            insurancesCount: insurance.length,
            loanCount: loans.length,
            retirementPlan: retirement,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};