import express from "express";

import protect from "../middleware/authMiddleware.js";

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
// Family
// ============================================

router.post(

    "/",

    protect,

    createFamily

);

router.get(

    "/",

    protect,

    getFamily

);

router.put(

    "/:id",

    protect,

    updateFamily

);

router.delete(

    "/:id",

    protect,

    deleteFamily

);

// ============================================
// Invitations
// ============================================

router.post(

    "/invite",

    protect,

    sendInvitation

);

router.get(

    "/invitations",

    protect,

    getPendingInvitations

);

router.put(

    "/invite/:id/accept",

    protect,

    acceptInvitation

);

router.put(

    "/invite/:id/reject",

    protect,

    rejectInvitation

);

// ============================================
// Members
// ============================================

router.delete(

    "/:familyId/member/:memberId",

    protect,

    removeMember

);

router.put(

    "/:familyId/member/:memberId",

    protect,

    updateMemberRole

);

export default router;