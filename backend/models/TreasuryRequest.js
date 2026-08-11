import mongoose from "mongoose";

const treasuryRequestSchema = new mongoose.Schema(
    {

        family: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Family",

            required: true,

            index: true,

        },

        treasury: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "FamilyTreasury",

            required: true,

        },

        requester: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        amount: {

            type: Number,

            required: true,

            min: 0,

        },

        purpose: {

            type: String,

            required: true,

            trim: true,

            maxlength: 300,

        },

        category: {

            type: String,

            default: "Other",

            trim: true,

        },

        notes: {

            type: String,

            default: "",

            maxlength: 500,

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Approved",

                "Rejected",

            ],

            default: "Pending",

        },

        reviewedBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null,

        },

        reviewedAt: {

            type: Date,

            default: null,

        },

        rejectionReason: {

            type: String,

            default: "",

            maxlength: 300,

        },

        approvedAt: {

            type: Date,

            default: null,

        },

    },

    {

        timestamps: true,

    }

);

treasuryRequestSchema.index({

    treasury: 1,

});

treasuryRequestSchema.index({

    status: 1,

});

treasuryRequestSchema.index({

    requester: 1,

});

export default mongoose.model(

    "TreasuryRequest",

    treasuryRequestSchema

);