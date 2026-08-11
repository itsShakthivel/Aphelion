import {
    createTreasuryRequestService,
    getTreasuryRequestsService,
    getTreasuryRequestService,
    approveTreasuryRequestService,
    rejectTreasuryRequestService,
} from "../services/family/treasuryRequest.service.js";

// ============================================
// Create Request
// ============================================

export const createTreasuryRequest = async (

    req,

    res

) => {

    try {

        const request =
            await createTreasuryRequestService({

                family:
                    req.params.familyId,

                treasury:
                    req.params.treasuryId,

                requester:
                    req.user.id,

                amount:
                    req.body.amount,

                purpose:
                    req.body.purpose,

                category:
                    req.body.category,

                notes:
                    req.body.notes,

            });

        return res.status(201).json({

            success: true,

            message:
                "Treasury request created successfully.",

            data:
                request,

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
// Get Requests
// ============================================

export const getTreasuryRequests = async (

    req,

    res

) => {

    try {

        const requests =
            await getTreasuryRequestsService(

                req.params.treasuryId

            );

        return res.json({

            success: true,

            data:
                requests,

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
// Get Request
// ============================================

export const getTreasuryRequest = async (

    req,

    res

) => {

    try {

        const request =
            await getTreasuryRequestService(

                req.params.requestId

            );

        return res.json({

            success: true,

            data:
                request,

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
// Approve Request
// ============================================

export const approveTreasuryRequest = async (

    req,

    res

) => {

    try {

        const request =
            await approveTreasuryRequestService(

                req.params.requestId,

                req.user.id

            );

        return res.json({

            success: true,

            message:
                "Treasury request approved successfully.",

            data:
                request,

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
// Reject Request
// ============================================

export const rejectTreasuryRequest = async (

    req,

    res

) => {

    try {

        const request =
            await rejectTreasuryRequestService(

                req.params.requestId,

                req.user.id,

                req.body.rejectionReason

            );

        return res.json({

            success: true,

            message:
                "Treasury request rejected successfully.",

            data:
                request,

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