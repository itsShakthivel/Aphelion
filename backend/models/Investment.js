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
    },

    amount: {
        type: Number,
        required: true,
    },

    currentValue: {
        type: Number,
        default: 0,
    },

    type: {
        type: String,
        enum: [
            "mutualfund",
            "stock",
            "gold",
            "crypto",
            "fd",
            "other"
        ],
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Investment",
    investmentSchema
);