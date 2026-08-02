import mongoose from "mongoose";

const familyLoanSchema = new mongoose.Schema(
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

        loanName: {

            type: String,

            required: true,

            trim: true,

        },

        loanType: {

            type: String,

            enum: [

                "Bank",

                "Manual",

            ],

            required: true,

        },

        originalAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        remainingAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        interestRate: {

            type: Number,

            default: 0,

        },

        emi: {

            type: Number,

            default: 0,

        },

        tenure: {

            type: Number,

            default: 0,

        },

        creditor: {

            type: String,

            default: "",

        },

        startDate: {

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

familyLoanSchema.index({

    treasury: 1,

});

export default mongoose.model(

    "FamilyLoan",

    familyLoanSchema

);