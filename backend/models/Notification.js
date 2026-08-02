import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        title: {

            type: String,

            required: true,

        },

        message: {

            type: String,

            required: true,

        },

        type: {

            type: String,

            enum: [

                "Budget",

                "Goal",

                "Loan",

                "Insurance",

                "Investment",

                "Savings",

                "Report",

                "FIRE",

                "System",

            ],

            default: "System",

        },

        priority: {

            type: String,

            enum: [

                "Critical",

                "High",

                "Medium",

                "Low",

                "Info",

            ],

            default: "Info",

        },

        read: {

            type: Boolean,

            default: false,

        },

        action: {

            type: String,

            default: "",

        },

        link: {

            type: String,

            default: "",

        },

        payload: {

            type: mongoose.Schema.Types.Mixed,

            default: {},

        },

    },

    {

        timestamps: true,

    }

);

export default mongoose.model(
    "Notification",
    notificationSchema
);