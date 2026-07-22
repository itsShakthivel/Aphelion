import mongoose from "mongoose";
import Transaction from "../../models/Transaction.js";

import {
    getDateRange,
    MONTH_NAMES,
} from "../../utils/analyticsUtils.js";

export const getExpenseAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    return await Transaction.aggregate([

        {
            $match: {

                user: new mongoose.Types.ObjectId(userId),

                type: "expense",

                date: {

                    $gte: start,

                    $lte: end,

                },

            },

        },

        {
            $lookup: {

                from: "categories",

                localField: "category",

                foreignField: "_id",

                as: "category",

            },

        },

        {
            $unwind: "$category",

        },

        {
            $group: {

                _id: "$category.name",

                amount: {

                    $sum: "$amount",

                },

            },

        },

        {
            $project: {

                _id: 0,

                category: "$_id",

                amount: 1,

            },

        },

        {
            $sort: {

                amount: -1,

            },

        },

    ]);

};

export const getMonthlyExpenseTrend = async (userId, query) => {

    const { start, end } = getDateRange(query);

    return await Transaction.aggregate([

        {
            $match: {

                user: new mongoose.Types.ObjectId(userId),

                type: "expense",

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

                amount: {

                    $sum: "$amount",

                },

            },

        },

        {
            $sort: {

                "_id.year": 1,

                "_id.month": 1,

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

                amount: 1,

            },

        },

    ]);

};