import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: [
                "income",
                "expense",
                "saving",
                "investment",
                "loan",
                "insurance",
            ],
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: function () {
                return (
                    this.type !== "loan" &&
                    this.type !== "insurance"
                );
            },
            default: null,
        },

        investmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Investment",
            required: function () {
                return this.type === "investment";
            },
            default: null,
        },

        investmentMode: {
            type: String,
            enum: [
                "sip",
                "one_time",
            ],
            required: function () {
                return this.type === "investment";
            },
            default: null,
        },

        loanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loan",
            required: function () {
                return this.type === "loan";
            },
            default: null,
        },

        loanTransactionType: {
            type: String,
            enum: [
                "disbursement",
                "emi",
                "principal",
                "interest",
            ],
            required: function () {
                return this.type === "loan";
            },
            default: null,
        },

        insuranceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Insurance",
            required: function () {
                return this.type === "insurance";
            },
            default: null,
        },

        insuranceTransactionType: {
            type: String,
            enum: [
                "premium",
                "policy_expense",
            ],
            required: function () {
                return this.type === "insurance";
            },
            default: null,
        },

        description: {
            type: String,
            trim: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

transactionSchema.index({
    user: 1,
    date: -1,
});

transactionSchema.index({
    user: 1,
    type: 1,
});

transactionSchema.index({
    user: 1,
    investmentId: 1,
});

transactionSchema.index({
    user: 1,
    loanId: 1,
});

transactionSchema.index({
    user: 1,
    insuranceId: 1,
});

export default mongoose.model(
    "Transaction",
    transactionSchema
);