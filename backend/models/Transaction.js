import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: [
            "income",
            "expense",
            "saving"
        ],
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },

    description: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Transaction",
    transactionSchema
);