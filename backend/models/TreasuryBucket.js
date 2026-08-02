import mongoose from "mongoose";

const treasuryBucketSchema = new mongoose.Schema(
    {
        treasury: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyTreasury",
            required: true,
        },

        family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Family",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            default: "",
            maxlength: 300,
        },

        balance: {
            type: Number,
            default: 0,
            min: 0,
        },

        color: {
            type: String,
            default: "#3B82F6",
        },

        icon: {
            type: String,
            default: "wallet",
        },

        type: {
            type: String,
            enum: [
                "Savings",
                "Emergency",
                "Investment",
                "Insurance",
                "Goal",
                "Business",
                "Custom",
            ],
            default: "Custom",
        },

        displayOrder: {
            type: Number,
            default: 0,
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        isArchived: {
            type: Boolean,
            default: false,
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

treasuryBucketSchema.index({
    treasury: 1,
});

treasuryBucketSchema.index({
    family: 1,
});

treasuryBucketSchema.index({
    treasury: 1,
    name: 1,
}, {
    unique: true,
});

export default mongoose.model(
    "TreasuryBucket",
    treasuryBucketSchema
);