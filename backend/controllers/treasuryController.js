import {
    createTreasuryService,
    getTreasuryService,
    updateTreasuryService,
    archiveTreasuryService,
    createBucketService,
    getBucketsService,
    getBucketService,
    updateBucketService,
    archiveBucketService,
} from "../services/family/treasury.service.js";

// ============================================
// Create Treasury
// ============================================

export const createTreasury = async (req, res) => {

    try {

        const treasury =
            await createTreasuryService(
                req.params.familyId
            );

        return res.status(201).json({

            success: true,

            message:
                "Treasury created successfully.",

            data: treasury,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Treasury
// ============================================

export const getTreasury = async (req, res) => {

    try {

        const treasury =
            await getTreasuryService(
                req.params.familyId
            );

        return res.json({

            success: true,

            data: treasury,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Update Treasury
// ============================================

export const updateTreasury = async (req, res) => {

    try {

        const treasury =
            await updateTreasuryService(

                req.params.treasuryId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Treasury updated successfully.",

            data: treasury,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Archive Treasury
// ============================================

export const archiveTreasury = async (req, res) => {

    try {

        const result =
            await archiveTreasuryService(

                req.params.treasuryId

            );

        return res.json(result);

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Create Bucket
// ============================================

export const createBucket = async (req, res) => {

    try {

        const bucket =
            await createBucketService(

                req.params.treasuryId,

                req.params.familyId,

                req.user.id,

                req.body

            );

        return res.status(201).json({

            success: true,

            message:
                "Bucket created successfully.",

            data: bucket,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Buckets
// ============================================

export const getBuckets = async (req, res) => {

    try {

        const buckets =
            await getBucketsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: buckets,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Get Bucket
// ============================================

export const getBucket = async (req, res) => {

    try {

        const bucket =
            await getBucketService(

                req.params.bucketId

            );

        return res.json({

            success: true,

            data: bucket,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Update Bucket
// ============================================

export const updateBucket = async (req, res) => {

    try {

        const bucket =
            await updateBucketService(

                req.params.bucketId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Bucket updated successfully.",

            data: bucket,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Archive Bucket
// ============================================

export const archiveBucket = async (req, res) => {

    try {

        const result =
            await archiveBucketService(

                req.params.bucketId

            );

        return res.json(result);

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};