import {
    createFamilyInvestmentService,
    getFamilyInvestmentsService,
    getFamilyInvestmentService,
    updateFamilyInvestmentService,
    deleteFamilyInvestmentService,
} from "../services/family/familyInvestment.service.js";

// ============================================
// Create Investment
// ============================================

export const createFamilyInvestment = async (
    req,
    res
) => {

    try {

        const investment =
            await createFamilyInvestmentService({

                ...req.body,

                family: req.params.familyId,

                treasury: req.params.treasuryId,

                createdBy: req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Investment created successfully.",

            data: investment,

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
// Get Investments
// ============================================

export const getFamilyInvestments = async (
    req,
    res
) => {

    try {

        const investments =
            await getFamilyInvestmentsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: investments,

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
// Get Investment
// ============================================

export const getFamilyInvestment = async (
    req,
    res
) => {

    try {

        const investment =
            await getFamilyInvestmentService(

                req.params.investmentId

            );

        return res.json({

            success: true,

            data: investment,

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
// Update Investment
// ============================================

export const updateFamilyInvestment = async (
    req,
    res
) => {

    try {

        const investment =
            await updateFamilyInvestmentService(

                req.params.investmentId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Investment updated successfully.",

            data: investment,

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
// Delete Investment
// ============================================

export const deleteFamilyInvestment = async (
    req,
    res
) => {

    try {

        const result =
            await deleteFamilyInvestmentService(

                req.params.investmentId

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