import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createContribution,

    getContributions,

    getContribution,

    updateContribution,

    deleteContribution,

} from "../controllers/contributionController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Contributions
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createContribution

);

router.get(

    "/:treasuryId",

    getContributions

);

router.get(

    "/details/:contributionId",

    getContribution

);

router.put(

    "/:contributionId",

    requireAdmin,

    updateContribution

);

router.delete(

    "/:contributionId",

    requireAdmin,

    deleteContribution

);

export default router;