import FamilyLoan from "../../models/FamilyLoan.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Loan
// ============================================

export const createFamilyLoanService =
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

    const loan =
        await FamilyLoan.create({

            ...data,

            remainingAmount:
                data.originalAmount,

        });

    await TreasuryLedger.create({

        treasury:
            treasury._id,

        family:
            data.family,

        type:
            "Loan",

        transactionType:
            "Credit",

        amount:
            data.originalAmount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            loan._id,

        notes:
            data.notes,

        createdBy:
            data.createdBy,

    });

    return loan;

};

// ============================================
// Get Loans
// ============================================

export const getFamilyLoansService =
async (
    treasuryId
) => {

    return await FamilyLoan.find({

        treasury: treasuryId,

    })

        .populate(

            "createdBy",

            "name email"

        )

        .sort({

            createdAt: -1,

        });

};

// ============================================
// Get Loan
// ============================================

export const getFamilyLoanService =
async (
    loanId
) => {

    const loan =
        await FamilyLoan.findById(
            loanId
        );

    if (!loan) {

        throw new Error(
            "Loan not found."
        );

    }

    return loan;

};

// ============================================
// Update Loan
// ============================================

export const updateFamilyLoanService =
async (
    loanId,
    data
) => {

    const loan =
        await FamilyLoan.findById(
            loanId
        );

    if (!loan) {

        throw new Error(
            "Loan not found."
        );

    }

    if (data.remainingAmount !== undefined)
        loan.remainingAmount =
            data.remainingAmount;

    if (data.notes !== undefined)
        loan.notes =
            data.notes;

    await loan.save();

    return loan;

};

// ============================================
// Delete Loan
// ============================================

export const deleteFamilyLoanService =
async (
    loanId
) => {

    const loan =
        await FamilyLoan.findById(
            loanId
        );

    if (!loan) {

        throw new Error(
            "Loan not found."
        );

    }

    await loan.deleteOne();

    return {

        success: true,

        message:
            "Loan deleted successfully.",

    };

};