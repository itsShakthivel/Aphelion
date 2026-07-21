import { roundAmount } from "../analyticsUtils.js";

export const getTransactionSummary = (transactions = []) => {

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

    const cashFlow = income - expenses;

    const savingsRate =
        income > 0
            ? (cashFlow / income) * 100
            : 0;

    return {

        income: roundAmount(income),

        expenses: roundAmount(expenses),

        savings: roundAmount(savings),

        investmentTransactions: roundAmount(
            investmentTransactions
        ),

        cashFlow: roundAmount(cashFlow),

        savingsRate: roundAmount(savingsRate),

    };

};