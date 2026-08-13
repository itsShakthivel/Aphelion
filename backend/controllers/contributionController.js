import {
    createContributionService,
    getContributionsService,
    getContributionService,
    updateContributionService,
    deleteContributionService,
} from "../services/family/contribution.service.js";

import {
    notifyFamilyContribution,
} from "../services/notification/familyNotification.service.js";

// ============================================
// Create Contribution
// ============================================

export const createContribution = async (
    req,
    res
) => {

    try {

        const contribution =
            await createContributionService({

                ...req.body,

                family:
                    req.params.familyId,

                treasury:
                    req.params.treasuryId,

                createdBy:
                    req.user.id,

            });

        // ========================================
        // Household Notification
        // ========================================

        let contributorName =
            req.user.name ||
            "A family member";

        let contributorId =
            req.user.id;

        if (
            contribution.contributor
        ) {

            contributorName =
                contribution
                    .contributor
                    .name ||
                contributorName;

            contributorId =
                contribution
                    .contributor
                    ._id ||
                contributorId;

        }

        await notifyFamilyContribution(

            req.params.familyId,

            contributorName,

            contribution.amount,

            contributorId

        );

        return res.status(201).json({

            success: true,

            message:
                "Contribution added successfully.",

            data:
                contribution,

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
// Get Contributions
// ============================================

export const getContributions = async (
    req,
    res
) => {

    try {

        const contributions =
            await getContributionsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data:
                contributions,

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
// Get Contribution
// ============================================

export const getContribution = async (
    req,
    res
) => {

    try {

        const contribution =
            await getContributionService(

                req.params.contributionId

            );

        return res.json({

            success: true,

            data:
                contribution,

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
// Update Contribution
// ============================================

export const updateContribution = async (
    req,
    res
) => {

    try {

        const contribution =
            await updateContributionService(

                req.params.contributionId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Contribution updated successfully.",

            data:
                contribution,

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
// Delete Contribution
// ============================================

export const deleteContribution = async (
    req,
    res
) => {

    try {

        const result =
            await deleteContributionService(

                req.params.contributionId

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