import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        // ========================================
        // Notification Scope
        // ========================================

        scope: {

            type: String,

            enum: [

                "Personal",

                "Family",

            ],

            default: "Personal",

        },

        // ========================================
        // Family Reference
        // ========================================

        family: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Family",

            default: null,

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

                "Family",

                "Treasury",

                "Contribution",

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