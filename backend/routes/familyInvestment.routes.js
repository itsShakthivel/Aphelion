import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createFamilyInvestment,

    getFamilyInvestments,

    getFamilyInvestment,

    updateFamilyInvestment,

    deleteFamilyInvestment,

} from "../controllers/familyInvestmentController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Investments
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createFamilyInvestment

);

router.get(

    "/:treasuryId",

    getFamilyInvestments

);

router.get(

    "/details/:investmentId",

    getFamilyInvestment

);

router.put(

    "/:investmentId",

    requireAdmin,

    updateFamilyInvestment

);

router.delete(

    "/:investmentId",

    requireAdmin,

    deleteFamilyInvestment

);

export default router;