import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";

const investmentModes = [
    "sip",
    "one_time",
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

        const transactionData = {
            user:
                req.user.id,

            amount,

            type,

            category,

            description,

            date,
        };

        if (
            type === "investment"
        ) {

            transactionData.investmentId =
                investmentId;

            transactionData.investmentMode =
                investmentMode;

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
                .populate("investmentId");

        res
            .status(201)
            .json(
                populatedTransaction
            );

    } catch (error) {

        console.error(
            "Create Transaction Error:",
            error
        );

        res
            .status(500)
            .json({
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

        res
            .status(500)
            .json({
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
                .populate("investmentId");

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

        res
            .status(500)
            .json({
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

        transaction.amount =
            amount;

        transaction.type =
            type;

        transaction.category =
            category;

        transaction.description =
            description;

        transaction.date =
            date;

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

        await transaction.save();

        const updatedTransaction =
            await Transaction.findById(
                transaction._id
            )
                .populate("category")
                .populate("investmentId");

        res.json(
            updatedTransaction
        );

    } catch (error) {

        console.error(
            "Update Transaction Error:",
            error
        );

        res
            .status(500)
            .json({
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

        res
            .status(500)
            .json({
                message:
                    error.message,
            });

    }

};