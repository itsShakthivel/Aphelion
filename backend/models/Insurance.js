import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    policyName: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: [
            "health",
            "term",
            "vehicle",
            "home",
            "other",
        ],
        required: true,
    },

    provider: {
        type: String,
        required: true,
    },

    premium: {
        type: Number,
        required: true,
    },

    coverage: {
        type: Number,
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    expiryDate: {
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
    "Insurance",
    insuranceSchema
);