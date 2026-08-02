import Family from "../models/Family.js";
import Invitation from "../models/Invitation.js";

import {
    createFamilyService,
    getFamilyService,
    updateFamilyService,
    deleteFamilyService,
} from "../services/family/family.service.js";

import {
    createInvitationService,
    getPendingInvitationsService,
    updateInvitationStatusService,
} from "../services/family/invitation.service.js";

import {
    getMemberRole,
    isOwner,
    isAdmin,
} from "../services/family/permission.service.js";

// ============================================
// Create Family
// ============================================

export const createFamily = async (req, res) => {

    try {

        const existingFamily = await getFamilyService(

            req.user.id

        );

        if (existingFamily) {

            return res.status(400).json({

                message: "User already belongs to a family.",

            });

        }

        const family = await createFamilyService(

            req.user.id,

            req.body

        );

        res.status(201).json(family);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Get Family
// ============================================

export const getFamily = async (req, res) => {

    try {

        const family = await getFamilyService(

            req.user.id

        );

        if (!family) {

            return res.status(404).json({

                message: "Family not found.",

            });

        }

        res.json(family);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Update Family
// ============================================

export const updateFamily = async (req, res) => {

    try {

        const role = await getMemberRole(

            req.params.id,

            req.user.id

        );

        if (!isOwner(role)) {

            return res.status(403).json({

                message: "Only the owner can update the family.",

            });

        }

        const family = await updateFamilyService(

            req.params.id,

            req.body

        );

        res.json(family);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Delete Family
// ============================================

export const deleteFamily = async (req, res) => {

    try {

        const role = await getMemberRole(

            req.params.id,

            req.user.id

        );

        if (!isOwner(role)) {

            return res.status(403).json({

                message: "Only the owner can delete the family.",

            });

        }

        await deleteFamilyService(

            req.params.id

        );

        res.json({

            message: "Family deleted successfully.",

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Send Invitation
// ============================================

export const sendInvitation = async (req, res) => {

    try {

        const role = await getMemberRole(

            req.body.family,

            req.user.id

        );

        if (!isAdmin(role)) {

            return res.status(403).json({

                message: "Permission denied.",

            });

        }

        const invitation = await createInvitationService({

            family: req.body.family,

            sender: req.user.id,

            receiverEmail: req.body.receiverEmail,

            role: req.body.role,

        });

        res.status(201).json(invitation);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Get Pending Invitations
// ============================================

export const getPendingInvitations = async (req, res) => {

    try {

        const invitations =

            await getPendingInvitationsService(

                req.user.email

            );

        res.json(invitations);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Accept Invitation
// ============================================

export const acceptInvitation = async (req, res) => {

    try {

        const invitation = await Invitation.findById(

            req.params.id

        );

        if (!invitation) {

            return res.status(404).json({

                message: "Invitation not found.",

            });

        }

        if (invitation.status !== "Pending") {

            return res.status(400).json({

                message: "Invitation already processed.",

            });

        }

        await Family.findByIdAndUpdate(

            invitation.family,

            {

                $push: {

                    members: {

                        user: req.user.id,

                        role: invitation.role,

                    },

                },

            }

        );

        await updateInvitationStatusService(

            invitation._id,

            "Accepted"

        );

        res.json({

            message: "Invitation accepted.",

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Reject Invitation
// ============================================

export const rejectInvitation = async (req, res) => {

    try {

        await updateInvitationStatusService(

            req.params.id,

            "Rejected"

        );

        res.json({

            message: "Invitation rejected.",

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Remove Member
// ============================================

export const removeMember = async (req, res) => {

    try {

        const role = await getMemberRole(

            req.params.familyId,

            req.user.id

        );

        if (!isAdmin(role)) {

            return res.status(403).json({

                message: "Permission denied.",

            });

        }

        await Family.findByIdAndUpdate(

            req.params.familyId,

            {

                $pull: {

                    members: {

                        user: req.params.memberId,

                    },

                },

            }

        );

        res.json({

            message: "Member removed successfully.",

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ============================================
// Change Member Role
// ============================================

export const updateMemberRole = async (req, res) => {

    try {

        const role = await getMemberRole(

            req.params.familyId,

            req.user.id

        );

        if (!isOwner(role)) {

            return res.status(403).json({

                message: "Only the owner can change member roles.",

            });

        }

        const family = await Family.findById(

            req.params.familyId

        );

        const member = family.members.find(

            member =>

                member.user.toString() ===

                req.params.memberId

        );

        if (!member) {

            return res.status(404).json({

                message: "Member not found.",

            });

        }

        member.role = req.body.role;

        await family.save();

        res.json({

            message: "Member role updated successfully.",

            family,

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};