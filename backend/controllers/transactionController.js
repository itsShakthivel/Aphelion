import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Loan from "../models/Loan.js";
import Insurance from "../models/Insurance.js";

const investmentModes = [
    "sip",
    "one_time",
];

const loanTransactionTypes = [
    "disbursement",
    "emi",
    "principal",
    "interest",
];

const insuranceTransactionTypes = [
    "premium",
    "policy_expense",
];

const validateInvestmentData = async ({
    userId,
    type,
    investmentId,
    investmentMode,
}) => {

    if (type !== "investment") {

        return {
            valid: true,
            investment: null,
        };

    }

    if (!investmentId) {

        return {
            valid: false,
            status: 400,
            message:
                "Investment is required for investment transactions.",
        };

    }

    if (
        !investmentMode ||
        !investmentModes.includes(
            investmentMode
        )
    ) {

        return {
            valid: false,
            status: 400,
            message:
                "Investment mode must be SIP or One-Time.",
        };

    }

    const investment =
        await Investment.findOne({
            _id: investmentId,
            user: userId,
        });

    if (!investment) {

        return {
            valid: false,
            status: 404,
            message:
                "Investment not found.",
        };

    }

    return {
        valid: true,
        investment,
    };

};

const validateLoanData = async ({
    userId,
    type,
    loanId,
    loanTransactionType,
}) => {

    if (type !== "loan") {

        return {
            valid: true,
            loan: null,
        };

    }

    if (!loanId) {

        return {
            valid: false,
            status: 400,
            message:
                "Loan is required for loan transactions.",
        };

    }

    if (
        !loanTransactionType ||
        !loanTransactionTypes.includes(
            loanTransactionType
        )
    ) {

        return {
            valid: false,
            status: 400,
            message:
                "Invalid loan transaction type.",
        };

    }

    const loan =
        await Loan.findOne({
            _id: loanId,
            user: userId,
        });

    if (!loan) {

        return {
            valid: false,
            status: 404,
            message:
                "Loan not found.",
        };

    }

    return {
        valid: true,
        loan,
    };

};

const validateInsuranceData = async ({
    userId,
    type,
    insuranceId,
    insuranceTransactionType,
}) => {

    if (type !== "insurance") {

        return {
            valid: true,
            insurance: null,
        };

    }

    if (!insuranceId) {

        return {
            valid: false,
            status: 400,
            message:
                "Insurance policy is required for insurance transactions.",
        };

    }

    if (
        !insuranceTransactionType ||
        !insuranceTransactionTypes.includes(
            insuranceTransactionType
        )
    ) {

        return {
            valid: false,
            status: 400,
            message:
                "Invalid insurance transaction type.",
        };

    }

    const insurance =
        await Insurance.findOne({
            _id: insuranceId,
            user: userId,
        });

    if (!insurance) {

        return {
            valid: false,
            status: 404,
            message:
                "Insurance policy not found.",
        };

    }

    return {
        valid: true,
        insurance,
    };

};

