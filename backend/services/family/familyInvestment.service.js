import FamilyInvestment from "../../models/FamilyInvestment.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";
import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Investment
// ============================================

export const createFamilyInvestmentService =
async (
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

    let bucket = null;

    if (data.bucket) {

        bucket =
            await TreasuryBucket.findById(
                data.bucket
            );

        if (!bucket) {

            throw new Error(
                "Bucket not found."
            );

        }

        if (
            bucket.balance <
            data.investedAmount
        ) {

            throw new Error(
                "Insufficient bucket balance."
            );

        }

        bucket.balance -=
            data.investedAmount;

        await bucket.save();

    }
    else {

        if (
            treasury.availableBalance <
            data.investedAmount
        ) {

            throw new Error(
                "Insufficient treasury balance."
            );

        }

        treasury.availableBalance -=
            data.investedAmount;

    }

    treasury.totalBalance -=
        data.investedAmount;

    await treasury.save();

    const investment =
        await FamilyInvestment.create({

            ...data,

            currentValue:
                data.investedAmount,

        });

    await TreasuryLedger.create({

        treasury:
            treasury._id,

        family:
            data.family,

        bucket:
            data.bucket ||

            null,

        type:
            "Investment",

        transactionType:
            "Debit",

        amount:
            data.investedAmount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            investment._id,

        notes:
            data.notes,

        createdBy:
            data.createdBy,

    });

    return investment;

};

// ============================================
// Get Investments
// ============================================

export const getFamilyInvestmentsService =
async (
    treasuryId
) => {

    return await FamilyInvestment.find({

        treasury: treasuryId,

    })

        .populate(
            "bucket",
            "name color icon"
        )

        .populate(
            "createdBy",
            "name email"
        )

        .sort({

            investmentDate: -1,

        });

};

// ============================================
// Get Investment
// ============================================

export const getFamilyInvestmentService =
async (
    investmentId
) => {

    const investment =
        await FamilyInvestment.findById(
            investmentId
        )

            .populate(
                "bucket",
                "name color icon"
            )

            .populate(
                "createdBy",
                "name email"
            );

    if (!investment) {

        throw new Error(
            "Investment not found."
        );

    }

    return investment;

};

// ============================================
// Update Investment
// ============================================

export const updateFamilyInvestmentService =
async (
    investmentId,
    data
) => {

    const investment =
        await FamilyInvestment.findById(
            investmentId
        );

    if (!investment) {

        throw new Error(
            "Investment not found."
        );

    }

    if (data.investmentName !== undefined)
        investment.investmentName =
            data.investmentName;

    if (data.currentValue !== undefined)
        investment.currentValue =
            data.currentValue;

    if (data.notes !== undefined)
        investment.notes =
            data.notes;

    await investment.save();

    return investment;

};

// ============================================
// Delete Investment
// ============================================

export const deleteFamilyInvestmentService =
async (
    investmentId
) => {

    const investment =
        await FamilyInvestment.findById(
            investmentId
        );

    if (!investment) {

        throw new Error(
            "Investment not found."
        );

    }

    await investment.deleteOne();

    return {

        success: true,

        message:
            "Investment deleted successfully.",

    };

};