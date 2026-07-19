import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Goal from "../models/Goal.js";
import Insurance from "../models/Insurance.js";
import Loan from "../models/Loan.js";
import Retirement from "../models/Retirement.js";
import { calculateFinancialHealth } from "../utils/financialHealthEngine.js";


export const getDashboardAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.find({
            user: userId,
        }).populate("category");

        const expenseChartData = transactions.filter((transaction) => transaction.type === "expemse")
        .reduce((acc, transaction) => {
            const category = transaction.category?.name || "Others";

            const existing = acc.find(
                (item) => item.name === category
            );

            if(existing) {
                existing.value += transaction.amount;
            } else{
                acc.push({
                    name: category,
                    value: transaction.amount,
                });
            }
            return acc;

        }, []);

        const investments = await Investment.find({
            user: userId,
        });

        const investmentChartData = investments.reduce(
            (acc, investment) => {
                const existing = acc.find(
                    (item) => item.name === investment.type
                );

                if(existing){
                    existing.value += investment.currentValue;
                }
                else{
                    acc.push({
                        name: investment.type,
                        value: investment.currentValue,
                    });
                }

                return acc;
            },
            []
        );

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

        //Expense Distribution Chart

        const expenseDistribution = transactions.filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => {

            const category = transaction.category?.name || "Others";

            const existingCategory = acc.find(
                (item) => item.name === category
            );

            if(existingCategory) {
                existingCategory.value += transaction.amount;
            } else{
                acc.push({
                    name: category,
                    value: transaction.amount,
                });
            }
            return acc;
        }, []);

        //Investment Allocation Chart

        const investmentAllocation = investments.reduce(
            (acc, investment) => {
                const existingInvestment = acc.find(
                    (item) => item.name === investment.type
                );

                if(existingInvestment) {
                    existingInvestment.value += investment.currentValue;
                } else{
                    acc.push({
                        name: investment.type,
                        value: investment.currentValue,
                    });
                }

                return acc;
            },
            []
        );

        //Net Worth Timeline

        const netWorthTimeline = [
            {
                month: "Current",
                netWorth,
            },
        ];

        const financialHealth = calculateFinancialHealth({
            totalIncome,
            totalExpense,
            totalSavings,
            totalInvestments,
            insurances,
            loans,
            monthlyEMI,
            debtToIncomeRatio: debttoIncomeRatio,
            completedGoals,
            totalGoals: goals.length,
            retirement
        })
        

        res.json({
            financialHealth,
            
            summary: {
                income: totalIncome,
                expenses: totalExpense,
                savings: totalSavings,
                investments: totalInvestments,
                netWorth,
                savingsRate,
            },

            loans: {
                count: loans.length,
                monthlyEMI,
                outstandingDebt: totalOutstandingDebt,
                debtToIncomeRatio: debttoIncomeRatio,
            },

            financialMetrics: {
                savingsRate,
                debtToIncomeRatio: debttoIncomeRatio,
                monthlyEMI,
                outstandingDebt: totalOutstandingDebt,
                insuranceCoverage: totalInsuranceCoverage,
                netWorth,
            },

            insurance: {
                count: insurances.length,
                coverage: totalInsuranceCoverage,
            },

            goals: {
                completed: completedGoals,
                total: goals.length,
            },

            charts: {
                expenseDistribution,
                investmentAllocation,
                netWorthTimeline,
            },

            recentTransactions: transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5),

            retirement,
        });
    } catch (error) {
        console.error("========== DASHBOARD ERROR ==========");
        console.error(error);
        console.error("=====================================");

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};