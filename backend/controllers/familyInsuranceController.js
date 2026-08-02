import {
    createFamilyInsuranceService,
    getFamilyInsurancePoliciesService,
    getFamilyInsurancePolicyService,
    updateFamilyInsuranceService,
    deleteFamilyInsuranceService,
} from "../services/family/familyInsurance.service.js";

// ============================================
// Create Insurance
// ============================================

export const createFamilyInsurance = async (
    req,
    res
) => {

    try {

        const insurance =
            await createFamilyInsuranceService({

                ...req.body,

                family: req.params.familyId,

                treasury: req.params.treasuryId,

                createdBy: req.user.id,

            });

        return res.status(201).json({

            success: true,

            message:
                "Insurance policy created successfully.",

            data: insurance,

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
// Get Insurance Policies
// ============================================

export const getFamilyInsurancePolicies =
async (
    req,
    res
) => {

    try {

        const policies =
            await getFamilyInsurancePoliciesService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data: policies,

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
// Get Insurance Policy
// ============================================

export const getFamilyInsurancePolicy =
async (
    req,
    res
) => {

    try {

        const policy =
            await getFamilyInsurancePolicyService(

                req.params.policyId

            );

        return res.json({

            success: true,

            data: policy,

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
// Update Insurance
// ============================================

export const updateFamilyInsurance =
async (
    req,
    res
) => {

    try {

        const insurance =
            await updateFamilyInsuranceService(

                req.params.policyId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Insurance policy updated successfully.",

            data: insurance,

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
// Delete Insurance
// ============================================

export const deleteFamilyInsurance =
async (
    req,
    res
) => {

    try {

        const result =
            await deleteFamilyInsuranceService(

                req.params.policyId

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