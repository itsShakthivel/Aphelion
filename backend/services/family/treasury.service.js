import Family from "../../models/Family.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";

// ============================================
// Create Treasury
// ============================================

export const createTreasuryService = async (
    familyId
) => {

    const family = await Family.findById(
        familyId
    );

    if (!family) {
        throw new Error(
            "Household not found."
        );
    }

    const existingTreasury =
        await FamilyTreasury.findOne({

            family: familyId,

            isArchived: false,

        });

    if (existingTreasury) {
        throw new Error(
            "Treasury already exists."
        );
    }

    const treasury =
        await FamilyTreasury.create({

            family: familyId,

        });

    return treasury;

};

// ============================================
// Get Treasury
// ============================================

export const getTreasuryService = async (
    familyId
) => {

    const treasury =
        await FamilyTreasury.findOne({

            family: familyId,

            isArchived: false,

        });

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    return treasury;

};

// ============================================
// Update Treasury
// ============================================

export const updateTreasuryService = async (
    treasuryId,
    data
) => {

    const treasury =
        await FamilyTreasury.findById(
            treasuryId
        );

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    if (data.currency !== undefined)
        treasury.currency = data.currency;

    await treasury.save();

    return treasury;

};

// ============================================
// Archive Treasury
// ============================================

export const archiveTreasuryService =
async (
    treasuryId
) => {

    const treasury =
        await FamilyTreasury.findById(
            treasuryId
        );

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    treasury.isActive = false;

    treasury.isArchived = true;

    await treasury.save();

    return {
        success: true,
        message:
            "Treasury archived successfully.",
    };

};

// ============================================
// Create Bucket
// ============================================

export const createBucketService =
async (
    treasuryId,
    familyId,
    userId,
    data
) => {

    const treasury =
        await FamilyTreasury.findById(
            treasuryId
        );

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    const existingBucket =
        await TreasuryBucket.findOne({

            treasury: treasuryId,

            name: data.name,

            isArchived: false,

        });

    if (existingBucket) {
        throw new Error(
            "Bucket already exists."
        );
    }

    const bucket =
        await TreasuryBucket.create({

            treasury: treasuryId,

            family: familyId,

            createdBy: userId,

            ...data,

        });

    return bucket;

};

// ============================================
// Get Buckets
// ============================================

export const getBucketsService =
async (
    treasuryId
) => {

    return await TreasuryBucket.find({

        treasury: treasuryId,

        isArchived: false,

    }).sort({

        displayOrder: 1,

        createdAt: 1,

    });

};

// ============================================
// Get Bucket
// ============================================

export const getBucketService =
async (
    bucketId
) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        );

    if (!bucket) {
        throw new Error(
            "Bucket not found."
        );
    }

    return bucket;

};

// ============================================
// Update Bucket
// ============================================

export const updateBucketService =
async (
    bucketId,
    data
) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        );

    if (!bucket) {
        throw new Error(
            "Bucket not found."
        );
    }

    if (data.name !== undefined)
        bucket.name = data.name;

    if (data.description !== undefined)
        bucket.description =
            data.description;

    if (data.color !== undefined)
        bucket.color = data.color;

    if (data.icon !== undefined)
        bucket.icon = data.icon;

    if (data.type !== undefined)
        bucket.type = data.type;

    if (data.displayOrder !== undefined)
        bucket.displayOrder =
            data.displayOrder;

    await bucket.save();

    return bucket;

};

// ============================================
// Archive Bucket
// ============================================

export const archiveBucketService =
async (
    bucketId
) => {

    const bucket =
        await TreasuryBucket.findById(
            bucketId
        );

    if (!bucket) {
        throw new Error(
            "Bucket not found."
        );
    }

    bucket.isArchived = true;

    await bucket.save();

    return {
        success: true,
        message:
            "Bucket archived successfully.",
    };

};