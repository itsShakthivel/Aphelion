import mongoose from "mongoose";

const treasuryLedgerSchema = new mongoose.Schema(
    {
        treasury: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyTreasury",
            required: true,
        },

        family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Family",
            required: true,
        },

        bucket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TreasuryBucket",
            default: null,
        },

        type: {
            type: String,
            enum: [
                "Contribution",
                "Expense",
                "Transfer",
                "Investment",
                "Insurance",
                "Loan",
                "Refund",
                "Adjustment",
            ],
            required: true,
        },

        transactionType: {
            type: String,
            enum: [
                "Credit",
                "Debit",
            ],
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        balanceAfterTransaction: {
            type: Number,
            required: true,
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        notes: {
            type: String,
            default: "",
            maxlength: 500,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

treasuryLedgerSchema.index({
    treasury: 1,
    createdAt: -1,
});

treasuryLedgerSchema.index({
    bucket: 1,
});

export default mongoose.model(
    "TreasuryLedger",
    treasuryLedgerSchema
);