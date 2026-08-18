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
            default: null,

            required: function () {
                return ![
                    "loan",
                    "insurance",
                ].includes(this.type);
            },
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        date: {
            type: Date,
            default: Date.now,
        },


        // ======================================================
        // INVESTMENT RELATIONSHIP
        // ======================================================

        investmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Investment",
            default: null,

            required: function () {
                return this.type === "investment";
            },
        },

        investmentMode: {
            type: String,
            enum: [
                "sip",
                "one_time",
                "",
                null,
            ],
            default: "",

            required: function () {
                return this.type === "investment";
            },
        },


        // ======================================================
        // LOAN RELATIONSHIP
        // ======================================================

        loanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loan",
            default: null,

            required: function () {
                return this.type === "loan";
            },
        },

        loanTransactionType: {
            type: String,
            enum: [
                "emi",
                "principal",
                "interest",
                "disbursement",
                "",
                null,
            ],
            default: "",

            required: function () {
                return this.type === "loan";
            },
        },


        // ======================================================
        // INSURANCE RELATIONSHIP
        // ======================================================

        insuranceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Insurance",
            default: null,

            required: function () {
                return this.type === "insurance";
            },
        },

        insuranceTransactionType: {
            type: String,
            enum: [
                "premium",
                "policy_expense",
                "",
                null,
            ],
            default: "",

            required: function () {
                return this.type === "insurance";
            },
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Transaction",
    transactionSchema
);