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

            case "income":

                income += amount;
                availableSavings += amount;

                break;


            case "expense":

                expenses += amount;
                availableSavings -= amount;

                break;


            case "saving":

                // Keep old explicit saving records separately.
                // They are not counted as a second cash movement.
                manualSavings += amount;

                break;


            case "investment":

                investmentTransactions += amount;
                availableSavings -= amount;

                break;


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


    // Net cash remaining from all recorded movements.
    const cashFlow =
        availableSavings;


    // Savings rate is based on actual income only.
    const savingsRate =
        income > 0
            ? (
                availableSavings / income
            ) * 100
            : 0;


    return {

        income:
            roundAmount(income),

        expenses:
            roundAmount(expenses),

        manualSavings:
            roundAmount(manualSavings),

        // Keep this for existing backend consumers.
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