import FamilyTransaction from "../../models/FamilyTransaction.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";
import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Transaction
// ============================================

export const createTransactionService = async (
    data
) => {

    const treasury =
        await FamilyTreasury.findById(
            data.treasury
        );

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    let bucket = null;

    if (data.bucket) {

        bucket =
            await TreasuryBucket.findById(
                data.bucket
            );

        if (!bucket) {

            throw new Error(
                "Bucket not found."
            );

        }

    }

    if (data.type === "Expense") {

        if (bucket) {

            if (bucket.balance < data.amount) {

                throw new Error(
                    "Insufficient bucket balance."
                );

            }

            bucket.balance -= data.amount;

            await bucket.save();

        }
        else {

            if (
                treasury.availableBalance <
                data.amount
            ) {

                throw new Error(
                    "Insufficient treasury balance."
                );

            }

            treasury.availableBalance -=
                data.amount;

        }

        treasury.totalBalance -= data.amount;

    }

    if (data.type === "Income") {

        treasury.totalBalance += data.amount;

        if (bucket) {

            bucket.balance += data.amount;

            await bucket.save();

        }
        else {

            treasury.availableBalance +=
                data.amount;

        }

    }

    await treasury.save();

    const transaction =
        await FamilyTransaction.create({

            ...data,

        });

    await TreasuryLedger.create({

        treasury: treasury._id,

        family: data.family,

        bucket: data.bucket || null,

        type: data.type,

        transactionType:
            data.type === "Income"
                ? "Credit"
                : "Debit",

        amount: data.amount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            transaction._id,

        notes:
            data.description,

        createdBy:
            data.createdBy,

    });

    return transaction;

};

// ============================================
// Get Transactions
// ============================================

export const getTransactionsService = async (
    treasuryId
) => {

    return await FamilyTransaction.find({

        treasury: treasuryId,

    })

        .populate(
            "paidBy",
            "name email avatar"
        )

        .populate(
            "bucket",
            "name color icon"
        )

        .sort({

            transactionDate: -1,

        });

};

// ============================================
// Get Transaction
// ============================================

export const getTransactionService = async (
    transactionId
) => {

    const transaction =
        await FamilyTransaction.findById(
            transactionId
        )

            .populate(
                "paidBy",
                "name email avatar"
            )

            .populate(
                "bucket",
                "name color icon"
            );

    if (!transaction) {

        throw new Error(
            "Transaction not found."
        );

    }

    return transaction;

};

// ============================================
// Update Transaction
// ============================================

export const updateTransactionService = async (
    transactionId,
    data
) => {

    const transaction =
        await FamilyTransaction.findById(
            transactionId
        );

    if (!transaction) {

        throw new Error(
            "Transaction not found."
        );

    }

    if (data.category !== undefined)
        transaction.category = data.category;

    if (data.description !== undefined)
        transaction.description =
            data.description;

    if (data.status !== undefined)
        transaction.status =
            data.status;

    await transaction.save();

    return transaction;

};

// ============================================
// Delete Transaction
// ============================================

export const deleteTransactionService = async (
    transactionId
) => {

    const transaction =
        await FamilyTransaction.findById(
            transactionId
        );

    if (!transaction) {

        throw new Error(
            "Transaction not found."
        );

    }

    await transaction.deleteOne();

    return {

        success: true,

        message:
            "Transaction deleted successfully.",

    };

};