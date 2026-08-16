import mongoose from "mongoose";


const investmentSchema = new mongoose.Schema(
    {

        // ==========================================
        // USER
        // ==========================================

        user: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "User",

            required:
                true,

            index:
                true,

        },


        // ==========================================
        // BASIC INFORMATION
        // ==========================================

        name: {

            type:
                String,

            required:
                true,

            trim:
                true,

        },


        // ==========================================
        // PRIMARY INVESTMENT TYPE
        // ==========================================

        type: {

            type:
                String,

            enum: [

                "stock",

                "mutual_fund",

                "etf",

                "gold",

                "crypto",

                "fd",

                "real_estate",

                "bond",

                "other",

            ],

            required:
                true,

        },


        // ==========================================
        // MUTUAL FUND / INVESTMENT CATEGORY
        // ==========================================

        category: {

            type:
                String,

            enum: [

                "index_fund",

                "flexicap",

                "large_cap",

                "mid_cap",

                "small_cap",

                "multicap",

                "elss",

                "debt",

                "other",

            ],

            default:
                "other",

        },


        // ==========================================
        // HOLDING INFORMATION
        // ==========================================

        units: {

            type:
                Number,

            default:
                null,

            min:
                0,

        },


        averagePrice: {

            type:
                Number,

            default:
                null,

            min:
                0,

        },


        currentPrice: {

            type:
                Number,

            default:
                null,

            min:
                0,

        },


        // ==========================================
        // VALUE
        // ==========================================

        investedAmount: {

            type:
                Number,

            required:
                true,

            min:
                0,

        },


        currentValue: {

            type:
                Number,

            required:
                true,

            min:
                0,

        },


        // ==========================================
        // PERFORMANCE
        // ==========================================

        profitLoss: {

            type:
                Number,

            default:
                null,

        },


        roi: {

            type:
                Number,

            default:
                null,

        },


        xirr: {

            type:
                Number,

            default:
                null,

        },


        // ==========================================
        // DATES
        // ==========================================

        purchaseDate: {

            type:
                Date,

            default:
                Date.now,

        },


        valuationDate: {

            type:
                Date,

            default:
                null,

        },


        // ==========================================
        // IMPORT SOURCE
        // ==========================================

        source: {

            type:
                String,

            trim:
                true,

            default:
                "manual",

        },


        // ==========================================
        // BROKER METADATA
        // ==========================================

        brokerData: {

            isin: {

                type:
                    String,

                default:
                    null,

                trim:
                    true,

            },


            category: {

                type:
                    String,

                default:
                    null,

                trim:
                    true,

            },


            subCategory: {

                type:
                    String,

                default:
                    null,

                trim:
                    true,

            },


            folioNumber: {

                type:
                    String,

                default:
                    null,

                trim:
                    true,

            },


            source: {

                type:
                    String,

                default:
                    null,

                trim:
                    true,

            },

        },


        // ==========================================
        // NOTES
        // ==========================================

        notes: {

            type:
                String,

            default:
                "",

            trim:
                true,

        },

    },

    {

        timestamps:
            true,

    }

);


// ==========================================
// INDEXES
// ==========================================

investmentSchema.index({

    user:
        1,

});


investmentSchema.index({

    user:
        1,

    name:
        1,

});


investmentSchema.index({

    user:
        1,

    type:
        1,

});


investmentSchema.index({

    user:
        1,

    category:
        1,

});


investmentSchema.index({

    user:
        1,

    source:
        1,

    "brokerData,isin":
        1,

});


export default mongoose.model(

    "Investment",

    investmentSchema

);