import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createTreasury,

    getTreasury,

    updateTreasury,

    archiveTreasury,

    createBucket,

    getBuckets,

    getBucket,

    updateBucket,

    archiveBucket,

} from "../controllers/treasuryController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Treasury
// ============================================

router.post(

    "/:familyId",

    requireAdmin,

    createTreasury

);

router.get(

    "/:familyId",

    getTreasury

);

router.put(

    "/:treasuryId",

    requireAdmin,

    updateTreasury

);

router.delete(

    "/:treasuryId",

    requireAdmin,

    archiveTreasury

);

// ============================================
// Buckets
// ============================================

router.post(

    "/:familyId/:treasuryId/buckets",

    requireAdmin,

    createBucket

);

router.get(

    "/:treasuryId/buckets",

    getBuckets

);

router.get(

    "/bucket/:bucketId",

    getBucket

);

router.put(

    "/bucket/:bucketId",

    requireAdmin,

    updateBucket

);

router.delete(

    "/bucket/:bucketId",

    requireAdmin,

    archiveBucket

);

export default router;