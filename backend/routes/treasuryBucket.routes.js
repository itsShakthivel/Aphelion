import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createTreasuryBucket,

    getTreasuryBuckets,

    getTreasuryBucket,

    updateTreasuryBucket,

    archiveTreasuryBucket,

} from "../controllers/treasuryBucketController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Create Bucket
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createTreasuryBucket

);

// ============================================
// Get Buckets
// ============================================

router.get(

    "/:treasuryId",

    getTreasuryBuckets

);

// ============================================
// Get Bucket
// ============================================

router.get(

    "/details/:bucketId",

    getTreasuryBucket

);

// ============================================
// Update Bucket
// ============================================

router.put(

    "/:bucketId",

    requireAdmin,

    updateTreasuryBucket

);

// ============================================
// Archive Bucket
// ============================================

router.delete(

    "/:bucketId",

    requireAdmin,

    archiveTreasuryBucket

);

export default router;