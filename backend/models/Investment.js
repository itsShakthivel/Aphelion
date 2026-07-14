import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: [
            "stock",
            "mutual_fund",
            "gold",
            "crypto",
            "fd",
            "other",
        ],
        required: true,
    },

    investedAmount: {
        type: Number,
        required: true,
    },

    currentValue: {
        type: Number,
        required: true,
    },

    purchaseDate: {
        type: Date,
        default: Date.now,
    },

    notes: {
        type: String,
        default: "",
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Investment",
    investmentSchema
);