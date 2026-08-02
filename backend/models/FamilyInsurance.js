import mongoose from "mongoose";

const familyInsuranceSchema = new mongoose.Schema(
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

        policyName: {

            type: String,

            required: true,

            trim: true,

        },

        provider: {

            type: String,

            required: true,

            trim: true,

        },

        insuranceType: {

            type: String,

            enum: [

                "Health",

                "Life",

                "Vehicle",

                "Home",

                "Travel",

                "Business",

                "Other",

            ],

            default: "Other",

        },

        premiumAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        coverageAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        renewalDate: {

            type: Date,

            required: true,

        },

        status: {

            type: String,

            enum: [

                "Active",

                "Expired",

                "Cancelled",

            ],

            default: "Active",

        },

        notes: {

            type: String,

            default: "",

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

familyInsuranceSchema.index({

    treasury: 1,

});

export default mongoose.model(

    "FamilyInsurance",

    familyInsuranceSchema

);