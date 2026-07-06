import mongoose from "mongoose";

const retirementSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    targetCorpus: {
        type: Number,
        required: true,
    },

    currentCorpus: {
        type: Number,
        default: 0,
    },

    monthlyInvestment: {
        type: Number,
        default: 0,
    },

    retirementAge: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,
});

export default mongoose.model(
    "Retirement",
    retirementSchema
);