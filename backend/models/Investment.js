import mongoose from "mongoose";


const investmentSchema = new mongoose.Schema(
    {

        // ==========================================
        // USER
        // ==========================================

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true,

        },


        // ==========================================
        // BASIC INFORMATION
        // ==========================================

        name: {

            type: String,

            required: true,

            trim: true,

        },


        type: {

            type: String,

            enum: [

                "stock",

                "mutual_fund",

                "index_fund",

                "etf",

                "gold",

                "crypto",

                "fd",

                "real_estate",

                "bond",

                "other",

            ],

            required: true,

        },


        // ==========================================
        // HOLDING INFORMATION
        // ==========================================

        units: {

            type: Number,

            default: null,

            min: 0,

        },


        averagePrice: {

            type: Number,

            default: null,

            min: 0,

        },


        currentPrice: {

            type: Number,

            default: null,

            min: 0,

        },


        // ==========================================
        // VALUE
        // ==========================================

        investedAmount: {

            type: Number,

            required: true,

            min: 0,

        },


        currentValue: {

            type: Number,

            required: true,

            min: 0,

        },


        // ==========================================
        // PERFORMANCE
        // ==========================================

        profitLoss: {

            type: Number,

            default: null,

        },


        roi: {

            type: Number,

            default: null,

        },


        xirr: {

            type: Number,

            default: null,

        },


        // ==========================================
        // DATES
        // ==========================================

        purchaseDate: {

            type: Date,

            default: Date.now,

        },


        valuationDate: {

            type: Date,

            default: null,

        },


        // ==========================================
        // IMPORT SOURCE
        // ==========================================

        source: {

            type: String,

            trim: true,

            default: "manual",

        },


        // ==========================================
        // NOTES
        // ==========================================

        notes: {

            type: String,

            default: "",

            trim: true,

        },

    },

    {

        timestamps: true,

    }

);


// ==========================================
// INDEXES
// ==========================================

investmentSchema.index({

    user: 1,

});


investmentSchema.index({

    user: 1,

    name: 1,

});


export default mongoose.model(

    "Investment",

    investmentSchema

);