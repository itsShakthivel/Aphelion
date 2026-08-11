import TreasuryRequest from "../../models/TreasuryRequest.js";

import FamilyTreasury from "../../models/FamilyTreasury.js";

import TreasuryLedger from "../../models/TreasuryLedger.js";

// ============================================
// Create Request
// ============================================

export const createTreasuryRequestService = async (

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

    const request =
        await TreasuryRequest.create({

            family:
                data.family,

            treasury:
                data.treasury,

            requester:
                data.requester,

            amount:
                data.amount,

            purpose:
                data.purpose,

            category:
                data.category,

            notes:
                data.notes,

        });

    return request;

};

// ============================================
// Get Requests
// ============================================

export const getTreasuryRequestsService = async (

    treasuryId

) => {

    return await TreasuryRequest.find({

        treasury: treasuryId,

    })

        .populate(

            "requester",

            "name email avatar"

        )

        .populate(

            "reviewedBy",

            "name email"

        )

        .sort({

            createdAt: -1,

        });

};

// ============================================
// Get Request
// ============================================

export const getTreasuryRequestService = async (

    requestId

) => {

    const request =
        await TreasuryRequest.findById(
            requestId
        )

            .populate(

                "requester",

                "name email avatar"

            )

            .populate(

                "reviewedBy",

                "name email"

            );

    if (!request) {

        throw new Error(
            "Treasury request not found."
        );

    }

    return request;

};

// ============================================
// Approve Request
// ============================================

export const approveTreasuryRequestService = async (

    requestId,

    userId

) => {

    const request =
        await TreasuryRequest.findById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Treasury request not found."
        );

    }

    if (request.status !== "Pending") {

        throw new Error(
            "Request has already been processed."
        );

    }

    const treasury =
        await FamilyTreasury.findById(
            request.treasury
        );

    if (!treasury) {

        throw new Error(
            "Treasury not found."
        );

    }

    if (
        treasury.availableBalance <
        request.amount
    ) {

        throw new Error(
            "Insufficient treasury balance."
        );

    }

    treasury.availableBalance -=
        request.amount;

    treasury.totalBalance -=
        request.amount;

    await treasury.save();

    request.status =
        "Approved";

    request.reviewedBy =
        userId;

    request.reviewedAt =
        new Date();

    request.approvedAt =
        new Date();

    await request.save();

    await TreasuryLedger.create({

        treasury:
            treasury._id,

        family:
            request.family,

        type:
            "Expense",

        transactionType:
            "Debit",

        amount:
            request.amount,

        balanceAfterTransaction:
            treasury.totalBalance,

        referenceId:
            request._id,

        notes:
            request.purpose,

        createdBy:
            userId,

    });

    return request;

};

// ============================================
// Reject Request
// ============================================

export const rejectTreasuryRequestService = async (

    requestId,

    userId,

    rejectionReason

) => {

    const request =
        await TreasuryRequest.findById(
            requestId
        );

    if (!request) {

        throw new Error(
            "Treasury request not found."
        );

    }

    if (request.status !== "Pending") {

        throw new Error(
            "Request has already been processed."
        );

    }

    request.status =
        "Rejected";

    request.reviewedBy =
        userId;

    request.reviewedAt =
        new Date();

    request.rejectionReason =
        rejectionReason || "";

    await request.save();

    return request;

};