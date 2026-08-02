import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createFamilyInsurance,

    getFamilyInsurancePolicies,

    getFamilyInsurancePolicy,

    updateFamilyInsurance,

    deleteFamilyInsurance,

} from "../controllers/familyInsuranceController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Insurance
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createFamilyInsurance

);

router.get(

    "/:treasuryId",

    getFamilyInsurancePolicies

);

router.get(

    "/details/:policyId",

    getFamilyInsurancePolicy

);

router.put(

    "/:policyId",

    requireAdmin,

    updateFamilyInsurance

);

router.delete(

    "/:policyId",

    requireAdmin,

    deleteFamilyInsurance

);

export default router;