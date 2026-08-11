import mongoose from "mongoose";

const familyGoalSchema = new mongoose.Schema(
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

        name: {

            type: String,

            required: true,

            trim: true,

            maxlength: 150,

        },

        description: {

            type: String,

            default: "",

            maxlength: 500,

        },

        targetAmount: {

            type: Number,

            required: true,

            min: 0,

        },

        currentAmount: {

            type: Number,

            default: 0,

            min: 0,

        },

        targetDate: {

            type: Date,

            default: null,

        },

        category: {

            type: String,

            enum: [

                "Vacation",

                "Education",

                "Wedding",

                "Home",

                "Vehicle",

                "Emergency",

                "Purchase",

                "Other",

            ],

            default: "Other",

        },

        status: {

            type: String,

            enum: [

                "Active",

                "Completed",

                "Cancelled",

            ],

            default: "Active",

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

familyGoalSchema.index({

    treasury: 1,

});

familyGoalSchema.index({

    targetDate: 1,

});

export default mongoose.model(

    "FamilyGoal",

    familyGoalSchema

);