import mongoose from "mongoose";

const treasuryBucketSchema = new mongoose.Schema(
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

            index: true,

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

            default: "",

        },

        icon: {

            type: String,

            default: "",

        },

        isActive: {

            type: Boolean,

            default: true,

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

    family: 1,

    name: 1,

});

export default mongoose.model(

    "TreasuryBucket",

    treasuryBucketSchema

);