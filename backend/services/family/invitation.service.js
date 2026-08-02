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