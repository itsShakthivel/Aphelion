import FamilyInsurance from "../../models/FamilyInsurance.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Insurance
// ============================================

export const createFamilyInsuranceService =
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

    if (
        treasury.availableBalance <
        data.premiumAmount
    ) {

        throw new Error(
            "Insufficient treasury balance."
        );

    }

    treasury.availableBalance -=
        data.premiumAmount;

    treasury.totalBalance -=
        data.premiumAmount;

    await treasury.save();

    const insurance =
        await FamilyInsurance.create({

            ...data,

        });

    await TreasuryLedger.create({

        treasury:
            treasury._id,

        family:
            data.family,

        type:
            "Insurance",

        transactionType:
            "Debit",

        amount:
            data.premiumAmount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            insurance._id,

        notes:
            data.notes,

        createdBy:
            data.createdBy,

    });

    return insurance;

};

// ============================================
// Get Insurance Policies
// ============================================

export const getFamilyInsurancePoliciesService =
async (
    treasuryId
) => {

    return await FamilyInsurance.find({

        treasury: treasuryId,

    })

        .populate(

            "createdBy",

            "name email"

        )

        .sort({

            renewalDate: 1,

        });

};

// ============================================
// Get Insurance Policy
// ============================================

export const getFamilyInsurancePolicyService =
async (
    policyId
) => {

    const policy =
        await FamilyInsurance.findById(
            policyId
        ).populate(
            "createdBy",
            "name email"
        );

    if (!policy) {

        throw new Error(
            "Insurance policy not found."
        );

    }

    return policy;

};

// ============================================
// Update Insurance
// ============================================

export const updateFamilyInsuranceService =
async (
    policyId,
    data
) => {

    const policy =
        await FamilyInsurance.findById(
            policyId
        );

    if (!policy) {

        throw new Error(
            "Insurance policy not found."
        );

    }

    if (data.policyName !== undefined)
        policy.policyName =
            data.policyName;

    if (data.provider !== undefined)
        policy.provider =
            data.provider;

    if (data.insuranceType !== undefined)
        policy.insuranceType =
            data.insuranceType;

    if (data.coverageAmount !== undefined)
        policy.coverageAmount =
            data.coverageAmount;

    if (data.premiumAmount !== undefined)
        policy.premiumAmount =
            data.premiumAmount;

    if (data.renewalDate !== undefined)
        policy.renewalDate =
            data.renewalDate;

    if (data.status !== undefined)
        policy.status =
            data.status;

    if (data.notes !== undefined)
        policy.notes =
            data.notes;

    await policy.save();

    return policy;

};

// ============================================
// Delete Insurance
// ============================================

export const deleteFamilyInsuranceService =
async (
    policyId
) => {

    const policy =
        await FamilyInsurance.findById(
            policyId
        );

    if (!policy) {

        throw new Error(
            "Insurance policy not found."
        );

    }

    await policy.deleteOne();

    return {

        success: true,

        message:
            "Insurance policy deleted successfully.",

    };

};