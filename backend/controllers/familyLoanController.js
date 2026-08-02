import {
    createFamilyLoanService,
    getFamilyLoansService,
    getFamilyLoanService,
    updateFamilyLoanService,
    deleteFamilyLoanService,
} from "../services/family/familyLoan.service.js";

// ============================================
// Create Loan
// ============================================

export const createFamilyLoan = async (
    req,
    res
) => {

    try {

        const loan =
            await createFamilyLoanService({

                ...req.body,

                family: req.params.familyId,

                treasury: req.params.treasuryId,

                createdBy: req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Loan created successfully.",

            data: loan,

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
// Get Loans
// ============================================

export const getFamilyLoans = async (
    req,
    res
) => {

    try {

        const loans =
            await getFamilyLoansService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: loans,

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
// Get Loan
// ============================================

export const getFamilyLoan = async (
    req,
    res
) => {

    try {

        const loan =
            await getFamilyLoanService(

                req.params.loanId

            );

        return res.json({

            success: true,

            data: loan,

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
// Update Loan
// ============================================

export const updateFamilyLoan = async (
    req,
    res
) => {

    try {

        const loan =
            await updateFamilyLoanService(

                req.params.loanId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Loan updated successfully.",

            data: loan,

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
// Delete Loan
// ============================================

export const deleteFamilyLoan = async (
    req,
    res
) => {

    try {

        const result =
            await deleteFamilyLoanService(

                req.params.loanId

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