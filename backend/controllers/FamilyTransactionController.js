import {
    createTransactionService,
    getTransactionsService,
    getTransactionService,
    updateTransactionService,
    deleteTransactionService,
} from "../services/family/transaction.service.js";

// ============================================
// Create Transaction
// ============================================

export const createTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await createTransactionService({

                ...req.body,

                family: req.params.familyId,

                treasury: req.params.treasuryId,

                createdBy: req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Transaction created successfully.",

            data: transaction,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Transactions
// ============================================

export const getTransactions = async (
    req,
    res
) => {

    try {

        const transactions =
            await getTransactionsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: transactions,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Transaction
// ============================================

export const getTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await getTransactionService(

                req.params.transactionId

            );

        return res.json({

            success: true,

            data: transaction,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Update Transaction
// ============================================

export const updateTransaction = async (
    req,
    res
) => {

    try {

        const transaction =
            await updateTransactionService(

                req.params.transactionId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Transaction updated successfully.",

            data: transaction,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Delete Transaction
// ============================================

export const deleteTransaction = async (
    req,
    res
) => {

    try {

        const result =
            await deleteTransactionService(

                req.params.transactionId

            );

        return res.json(result);

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};