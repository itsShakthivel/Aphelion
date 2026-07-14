import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    loanName: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: [
            "home",
            "personal",
            "education",
            "vehicle",
            "gold",
            "credit_card",
            "other",
        ],
        required: true,
    },

    lender: {
        type: String,
        required: true,
    },

    principalAmount: {
        type: Number,
        required: true,
    },

    outstandingAmount: {
        type: Number,
        required: true,
    },

    interestRate: {
        type: Number,
        required: true,
    },

    emi: {
        type: Number,
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    notes: {
        type: String,
        default: "",
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Loan",
    loanSchema
);