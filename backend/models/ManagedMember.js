import mongoose from "mongoose";

const managedMemberSchema = new mongoose.Schema(
    {

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

        relationship: {
            type: String,
            required: true,
            enum: [
                "Father",
                "Mother",
                "Brother",
                "Sister",
                "Grandfather",
                "Grandmother",
                "Son",
                "Daughter",
                "Guardian",
                "Other",
            ],
        },

        gender: {
            type: String,
            enum: [
                "Male",
                "Female",
                "Other",
            ],
            default: "Other",
        },

        dateOfBirth: {
            type: Date,
        },

        phone: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        notes: {
            type: String,
            default: "",
            maxlength: 500,
        },

        role: {
            type: String,
            enum: [
                "Adult",
                "Member",
                "Child",
            ],
            default: "Member",
        },

        isClaimed: {
            type: Boolean,
            default: false,
        },

        claimedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
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

managedMemberSchema.index({
    family: 1,
});

managedMemberSchema.index({
    claimedUser: 1,
});

export default mongoose.model(
    "ManagedMember",
    managedMemberSchema
);