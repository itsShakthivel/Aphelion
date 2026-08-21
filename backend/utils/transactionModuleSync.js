import Investment from "../models/Investment.js";
import Loan from "../models/Loan.js";

const roundAmount = (value) => {
    return Math.round(
        (Number(value) || 0) * 100
    ) / 100;
};

const getDocumentId = (value) => {
    if (!value) {
        return null;
    }

    if (
        typeof value === "object" &&
        value._id
    ) {
        return value._id.toString();
    }

    return value.toString();
};

const getInvestmentEffect = (
    transaction
) => {
    if (
        transaction?.type !== "investment" ||
        !transaction?.investmentId
    ) {
        return null;
    }

    return {
        investmentId: getDocumentId(
            transaction.investmentId
        ),
        amount: Number(
            transaction.amount
        ) || 0,
    };
};

const getLoanEffect = (
    transaction
) => {
    if (
        transaction?.type !== "loan" ||
        !transaction?.loanId
    ) {
        return null;
    }

    const loanTransactionType =
        transaction.loanTransactionType;

    if (
        ![
            "principal",
            "disbursement",
        ].includes(
            loanTransactionType
        )
    ) {
        return null;
    }

    return {
        loanId: getDocumentId(
            transaction.loanId
        ),
        amount: Number(
            transaction.amount
        ) || 0,
        loanTransactionType,
    };
};

const syncInvestment = async (
    transaction,
    direction
) => {
    const effect =
        getInvestmentEffect(transaction);

    if (!effect) {
        return;
    }

    const investment =
        await Investment.findById(
            effect.investmentId
        );

    if (!investment) {
        return;
    }

    const delta =
        effect.amount * direction;

    const previousInvestedAmount =
        Number(
            investment.investedAmount
        ) || 0;

    const previousCurrentValue =
        Number(
            investment.currentValue
        ) || 0;

    const unrealizedDifference =
        previousCurrentValue -
        previousInvestedAmount;

    const investedAmount =
        Math.max(
            0,
            roundAmount(
                previousInvestedAmount +
                delta
            )
        );

    const currentValue =
        Math.max(
            0,
            roundAmount(
                investedAmount +
                unrealizedDifference
            )
        );

    const profitLoss =
        roundAmount(
            currentValue -
            investedAmount
        );

    const roi =
        investedAmount > 0
            ? roundAmount(
                (
                    profitLoss /
                    investedAmount
                ) * 100
            )
            : 0;

    investment.investedAmount =
        investedAmount;

    investment.currentValue =
        currentValue;

    investment.profitLoss =
        profitLoss;

    investment.roi =
        roi;

    await investment.save();
};

const syncLoan = async (
    transaction,
    direction
) => {
    const effect =
        getLoanEffect(transaction);

    if (!effect) {
        return;
    }

    const loan =
        await Loan.findById(
            effect.loanId
        );

    if (!loan) {
        return;
    }

    const outstandingAmount =
        Number(
            loan.outstandingAmount
        ) || 0;

    let change = 0;

    if (
        effect.loanTransactionType ===
        "principal"
    ) {
        change =
            -effect.amount * direction;
    }

    if (
        effect.loanTransactionType ===
        "disbursement"
    ) {
        change =
            effect.amount * direction;
    }

    loan.outstandingAmount =
        Math.max(
            0,
            roundAmount(
                outstandingAmount +
                change
            )
        );

    await loan.save();
};

export const applyTransactionModuleEffect = async (
    transaction,
    direction = 1
) => {
    await syncInvestment(
        transaction,
        direction
    );

    await syncLoan(
        transaction,
        direction
    );
};