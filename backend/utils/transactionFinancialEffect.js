export const getTransactionFinancialEffect = (transaction) => {
    const amount = Number(transaction.amount) || 0;

    switch (transaction.type) {
        case "income":
            return amount;

        case "expense":
            return -amount;

        case "investment":
            return -amount;

        case "loan":
            switch (transaction.loanTransactionType) {
                case "disbursement":
                    return amount;

                case "emi":
                case "principal":
                case "interest":
                    return -amount;

                default:
                    return 0;
            }

        case "insurance":
            switch (transaction.insuranceTransactionType) {
                case "premium":
                case "policy_expense":
                    return -amount;

                default:
                    return 0;
            }

        case "saving":
            // Existing saving transactions are kept separate for now.
            // We do not count them again as cash movement.
            return 0;

        default:
            return 0;
    }
};


export const getTransactionEffectBreakdown = (transaction) => {
    const amount = Number(transaction.amount) || 0;

    const effect = {
        income: 0,
        expense: 0,
        investment: 0,
        loanInflow: 0,
        loanOutflow: 0,
        insurance: 0,
        saving: 0,
        availableSavingsEffect: 0,
    };

    switch (transaction.type) {
        case "income":
            effect.income = amount;
            effect.availableSavingsEffect = amount;
            break;

        case "expense":
            effect.expense = amount;
            effect.availableSavingsEffect = -amount;
            break;

        case "investment":
            effect.investment = amount;
            effect.availableSavingsEffect = -amount;
            break;

        case "loan":
            if (
                transaction.loanTransactionType === "disbursement"
            ) {
                effect.loanInflow = amount;
                effect.availableSavingsEffect = amount;
            }

            if (
                [
                    "emi",
                    "principal",
                    "interest",
                ].includes(transaction.loanTransactionType)
            ) {
                effect.loanOutflow = amount;
                effect.availableSavingsEffect = -amount;
            }
            break;

        case "insurance":
            if (
                [
                    "premium",
                    "policy_expense",
                ].includes(transaction.insuranceTransactionType)
            ) {
                effect.insurance = amount;
                effect.availableSavingsEffect = -amount;
            }
            break;

        case "saving":
            effect.saving = amount;

            // Do not count this again as a cash movement.
            effect.availableSavingsEffect = 0;
            break;

        default:
            break;
    }

    return effect;
};