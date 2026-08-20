import { roundAmount } from "../analyticsUtils.js";

export const getTransactionSummary = (transactions = []) => {

    let income = 0;
    let expenses = 0;
    let manualSavings = 0;
    let investmentTransactions = 0;

    let loanPayments = 0;
    let loanDisbursements = 0;

    let insuranceExpenses = 0;

    let availableSavings = 0;


    transactions.forEach((transaction) => {

        const amount =
            Number(transaction.amount) || 0;


        switch (transaction.type) {

            // ==================================================
            // INCOME
            // ==================================================

            case "income":

                income += amount;

                availableSavings += amount;

                break;


            // ==================================================
            // EXPENSE
            // ==================================================

            case "expense":

                expenses += amount;

                availableSavings -= amount;

                break;


            // ==================================================
            // LEGACY / MANUAL SAVING
            // ==================================================

            case "saving":

                manualSavings += amount;

                break;


            // ==================================================
            // INVESTMENT
            // ==================================================

            case "investment":

                investmentTransactions += amount;

                availableSavings -= amount;

                break;


            // ==================================================
            // LOAN
            // ==================================================

            case "loan":

                if (
                    transaction.loanTransactionType ===
                    "disbursement"
                ) {

                    loanDisbursements += amount;

                    availableSavings += amount;

                } else if (
                    [
                        "emi",
                        "principal",
                        "interest",
                    ].includes(
                        transaction.loanTransactionType
                    )
                ) {

                    loanPayments += amount;

                    availableSavings -= amount;

                }

                break;


            // ==================================================
            // INSURANCE
            // ==================================================

            case "insurance":

                if (
                    [
                        "premium",
                        "policy_expense",
                    ].includes(
                        transaction.insuranceTransactionType
                    )
                ) {

                    insuranceExpenses += amount;

                    availableSavings -= amount;

                }

                break;


            default:

                break;

        }

    });


    // ======================================================
    // CASH FLOW
    //
    // This represents all recorded cash movement.
    // ======================================================

    const cashFlow =
        availableSavings;


    // ======================================================
    // SAVINGS RATE
    //
    // Available cash remaining as a percentage of income.
    // ======================================================

    const savingsRate =
        income > 0
            ? (availableSavings / income) * 100
            : 0;


    return {

        income:
            roundAmount(income),

        expenses:
            roundAmount(expenses),

        // Existing explicit "saving" transactions.
        manualSavings:
            roundAmount(manualSavings),

        // Backward-compatible field for current frontend usage.
        savings:
            roundAmount(availableSavings),

        availableSavings:
            roundAmount(availableSavings),

        investmentTransactions:
            roundAmount(investmentTransactions),

        loanPayments:
            roundAmount(loanPayments),

        loanDisbursements:
            roundAmount(loanDisbursements),

        insuranceExpenses:
            roundAmount(insuranceExpenses),

        cashFlow:
            roundAmount(cashFlow),

        savingsRate:
            roundAmount(savingsRate),

    };

};