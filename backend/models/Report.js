import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        reportType: {

            type: String,

            enum: [

                "monthly",

                "annual",

                "fire",

            ],

            required: true,

        },

        format: {

            type: String,

            enum: [

                "pdf",

                "csv",

            ],

            required: true,

        },

        generatedAt: {

            type: Date,

            default: Date.now,

        },

    },

    {

        timestamps: true,

    }

);

export default mongoose.model(

    "Report",

    reportSchema

);