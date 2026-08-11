import FamilyGoal from "../../models/FamilyGoal.js";

import FamilyTreasury from "../../models/FamilyTreasury.js";

import TreasuryBucket from "../../models/TreasuryBucket.js";

import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Goal
// ============================================

export const createFamilyGoalService = async (

    data

) => {

    const treasury =
        await FamilyTreasury.findById(
            data.treasury
        );

    if (!treasury) {

        throw new Error(
            "Treasury not found."
        );

    }

    if (data.bucket) {

        const bucket =
            await TreasuryBucket.findById(
                data.bucket
            );

        if (!bucket) {

            throw new Error(
                "Bucket not found."
            );

        }

    }

    const goal =
        await FamilyGoal.create({

            ...data,

        });

    return goal;

};

// ============================================
// Get Goals
// ============================================

export const getFamilyGoalsService = async (

    treasuryId

) => {

    return await FamilyGoal.find({

        treasury: treasuryId,

    })

        .populate(

            "bucket",

            "name color icon"

        )

        .populate(

            "createdBy",

            "name email"

        )

        .sort({

            createdAt: -1,

        });

};

// ============================================
// Get Goal
// ============================================

export const getFamilyGoalService = async (

    goalId

) => {

    const goal =
        await FamilyGoal.findById(
            goalId
        )

            .populate(

                "bucket",

                "name color icon"

            )

            .populate(

                "createdBy",

                "name email"

            );

    if (!goal) {

        throw new Error(
            "Goal not found."
        );

    }

    return goal;

};

// ============================================
// Update Goal
// ============================================

export const updateFamilyGoalService = async (

    goalId,

    data

) => {

    const goal =
        await FamilyGoal.findById(
            goalId
        );

    if (!goal) {

        throw new Error(
            "Goal not found."
        );

    }

    if (data.name !== undefined)
        goal.name = data.name;

    if (data.description !== undefined)
        goal.description =
            data.description;

    if (data.targetAmount !== undefined)
        goal.targetAmount =
            data.targetAmount;

    if (data.targetDate !== undefined)
        goal.targetDate =
            data.targetDate;

    if (data.category !== undefined)
        goal.category =
            data.category;

    if (data.status !== undefined)
        goal.status =
            data.status;

    if (data.bucket !== undefined)
        goal.bucket =
            data.bucket || null;

    await goal.save();

    return goal;

};

// ============================================
// Delete Goal
// ============================================

export const deleteFamilyGoalService = async (

    goalId

) => {

    const goal =
        await FamilyGoal.findById(
            goalId
        );

    if (!goal) {

        throw new Error(
            "Goal not found."
        );

    }

    await goal.deleteOne();

    return {

        success: true,

        message:
            "Goal deleted successfully.",

    };

};