export const createTransaction = async (
    req,
    res
) => {

    try {

        const {
            amount,
            type,
            category,
            description,
            date,
            investmentId,
            investmentMode,
            loanId,
            loanTransactionType,
            insuranceId,
            insuranceTransactionType,
        } = req.body;

        const investmentValidation =
            await validateInvestmentData({
                userId:
                    req.user.id,

                type,

                investmentId,

                investmentMode,
            });

        if (
            !investmentValidation.valid
        ) {

            return res.status(
                investmentValidation.status
            ).json({
                message:
                    investmentValidation.message,
            });

        }

        const loanValidation =
            await validateLoanData({
                userId:
                    req.user.id,

                type,

                loanId,

                loanTransactionType,
            });

        if (
            !loanValidation.valid
        ) {

            return res.status(
                loanValidation.status
            ).json({
                message:
                    loanValidation.message,
            });

        }

        const insuranceValidation =
            await validateInsuranceData({
                userId:
                    req.user.id,

                type,

                insuranceId,

                insuranceTransactionType,
            });

        if (
            !insuranceValidation.valid
        ) {

            return res.status(
                insuranceValidation.status
            ).json({
                message:
                    insuranceValidation.message,
            });

        }

        const transactionData = {
            user:
                req.user.id,

            amount,

            type,

            description,

            date,
        };

        if (
            type !== "loan" &&
            type !== "insurance"
        ) {

            transactionData.category =
                category;

        }

        if (
            type === "investment"
        ) {

            transactionData.investmentId =
                investmentId;

            transactionData.investmentMode =
                investmentMode;

        }

        if (
            type === "loan"
        ) {

            transactionData.loanId =
                loanId;

            transactionData.loanTransactionType =
                loanTransactionType;

        }

        if (
            type === "insurance"
        ) {

            transactionData.insuranceId =
                insuranceId;

            transactionData.insuranceTransactionType =
                insuranceTransactionType;

        }

        const transaction =
            await Transaction.create(
                transactionData
            );

        const populatedTransaction =
            await Transaction.findById(
                transaction._id
            )
                .populate("category")
                .populate("investmentId")
                .populate("loanId")
                .populate("insuranceId");

        res.status(201).json(
            populatedTransaction
        );

    } catch (error) {

        console.error(
            "Create Transaction Error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};

export const getTransactions = async (
    req,
    res
) => {

    try {

        const transactions =
            await Transaction.find({
                user:
                    req.user.id,
            })
                .populate("category")
                .populate("investmentId")
                .populate("loanId")
                .populate("insuranceId")
                .sort({
                    date: -1,
                });

        res.json(
            transactions
        );

    } catch (error) {

        console.error(
            "Get Transactions Error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};

export const getTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await Transaction.findOne({
                _id:
                    req.params.id,

                user:
                    req.user.id,
            })
                .populate("category")
                .populate("investmentId")
                .populate("loanId")
                .populate("insuranceId");

        if (!transaction) {

            return res.status(404).json({
                message:
                    "Transaction not found",
            });

        }

        res.json(
            transaction
        );

    } catch (error) {

        console.error(
            "Get Transaction Error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};

export const updateTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await Transaction.findOne({
                _id:
                    req.params.id,

                user:
                    req.user.id,
            });

        if (!transaction) {

            return res.status(404).json({
                message:
                    "Transaction not found",
            });

        }

        const {
            amount,
            type,
            category,
            description,
            date,
            investmentId,
            investmentMode,
            loanId,
            loanTransactionType,
            insuranceId,
            insuranceTransactionType,
        } = req.body;

        const investmentValidation =
            await validateInvestmentData({
                userId:
                    req.user.id,

                type,

                investmentId,

                investmentMode,
            });

        if (
            !investmentValidation.valid
        ) {

            return res.status(
                investmentValidation.status
            ).json({
                message:
                    investmentValidation.message,
            });

        }

        const loanValidation =
            await validateLoanData({
                userId:
                    req.user.id,

                type,

                loanId,

                loanTransactionType,
            });

        if (
            !loanValidation.valid
        ) {

            return res.status(
                loanValidation.status
            ).json({
                message:
                    loanValidation.message,
            });

        }

        const insuranceValidation =
            await validateInsuranceData({
                userId:
                    req.user.id,

                type,

                insuranceId,

                insuranceTransactionType,
            });

        if (
            !insuranceValidation.valid
        ) {

            return res.status(
                insuranceValidation.status
            ).json({
                message:
                    insuranceValidation.message,
            });

        }

        transaction.amount =
            amount;

        transaction.type =
            type;

        transaction.description =
            description;

        transaction.date =
            date;

        if (
            type !== "loan" &&
            type !== "insurance"
        ) {

            transaction.category =
                category;

        } else {

            transaction.category =
                null;

        }

        if (
            type === "investment"
        ) {

            transaction.investmentId =
                investmentId;

            transaction.investmentMode =
                investmentMode;

        } else {

            transaction.investmentId =
                null;

            transaction.investmentMode =
                null;

        }

        if (
            type === "loan"
        ) {

            transaction.loanId =
                loanId;

            transaction.loanTransactionType =
                loanTransactionType;

        } else {

            transaction.loanId =
                null;

            transaction.loanTransactionType =
                null;

        }

        if (
            type === "insurance"
        ) {

            transaction.insuranceId =
                insuranceId;

            transaction.insuranceTransactionType =
                insuranceTransactionType;

        } else {

            transaction.insuranceId =
                null;

            transaction.insuranceTransactionType =
                null;

        }

        await transaction.save();

        const updatedTransaction =
            await Transaction.findById(
                transaction._id
            )
                .populate("category")
                .populate("investmentId")
                .populate("loanId")
                .populate("insuranceId");

        res.json(
            updatedTransaction
        );

    } catch (error) {

        console.error(
            "Update Transaction Error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};

export const deleteTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await Transaction.findOneAndDelete({
                _id:
                    req.params.id,

                user:
                    req.user.id,
            });

        if (!transaction) {

            return res.status(404).json({
                message:
                    "Transaction not found",
            });

        }

        res.json({
            message:
                "Transaction deleted",
        });

    } catch (error) {

        console.error(
            "Delete Transaction Error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};