import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
    {
        family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Family",
            required: true,
        },

        treasury: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyTreasury",
            required: true,
        },

        contributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        managedMember: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ManagedMember",
            default: null,
        },

        bucket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TreasuryBucket",
            default: null,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        category: {
            type: String,
            default: "",
            maxlength: 100,
        },

        recurring: {
            type: Boolean,
            default: false,
        },

        notes: {
            type: String,
            default: "",
            maxlength: 500,
        },

        contributedAt: {
            type: Date,
            default: Date.now,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

contributionSchema.index({
    family: 1,
});

contributionSchema.index({
    treasury: 1,
});

contributionSchema.index({
    contributor: 1,
});

contributionSchema.index({
    managedMember: 1,
});

export default mongoose.model(
    "Contribution",
    contributionSchema
);