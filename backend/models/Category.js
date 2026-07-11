import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    type: {
        type: String,
        enum: [
            "income",
            "expense",
            "investment",
            "saving"
        ],
        required: true,
    },

    group: {
        type: String,
        default: "General",
    },

    color: {
        type: String,
        default: "#10B981",
    },

    icon: {
        type: String,
        default: "💰",
    },

}, {
    timestamps: true,
});

categorySchema.index(
    {
        user: 1,
        name: 1,
        type: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model(
    "Category",
    categorySchema
);