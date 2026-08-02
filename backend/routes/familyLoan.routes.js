import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createFamilyLoan,

    getFamilyLoans,

    getFamilyLoan,

    updateFamilyLoan,

    deleteFamilyLoan,

} from "../controllers/familyLoanController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Loans
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createFamilyLoan

);

router.get(

    "/:treasuryId",

    getFamilyLoans

);

router.get(

    "/details/:loanId",

    getFamilyLoan

);

router.put(

    "/:loanId",

    requireAdmin,

    updateFamilyLoan

);

router.delete(

    "/:loanId",

    requireAdmin,

    deleteFamilyLoan

);

export default router;