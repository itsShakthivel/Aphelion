import mongoose from "mongoose";

const familyTransactionSchema = new mongoose.Schema(
    {

        family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Family",
            required: true,
            index: true,
        },

        treasury: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyTreasury",
            required: true,
        },

        bucket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TreasuryBucket",
            default: null,
        },

        paidBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        type: {
            type: String,
            enum: [
                "Expense",
                "Income",
            ],
            default: "Expense",
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            maxlength: 500,
        },

        attachments: [
            {
                type: String,
            },
        ],

        status: {
            type: String,
            enum: [
                "Completed",
                "Pending",
                "Cancelled",
            ],
            default: "Completed",
        },

        transactionDate: {
            type: Date,
            default: Date.now,
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

familyTransactionSchema.index({
    treasury: 1,
});

familyTransactionSchema.index({
    bucket: 1,
});

familyTransactionSchema.index({
    transactionDate: -1,
});

export default mongoose.model(
    "FamilyTransaction",
    familyTransactionSchema
);