import mongoose from "mongoose";

const familyTreasurySchema = new mongoose.Schema(
    {
        family: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Family",
            required: true,
            unique: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        totalBalance: {
            type: Number,
            default: 0,
            min: 0,
        },

        availableBalance: {
            type: Number,
            default: 0,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

familyTreasurySchema.index({
    family: 1,
});

export default mongoose.model(
    "FamilyTreasury",
    familyTreasurySchema
);