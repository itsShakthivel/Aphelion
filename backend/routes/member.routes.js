import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

    requireAdmin,

    requireOwner,

} from "../middleware/familyPermissionMiddleware.js";

import {

    createManagedMember,

    getManagedMembers,

    getManagedMember,

    updateManagedMember,

    archiveManagedMember,

    claimManagedMember,

    leaveHousehold,

    transferOwnership,

} from "../controllers/memberController.js";

const router = express.Router();

router.post(

    "/:familyId",

    protect,

    requireAdmin,

    createManagedMember

);

router.get(

    "/:familyId",

    protect,

    getManagedMembers

);

router.get(

    "/details/:memberId",

    protect,

    getManagedMember

);

router.put(

    "/:memberId",

    protect,

    requireAdmin,

    updateManagedMember

);

router.put(

    "/claim/:memberId",

    protect,

    claimManagedMember

);

router.put(

    "/:familyId/transfer-ownership",

    protect,

    requireOwner,

    transferOwnership

);

router.delete(

    "/:memberId",

    protect,

    requireAdmin,

    archiveManagedMember

);

router.delete(

    "/:familyId/leave",

    protect,

    leaveHousehold

);

export default router;