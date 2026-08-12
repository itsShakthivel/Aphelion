import mongoose from "mongoose";

import FamilyTreasury from "../../models/FamilyTreasury.js";
import Contribution from "../../models/Contribution.js";
import FamilyTransaction from "../../models/FamilyTransaction.js";
import FamilyInvestment from "../../models/FamilyInvestment.js";
import FamilyLoan from "../../models/FamilyLoan.js";
import FamilyInsurance from "../../models/FamilyInsurance.js";
import FamilyGoal from "../../models/FamilyGoal.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";

// ============================================
// Household Overview
// ============================================

export const getFamilyAnalyticsOverviewService =
async (
    familyId,
    treasuryId
) => {

    const treasury =
        await FamilyTreasury.findById(
            treasuryId
        );

    if (!treasury) {

        throw new Error(
            "Treasury not found."
        );

    }

    const [

        contributionTotal,

        expenseTotal,

        investmentTotal,

        outstandingDebt,

        activeInsurance,

        activeGoals,

        buckets,

    ] = await Promise.all([

        Contribution.aggregate([

            {

                $match: {

                    family:
                        new mongoose.Types.ObjectId(
                            familyId
                        ),

                    treasury:
                        new mongoose.Types.ObjectId(
                            treasuryId
                        ),

                },

            },

            {

                $group: {

                    _id: null,

                    total: {
                        $sum: "$amount",
                    },

                },

            },

        ]),

        FamilyTransaction.aggregate([

            {

                $match: {

                    family:
                        new mongoose.Types.ObjectId(
                            familyId
                        ),

                    treasury:
                        new mongoose.Types.ObjectId(
                            treasuryId
                        ),

                    type: "Expense",

                },

            },

            {

                $group: {

                    _id: null,

                    total: {
                        $sum: "$amount",
                    },

                },

            },

        ]),

        FamilyInvestment.aggregate([

            {

                $match: {

                    family:
                        new mongoose.Types.ObjectId(
                            familyId
                        ),

                    treasury:
                        new mongoose.Types.ObjectId(
                            treasuryId
                        ),

                },

            },

            {

                $group: {

                    _id: null,

                    total: {
                        $sum: "$amount",
                    },

                },

            },

        ]),

        FamilyLoan.aggregate([

            {

                $match: {

                    family:
                        new mongoose.Types.ObjectId(
                            familyId
                        ),

                    treasury:
                        new mongoose.Types.ObjectId(
                            treasuryId
                        ),

                    status: {
                        $nin: [
                            "Paid",
                            "Cancelled",
                        ],
                    },

                },

            },

            {

                $group: {

                    _id: null,

                    total: {
                        $sum: "$remainingAmount",
                    },

                },

            },

        ]),

        FamilyInsurance.countDocuments({

            family: familyId,

            treasury: treasuryId,

            status: "Active",

        }),

        FamilyGoal.countDocuments({

            family: familyId,

            treasury: treasuryId,

            status: "Active",

        }),

        TreasuryBucket.find({

            family: familyId,

            treasury: treasuryId,

            isActive: true,

        }).select(

            "name balance color icon"

        ),

    ]);

    const contributions =
        contributionTotal[0]?.total || 0;

    const expenses =
        expenseTotal[0]?.total || 0;

    const investments =
        investmentTotal[0]?.total || 0;

    const debt =
        outstandingDebt[0]?.total || 0;

    return {

        treasury: {

            totalBalance:
                treasury.totalBalance,

            availableBalance:
                treasury.availableBalance,

        },

        contributions,

        expenses,

        investments,

        outstandingDebt:
            debt,

        activeInsurance,

        activeGoals,

        buckets,

    };

};

// ============================================
// Contribution Trend
// ============================================

export const getContributionTrendService =
async (
    familyId,
    treasuryId
) => {

    return await Contribution.aggregate([

        {

            $match: {

                family:
                    new mongoose.Types.ObjectId(
                        familyId
                    ),

                treasury:
                    new mongoose.Types.ObjectId(
                        treasuryId
                    ),

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

                total: {
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

    ]);

};

// ============================================
// Expense Breakdown
// ============================================

export const getFamilyExpenseBreakdownService =
async (
    familyId,
    treasuryId
) => {

    return await FamilyTransaction.aggregate([

        {

            $match: {

                family:
                    new mongoose.Types.ObjectId(
                        familyId
                    ),

                treasury:
                    new mongoose.Types.ObjectId(
                        treasuryId
                    ),

                type: "Expense",

            },

        },

        {

            $group: {

                _id: "$category",

                total: {
                    $sum: "$amount",
                },

            },

        },

        {

            $sort: {

                total: -1,

            },

        },

    ]);

};

// ============================================
// Treasury Growth
// ============================================

export const getTreasuryGrowthService =
async (
    familyId,
    treasuryId
) => {

    return await TreasuryLedger.aggregate([

        {

            $match: {

                family:
                    new mongoose.Types.ObjectId(
                        familyId
                    ),

                treasury:
                    new mongoose.Types.ObjectId(
                        treasuryId
                    ),

            },

        },

        {

            $project: {

                date: "$createdAt",

                balance:
                    "$balanceAfterTransaction",

            },

        },

        {

            $sort: {

                date: 1,

            },

        },

    ]);

};

// ============================================
// Goal Progress
// ============================================

export const getFamilyGoalProgressService =
async (
    familyId,
    treasuryId
) => {

    return await FamilyGoal.find({

        family: familyId,

        treasury: treasuryId,

    })

        .select(

            "name targetAmount currentAmount targetDate status"

        )

        .sort({

            targetDate: 1,

        });

};

// ============================================
// Investment Allocation
// ============================================

export const getFamilyInvestmentAllocationService =
async (
    familyId,
    treasuryId
) => {

    return await FamilyInvestment.aggregate([

        {

            $match: {

                family:
                    new mongoose.Types.ObjectId(
                        familyId
                    ),

                treasury:
                    new mongoose.Types.ObjectId(
                        treasuryId
                    ),

            },

        },

        {

            $group: {

                _id: "$type",

                total: {
                    $sum: "$amount",
                },

            },

        },

        {

            $sort: {

                total: -1,

            },

        },

    ]);

};

// ============================================
// Debt Analysis
// ============================================

export const getFamilyDebtAnalysisService =
async (
    familyId,
    treasuryId
) => {

    return await FamilyLoan.find({

        family: familyId,

        treasury: treasuryId,

    })

        .select(

            "name loanType originalAmount remainingAmount status"

        )

        .sort({

            remainingAmount: -1,

        });

};