import mongoose from "mongoose";
import Transaction from "../../models/Transaction.js";

import {
    getDateRange,
} from "../../utils/analyticsUtils.js";

export const getIncomeAnalytics = async (userId, query) => {

    const { start, end } = getDateRange(query);

    return await Transaction.aggregate([

        {
            $match: {

                user: new mongoose.Types.ObjectId(userId),

                type: "income",

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

                source: "$_id",

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