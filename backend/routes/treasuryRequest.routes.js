import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createTreasuryRequest,

    getTreasuryRequests,

    getTreasuryRequest,

    approveTreasuryRequest,

    rejectTreasuryRequest,

} from "../controllers/treasuryRequestController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Create Request
// ============================================

router.post(

    "/:familyId/:treasuryId",

    createTreasuryRequest

);

// ============================================
// Get Requests
// ============================================

router.get(

    "/:treasuryId",

    getTreasuryRequests

);

// ============================================
// Get Request
// ============================================

router.get(

    "/details/:requestId",

    getTreasuryRequest

);

// ============================================
// Approve Request
// ============================================

router.put(

    "/:requestId/approve",

    requireAdmin,

    approveTreasuryRequest

);

// ============================================
// Reject Request
// ============================================

router.put(

    "/:requestId/reject",

    requireAdmin,

    rejectTreasuryRequest

);

export default router;