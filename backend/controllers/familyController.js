import User from "../models/User.js";
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
    acceptInvitationService,
    rejectInvitationService,
} from "../services/family/invitation.service.js";

import {
    removeMemberService,
    updateMemberRoleService,
} from "../services/family/member.service.js";

import {
    getMemberRole,
    isOwner,
    isAdmin,
} from "../services/family/permission.service.js";

import {
    notifyFamilyInvitation,
    notifyMemberJoined,
    notifyMemberRemoved,
    notifyMemberRoleChanged,
} from "../services/notification/familyNotification.service.js";

// ============================================
// Create Household
// ============================================

export const createFamily = async (req, res) => {

    try {

        const family =
            await createFamilyService(

                req.user.id,

                req.body

            );

        return res.status(201).json({

            success: true,

            message:
                "Household created successfully.",

            data:
                family,

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
// Get Household
// ============================================

export const getFamily = async (req, res) => {

    try {

        const family =
            await getFamilyService(

                req.user.id

            );

        if (!family) {

            return res.status(404).json({

                success: false,

                message:
                    "Household not found.",

            });

        }

        return res.json({

            success: true,

            data:
                family,

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
// Update Household
// ============================================

export const updateFamily = async (req, res) => {

    try {

        const role =
            await getMemberRole(

                req.params.id,

                req.user.id

            );

        if (!isOwner(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the owner can update the household.",

            });

        }

        const family =
            await updateFamilyService(

                req.params.id,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Household updated successfully.",

            data:
                family,

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
// Archive Household
// ============================================

export const deleteFamily = async (req, res) => {

    try {

        const role =
            await getMemberRole(

                req.params.id,

                req.user.id

            );

        if (!isOwner(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the owner can archive the household.",

            });

        }

        await deleteFamilyService(

            req.params.id

        );

        return res.json({

            success: true,

            message:
                "Household archived successfully.",

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
// Send Invitation
// ============================================

export const sendInvitation = async (req, res) => {

    try {

        const role =
            await getMemberRole(

                req.body.family,

                req.user.id

            );

        if (!isAdmin(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Permission denied.",

            });

        }

        const family =
            await Family.findById(

                req.body.family

            );

        if (!family) {

            return res.status(404).json({

                success: false,

                message:
                    "Household not found.",

            });

        }

        const invitation =
            await createInvitationService({

                family:
                    req.body.family,

                sender:
                    req.user.id,

                receiverEmail:
                    req.body.receiverEmail,

                role:
                    req.body.role,

            });

        // ========================================
        // Notify Existing User
        // ========================================

        const invitedUser =
            await User.findOne({

                email:
                    req.body.receiverEmail,

            });

        if (invitedUser) {

            await notifyFamilyInvitation(

                invitedUser._id,

                family._id,

                family.name

            );

        }

        return res.status(201).json({

            success: true,

            message:
                "Invitation sent successfully.",

            data:
                invitation,

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
// Get Pending Invitations
// ============================================

export const getPendingInvitations = async (req, res) => {

    try {

        const invitations =
            await getPendingInvitationsService(

                req.user.email

            );

        return res.json({

            success: true,

            data:
                invitations,

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
// Accept Invitation
// ============================================

export const acceptInvitation = async (req, res) => {

    try {

        // ========================================
        // Get Invitation Before Processing
        // ========================================

        const invitation =
            await Invitation.findById(

                req.params.id

            );

        if (!invitation) {

            return res.status(404).json({

                success: false,

                message:
                    "Invitation not found.",

            });

        }

        // ========================================
        // Accept Invitation
        // ========================================

        const result =
            await acceptInvitationService(

                req.params.id,

                req.user.id

            );

        // ========================================
        // Get User For Notification
        // ========================================

        const user =
            await User.findById(

                req.user.id

            );

        if (user) {

            await notifyMemberJoined(

                invitation.family,

                user.name,

                req.user.id

            );

        }

        return res.json({

            success: true,

            message:
                result.message,

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
// Reject Invitation
// ============================================

export const rejectInvitation = async (req, res) => {

    try {

        const result =
            await rejectInvitationService(

                req.params.id

            );

        return res.json({

            success: true,

            message:
                result.message,

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
// Remove Member
// ============================================

export const removeMember = async (req, res) => {

    try {

        const role =
            await getMemberRole(

                req.params.familyId,

                req.user.id

            );

        if (!isAdmin(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Permission denied.",

            });

        }

        // ========================================
        // Get Member Before Removal
        // ========================================

        const memberUser =
            await User.findById(

                req.params.memberId

            );

        // ========================================
        // Remove Member
        // ========================================

        const result =
            await removeMemberService(

                req.params.familyId,

                req.params.memberId

            );

        // ========================================
        // Notify Household
        // ========================================

        if (memberUser) {

            await notifyMemberRemoved(

                req.params.familyId,

                memberUser.name

            );

        }

        return res.json({

            success: true,

            message:
                result.message,

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
// Update Member Role
// ============================================

export const updateMemberRole = async (req, res) => {

    try {

        const role =
            await getMemberRole(

                req.params.familyId,

                req.user.id

            );

        if (!isOwner(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Only owner can change roles.",

            });

        }

        // ========================================
        // Update Role
        // ========================================

        const family =
            await updateMemberRoleService(

                req.params.familyId,

                req.params.memberId,

                req.body.role

            );

        // ========================================
        // Notify Member
        // ========================================

        await notifyMemberRoleChanged(

            req.params.familyId,

            req.params.memberId,

            req.body.role

        );

        return res.json({

            success: true,

            message:
                "Member role updated successfully.",

            data:
                family,

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