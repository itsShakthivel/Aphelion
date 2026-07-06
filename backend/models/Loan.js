import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    type: {
        type: String,
        enum: [
            "home",
            "personal",
            "vehicle",
            "education",
            "creditcard",
            "other"
        ],
    },

    principalAmount: {
        type: Number,
        required: true,
    },

    outstandingAmount: {
        type: Number,
        required: true,
    },

    emi: {
        type: Number,
        required: true,
    },

    interestRate: {
        type: Number,
    },

    tenureMonths: {
        type: Number,
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Loan",
    loanSchema
);