import mongoose from "mongoose";
import Transaction from "../../models/Transaction.js";

import {
    getDateRange,
    MONTH_NAMES,
} from "../../utils/analyticsUtils.js";

export const getCashFlowAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    return await Transaction.aggregate([

        {
            $match: {

                user: new mongoose.Types.ObjectId(userId),

                date: {

                    $gte: start,

                    $lte: end,

                },

            },

        },

        {
            $group: {

                _id: {

                    year: {

                        $year: "$date",

                    },

                    month: {

                        $month: "$date",

                    },

                },

                income: {

                    $sum: {

                        $cond: [

                            {

                                $eq: [

                                    "$type",

                                    "income",

                                ],

                            },

                            "$amount",

                            0,

                        ],

                    },

                },

                expense: {

                    $sum: {

                        $cond: [

                            {

                                $eq: [

                                    "$type",

                                    "expense",

                                ],

                            },

                            "$amount",

                            0,

                        ],

                    },

                },

            },

        },

        {
            $project: {

                _id: 0,

                month: {

                    $concat: [

                        {

                            $arrayElemAt: [

                                MONTH_NAMES,

                                "$_id.month",

                            ],

                        },

                        " ",

                        {

                            $toString: "$_id.year",

                        },

                    ],

                },

                income: 1,

                expense: 1,

                cashFlow: {

                    $subtract: [

                        "$income",

                        "$expense",

                    ],

                },

            },

        },

        {
            $sort: {

                "_id.year": 1,

                "_id.month": 1,

            },

        },

    ]);

};