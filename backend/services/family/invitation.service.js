import Family from "../../models/Family.js";

import Invitation from "../../models/Invitation.js";

// ============================================
// Create Invitation
// ============================================

export const createInvitationService = async (

    data

) => {

    return await Invitation.create({

        family: data.family,

        sender: data.sender,

        receiverEmail: data.receiverEmail,

        role: data.role,

    });

};

// ============================================
// Get Invitations
// ============================================

export const getPendingInvitationsService = async (

    email

) => {

    return await Invitation.find({

        receiverEmail: email,

        status: "Pending",

    })

        .populate(

            "family",

            "name"

        )

        .populate(

            "sender",

            "name email"

        );

};

// ============================================
// Update Invitation
// ============================================

export const updateInvitationStatusService = async (

    invitationId,

    status

) => {

    return await Invitation.findByIdAndUpdate(

        invitationId,

        {

            status,

        },

        {

            new: true,

        }

    );

};

// ============================================
// Delete Invitation
// ============================================

export const deleteInvitationService = async (

    invitationId

) => {

    return await Invitation.findByIdAndDelete(

        invitationId

    );

};

// ============================================
// Accept Invitation
// ============================================

export const acceptInvitationService = async (

    invitationId,

    userId

) => {

    const invitation =
        await Invitation.findById(
            invitationId
        );

    if (!invitation) {
        throw new Error(
            "Invitation not found."
        );
    }

    if (
        invitation.status !== "Pending"
    ) {
        throw new Error(
            "Invitation already processed."
        );
    }

    const family =
        await Family.findById(
            invitation.family
        );

    if (!family) {
        throw new Error(
            "Household not found."
        );
    }

    const exists =
        family.members.some(
            member =>
                member.user.toString() ===
                userId.toString()
        );

    if (exists) {
        throw new Error(
            "Already a member."
        );
    }

    family.members.push({

        user: userId,

        role: invitation.role,

        status: "Active",

        invitedBy: invitation.sender,

    });

    family.statistics.memberCount++;

    family.statistics.registeredMemberCount++;

    await family.save();

    invitation.status = "Accepted";

    await invitation.save();

    return {
        success: true,
        message:
            "Invitation accepted.",
    };

};

// ============================================
// Reject Invitation
// ============================================

export const rejectInvitationService =
async (
    invitationId
) => {

    const invitation =
        await Invitation.findById(
            invitationId
        );

    if (!invitation) {
        throw new Error(
            "Invitation not found."
        );
    }

    invitation.status = "Rejected";

    await invitation.save();

    return {
        success: true,
        message:
            "Invitation rejected.",
    };

};