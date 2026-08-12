import TreasuryBucket from "../../models/TreasuryBucket.js";

import FamilyTreasury from "../../models/FamilyTreasury.js";

// ============================================
// Create Bucket
// ============================================

export const createTreasuryBucketService = async (

    data

) => {

    const treasury =
        await FamilyTreasury.findById(
            data.treasury
        );

    if (!treasury) {

        throw new Error(
            "Treasury not found."
        );

    }

    const existingBucket =
        await TreasuryBucket.findOne({

            treasury:
                data.treasury,

            name:
                data.name,

            isActive:
                true,

        });

    if (existingBucket) {

        throw new Error(
            "A bucket with this name already exists."
        );

    }

    const bucket =
        await TreasuryBucket.create({

            family:
                data.family,

            treasury:
                data.treasury,

            name:
                data.name,

            description:
                data.description,

            color:
                data.color,

            icon:
                data.icon,

            createdBy:
                data.createdBy,

        });

    return bucket;

};

// ============================================
// Get Buckets
// ============================================

export const getTreasuryBucketsService = async (

    treasuryId

) => {

    return await TreasuryBucket.find({

        treasury:
            treasuryId,

        isActive:
            true,

    })

        .populate(

            "createdBy",

            "name email"

        )

        .sort({

            createdAt: 1,

        });

};

// ============================================
// Get Bucket
// ============================================

export const getTreasuryBucketService = async (

    bucketId

) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        )

            .populate(

                "createdBy",

                "name email"

            );

    if (!bucket) {

        throw new Error(
            "Treasury bucket not found."
        );

    }

    return bucket;

};

// ============================================
// Update Bucket
// ============================================

export const updateTreasuryBucketService = async (

    bucketId,

    data

) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        );

    if (!bucket) {

        throw new Error(
            "Treasury bucket not found."
        );

    }

    if (data.name !== undefined) {

        const existingBucket =
            await TreasuryBucket.findOne({

                treasury:
                    bucket.treasury,

                name:
                    data.name,

                _id: {
                    $ne: bucketId,
                },

                isActive:
                    true,

            });

        if (existingBucket) {

            throw new Error(
                "A bucket with this name already exists."
            );

        }

        bucket.name =
            data.name;

    }

    if (data.description !== undefined) {

        bucket.description =
            data.description;

    }

    if (data.color !== undefined) {

        bucket.color =
            data.color;

    }

    if (data.icon !== undefined) {

        bucket.icon =
            data.icon;

    }

    await bucket.save();

    return bucket;

};

// ============================================
// Archive Bucket
// ============================================

export const archiveTreasuryBucketService = async (

    bucketId

) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        );

    if (!bucket) {

        throw new Error(
            "Treasury bucket not found."
        );

    }

    if (bucket.balance > 0) {

        throw new Error(

            "Bucket cannot be archived while it has a balance."

        );

    }

    bucket.isActive = false;

    await bucket.save();

    return {

        success: true,

        message:
            "Treasury bucket archived successfully.",

    };

};