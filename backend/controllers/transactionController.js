import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";
import Loan from "../models/Loan.js";
import Insurance from "../models/Insurance.js";
import { applyTransactionModuleEffect } from "../utils/transactionModuleSync.js";

const buildTransactionData = (body) => {
    const type = body.type;

    const data = {
        amount: Number(body.amount),
        type,
        category: ["loan", "insurance"].includes(type)
            ? null
            : body.category || null,
        description: body.description?.trim() || "",
        date: body.date || new Date(),
        investmentId: null,
        investmentMode: "",
        loanId: null,
        loanTransactionType: "",
        insuranceId: null,
        insuranceTransactionType: "",
    };

    if (type === "investment") {
        data.investmentId = body.investmentId || null;
        data.investmentMode = body.investmentMode || "";
    }

    if (type === "loan") {
        data.loanId = body.loanId || null;
        data.loanTransactionType =
            body.loanTransactionType || "";
    }

    if (type === "insurance") {
        data.insuranceId = body.insuranceId || null;
        data.insuranceTransactionType =
            body.insuranceTransactionType || "";
    }

    return data;
};

const validateRelationships = async (
    userId,
    transactionData
) => {
    if (transactionData.type === "investment") {
        const investment = await Investment.findOne({
            _id: transactionData.investmentId,
            user: userId,
        });

        if (!investment) {
            throw new Error(
                "Selected investment was not found."
            );
        }
    }

    if (transactionData.type === "loan") {
        const loan = await Loan.findOne({
            _id: transactionData.loanId,
            user: userId,
        });

        if (!loan) {
            throw new Error(
                "Selected loan was not found."
            );
        }
    }

    if (transactionData.type === "insurance") {
        const insurance = await Insurance.findOne({
            _id: transactionData.insuranceId,
            user: userId,
        });

        if (!insurance) {
            throw new Error(
                "Selected insurance policy was not found."
            );
        }
    }
};

const populateTransaction = (query) => {
    return query
        .populate("category")
        .populate("investmentId")
        .populate("loanId")
        .populate("insuranceId");
};

const validateTransactionData = (
    transactionData
) => {
    if (
        !transactionData.type ||
        !transactionData.amount ||
        transactionData.amount <= 0
    ) {
        throw new Error(
            "A valid transaction amount is required."
        );
    }

    if (
        !["loan", "insurance"].includes(
            transactionData.type
        ) &&
        !transactionData.category
    ) {
        throw new Error(
            "Please select a category."
        );
    }

    if (
        transactionData.type === "investment" &&
        (
            !transactionData.investmentId ||
            !transactionData.investmentMode
        )
    ) {
        throw new Error(
            "Please select an investment and investment mode."
        );
    }

    if (
        transactionData.type === "loan" &&
        (
            !transactionData.loanId ||
            !transactionData.loanTransactionType
        )
    ) {
        throw new Error(
            "Please select a loan and loan transaction type."
        );
    }

    if (
        transactionData.type === "insurance" &&
        (
            !transactionData.insuranceId ||
            !transactionData.insuranceTransactionType
        )
    ) {
        throw new Error(
            "Please select an insurance policy and transaction type."
        );
    }
};

export const createTransaction = async (
    req,
    res
) => {
    try {
        const transactionData =
            buildTransactionData(req.body);

        validateTransactionData(
            transactionData
        );

        await validateRelationships(
            req.user.id,
            transactionData
        );

        const transaction =
            await Transaction.create({
                user: req.user.id,
                ...transactionData,
            });

        try {
            await applyTransactionModuleEffect(
                transaction,
                1
            );
        } catch (syncError) {
            await Transaction.findByIdAndDelete(
                transaction._id
            );

            throw syncError;
        }

        const populatedTransaction =
            await populateTransaction(
                Transaction.findById(
                    transaction._id
                )
            );

        res.status(201).json(
            populatedTransaction
        );
    } catch (error) {
        console.error(
            "Create Transaction Error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getTransactions = async (
    req,
    res
) => {
    try {
        const transactions =
            await populateTransaction(
                Transaction.find({
                    user: req.user.id,
                }).sort({
                    date: -1,
                    createdAt: -1,
                })
            );

        res.json(transactions);
    } catch (error) {
        console.error(
            "Get Transactions Error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getTransaction = async (
    req,
    res
) => {
    try {
        const transaction =
            await populateTransaction(
                Transaction.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                })
            );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        res.json(transaction);
    } catch (error) {
        console.error(
            "Get Transaction Error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateTransaction = async (
    req,
    res
) => {
    try {
        const existingTransaction =
            await Transaction.findOne({
                _id: req.params.id,
                user: req.user.id,
            });

        if (!existingTransaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        const transactionData =
            buildTransactionData(req.body);

        validateTransactionData(
            transactionData
        );

        await validateRelationships(
            req.user.id,
            transactionData
        );

        await applyTransactionModuleEffect(
            existingTransaction,
            -1
        );

        let transaction;

        try {
            transaction =
                await Transaction.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        user: req.user.id,
                    },
                    {
                        $set: transactionData,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            await applyTransactionModuleEffect(
                transaction,
                1
            );
        } catch (error) {
            try {
                await Transaction.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        user: req.user.id,
                    },
                    {
                        $set: existingTransaction.toObject(),
                    },
                    {
                        new: true,
                        runValidators: false,
                    }
                );

                await applyTransactionModuleEffect(
                    existingTransaction,
                    1
                );
            } catch (rollbackError) {
                console.error(
                    "Transaction Rollback Error:",
                    rollbackError
                );
            }

            throw error;
        }

        const populatedTransaction =
            await populateTransaction(
                Transaction.findById(
                    transaction._id
                )
            );

        res.json(
            populatedTransaction
        );
    } catch (error) {
        console.error(
            "Update Transaction Error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteTransaction = async (
    req,
    res
) => {
    try {
        const transaction =
            await Transaction.findOne({
                _id: req.params.id,
                user: req.user.id,
            });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        await applyTransactionModuleEffect(
            transaction,
            -1
        );

        try {
            await transaction.deleteOne();
        } catch (error) {
            await applyTransactionModuleEffect(
                transaction,
                1
            );

            throw error;
        }

        res.json({
            message: "Transaction deleted",
        });
    } catch (error) {
        console.error(
            "Delete Transaction Error:",
            error
        );

        res.status(500).json({
            message: error.message,
        });
    }
};