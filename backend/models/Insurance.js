import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    type: {
        type: String,
        enum: [
            "health",
            "term",
            "vehicle",
            "home",
            "other"
        ],
        required: true,
    },

    provider: {
        type: String,
        required: true,
    },

    coverageAmount: {
        type: Number,
        required: true,
    },

    premium: {
        type: Number,
        required: true,
    },

    expiryDate: {
        type: Date,
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Insurance",
    insuranceSchema
);