import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireOwner,
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {
    createFamily,
    getFamily,
    updateFamily,
    deleteFamily,
    sendInvitation,
    getPendingInvitations,
    acceptInvitation,
    rejectInvitation,
    removeMember,
    updateMemberRole,
} from "../controllers/familyController.js";

const router = express.Router();

// ============================================
// Authentication Middleware
// ============================================

router.use(protect);

// ============================================
// Family
// ============================================

router.post(
    "/",
    createFamily
);

router.get(
    "/",
    getFamily
);

router.put(
    "/:id",
    requireOwner,
    updateFamily
);

router.delete(
    "/:id",
    requireOwner,
    deleteFamily
);

// ============================================
// Invitations
// ============================================

router.post(
    "/invite",
    requireAdmin,
    sendInvitation
);

router.get(
    "/invitations",
    getPendingInvitations
);

router.put(
    "/invite/:id/accept",
    acceptInvitation
);

router.put(
    "/invite/:id/reject",
    rejectInvitation
);

// ============================================
// Registered Members
// ============================================

router.delete(
    "/:familyId/member/:memberId",
    requireAdmin,
    removeMember
);

router.put(
    "/:familyId/member/:memberId",
    requireOwner,
    updateMemberRole
);

export default router;