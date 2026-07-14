import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        enum: [
            "emergency",
            "house",
            "car",
            "vacation",
            "education",
            "retirement",
            "investment",
            "other",
        ],
        default: "other",
    },

    targetAmount: {
        type: Number,
        required: true,
    },

    currentAmount: {
        type: Number,
        default: 0,
    },

    targetDate: {
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
    "Goal",
    goalSchema
);