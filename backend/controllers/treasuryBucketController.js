import {
    createTreasuryBucketService,
    getTreasuryBucketsService,
    getTreasuryBucketService,
    updateTreasuryBucketService,
    archiveTreasuryBucketService,
} from "../services/family/treasuryBucket.service.js";

// ============================================
// Create Bucket
// ============================================

export const createTreasuryBucket = async (

    req,

    res

) => {

    try {

        const bucket =
            await createTreasuryBucketService({

                family:
                    req.params.familyId,

                treasury:
                    req.params.treasuryId,

                name:
                    req.body.name,

                description:
                    req.body.description,

                color:
                    req.body.color,

                icon:
                    req.body.icon,

                createdBy:
                    req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Treasury bucket created successfully.",

            data:
                bucket,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Get Buckets
// ============================================

export const getTreasuryBuckets = async (

    req,

    res

) => {

    try {

        const buckets =
            await getTreasuryBucketsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data:
                buckets,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Get Bucket
// ============================================

export const getTreasuryBucket = async (

    req,

    res

) => {

    try {

        const bucket =
            await getTreasuryBucketService(

                req.params.bucketId

            );

        return res.json({

            success: true,

            data:
                bucket,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Update Bucket
// ============================================

export const updateTreasuryBucket = async (

    req,

    res

) => {

    try {

        const bucket =
            await updateTreasuryBucketService(

                req.params.bucketId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Treasury bucket updated successfully.",

            data:
                bucket,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ============================================
// Archive Bucket
// ============================================

export const archiveTreasuryBucket = async (

    req,

    res

) => {

    try {

        const result =
            await archiveTreasuryBucketService(

                req.params.bucketId

            );

        return res.json(result);

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message:
                error.message,

        });

    }

};