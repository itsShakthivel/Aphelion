import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        role: {
            type: String,
            enum: [
                "Owner",
                "Admin",
                "Adult",
                "Member",
                "Child",
            ],
            default: "Member",
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Active",
                "Removed",
            ],
            default: "Active",
        },

        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const familySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: 300,
        },

        avatar: {
            type: String,
            default: "",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            familyMemberSchema,
        ],

        inviteCode: {
            type: String,
            required: true,
            unique: true,
        },

        configuration: {
            currency: {
                type: String,
                default: "INR",
            },

            timezone: {
                type: String,
                default: "Asia/Kolkata",
            },

            locale: {
                type: String,
                default: "en-IN",
            },
        },

        features: {
            treasuryEnabled: {
                type: Boolean,
                default: true,
            },

            managedMembersEnabled: {
                type: Boolean,
                default: true,
            },

            invitationsEnabled: {
                type: Boolean,
                default: true,
            },
        },

        statistics: {
            memberCount: {
                type: Number,
                default: 1,
            },

            registeredMemberCount: {
                type: Number,
                default: 1,
            },

            managedMemberCount: {
                type: Number,
                default: 0,
            },
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

familySchema.index({ owner: 1 });

familySchema.index({ "members.user": 1 });

familySchema.index({ isActive: 1 });

const Family = mongoose.model(
    "Family",
    familySchema
);

export default Family;