import Contribution from "../../models/Contribution.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";
import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Contribution
// ============================================

export const createContributionService = async (
    data
) => {

    const treasury = await FamilyTreasury.findById(
        data.treasury
    );

    if (!treasury) {
        throw new Error(
            "Treasury not found."
        );
    }

    let bucket = null;

    if (data.bucket) {

        bucket = await TreasuryBucket.findById(
            data.bucket
        );

        if (!bucket) {
            throw new Error(
                "Bucket not found."
            );
        }

    }

    const contribution =
        await Contribution.create({

            family: data.family,

            treasury: data.treasury,

            contributor: data.contributor,

            managedMember: data.managedMember,

            bucket: data.bucket || null,

            amount: data.amount,

            category: data.category,

            recurring: data.recurring,

            notes: data.notes,

            contributedAt:
                data.contributedAt,

            createdBy: data.createdBy,

        });

    treasury.totalBalance += data.amount;

    if (bucket) {

        bucket.balance += data.amount;

        await bucket.save();

    }
    else {

        treasury.availableBalance +=
            data.amount;

    }

    await treasury.save();

    await TreasuryLedger.create({

        treasury: treasury._id,

        family: data.family,

        bucket: bucket?._id || null,

        type: "Contribution",

        transactionType: "Credit",

        amount: data.amount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            contribution._id,

        notes:
            data.notes || "",

        createdBy:
            data.createdBy,

    });

    return contribution.populate([
        {
            path: "contributor",
            select: "name email",
        },
        {
            path: "managedMember",
            select: "name relationship",
        },
        {
            path: "bucket",
            select: "name color icon",
        },
    ]);

};

// ============================================
// Get Contributions
// ============================================

export const getContributionsService =
async (
    treasuryId
) => {

    return await Contribution.find({

        treasury: treasuryId,

    })

        .populate(
            "contributor",
            "name email"
        )

        .populate(
            "managedMember",
            "name relationship"
        )

        .populate(
            "bucket",
            "name color icon"
        )

        .sort({

            contributedAt: -1,

        });

};

// ============================================
// Get Contribution
// ============================================

export const getContributionService =
async (
    contributionId
) => {

    const contribution =
        await Contribution.findById(
            contributionId
        )

            .populate(
                "contributor",
                "name email"
            )

            .populate(
                "managedMember",
                "name relationship"
            )

            .populate(
                "bucket",
                "name color icon"
            );

    if (!contribution) {

        throw new Error(
            "Contribution not found."
        );

    }

    return contribution;

};

// ============================================
// Update Contribution
// ============================================

export const updateContributionService =
async (
    contributionId,
    data
) => {

    const contribution =
        await Contribution.findById(
            contributionId
        );

    if (!contribution) {

        throw new Error(
            "Contribution not found."
        );

    }

    if (data.category !== undefined)
        contribution.category =
            data.category;

    if (data.notes !== undefined)
        contribution.notes =
            data.notes;

    if (data.recurring !== undefined)
        contribution.recurring =
            data.recurring;

    await contribution.save();

    return contribution;

};

// ============================================
// Delete Contribution
// ============================================

export const deleteContributionService =
async (
    contributionId
) => {

    const contribution =
        await Contribution.findById(
            contributionId
        );

    if (!contribution) {

        throw new Error(
            "Contribution not found."
        );

    }

    const treasury =
        await FamilyTreasury.findById(
            contribution.treasury
        );

    if (!treasury) {

        throw new Error(
            "Treasury not found."
        );

    }

    treasury.totalBalance -=
        contribution.amount;

    if (contribution.bucket) {

        const bucket =
            await TreasuryBucket.findById(
                contribution.bucket
            );

        if (bucket) {

            bucket.balance -=
                contribution.amount;

            await bucket.save();

        }

    }
    else {

        treasury.availableBalance -=
            contribution.amount;

    }

    await treasury.save();

    await TreasuryLedger.create({

        treasury: treasury._id,

        family: contribution.family,

        bucket:
            contribution.bucket,

        type: "Adjustment",

        transactionType: "Debit",

        amount:
            contribution.amount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            contribution._id,

        notes:
            "Contribution deleted.",

        createdBy:
            contribution.createdBy,

    });

    await contribution.deleteOne();

    return {

        success: true,

        message:
            "Contribution deleted successfully.",

    };

};