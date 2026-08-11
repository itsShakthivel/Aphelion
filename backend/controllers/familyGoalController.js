import {
    createFamilyGoalService,
    getFamilyGoalsService,
    getFamilyGoalService,
    updateFamilyGoalService,
    deleteFamilyGoalService,
} from "../services/family/familyGoal.service.js";

// ============================================
// Create Goal
// ============================================

export const createFamilyGoal = async (
    req,
    res
) => {

    try {

        const goal =
            await createFamilyGoalService({

                ...req.body,

                family:
                    req.params.familyId,

                treasury:
                    req.params.treasuryId,

                createdBy:
                    req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Family goal created successfully.",

            data: goal,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Goals
// ============================================

export const getFamilyGoals = async (
    req,
    res
) => {

    try {

        const goals =
            await getFamilyGoalsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: goals,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Goal
// ============================================

export const getFamilyGoal = async (
    req,
    res
) => {

    try {

        const goal =
            await getFamilyGoalService(

                req.params.goalId

            );

        return res.json({

            success: true,

            data: goal,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Update Goal
// ============================================

export const updateFamilyGoal = async (
    req,
    res
) => {

    try {

        const goal =
            await updateFamilyGoalService(

                req.params.goalId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Family goal updated successfully.",

            data: goal,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Delete Goal
// ============================================

export const deleteFamilyGoal = async (
    req,
    res
) => {

    try {

        const result =
            await deleteFamilyGoalService(

                req.params.goalId

            );

        return res.json(result);

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};