import mongoose from "mongoose";

const familyInvestmentSchema = new mongoose.Schema(
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

        bucket: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "TreasuryBucket",

            default: null,

        },

        investmentName: {

            type: String,

            required: true,

            trim: true,

        },

        investmentType: {

            type: String,

            enum: [

                "Stocks",

                "Mutual Fund",

                "ETF",

                "Gold",

                "FD",

                "Real Estate",

                "Crypto",

                "Bond",

                "Other",

            ],

            default: "Other",

        },

        investedAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        currentValue: {

            type: Number,

            default: 0,

            min: 0,

        },

        investmentDate: {

            type: Date,

            default: Date.now,

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

familyInvestmentSchema.index({

    treasury: 1,

});

familyInvestmentSchema.index({

    bucket: 1,

});

export default mongoose.model(

    "FamilyInvestment",

    familyInvestmentSchema

);