import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createFamilyGoal,

    getFamilyGoals,

    getFamilyGoal,

    updateFamilyGoal,

    deleteFamilyGoal,

} from "../controllers/familyGoalController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Family Goals
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createFamilyGoal

);

router.get(

    "/:treasuryId",

    getFamilyGoals

);

router.get(

    "/details/:goalId",

    getFamilyGoal

);

router.put(

    "/:goalId",

    requireAdmin,

    updateFamilyGoal

);

router.delete(

    "/:goalId",

    requireAdmin,

    deleteFamilyGoal

);

export default router;