import {
    createManagedMemberService,
    getManagedMembersService,
    getManagedMemberByIdService,
    updateManagedMemberService,
    archiveManagedMemberService,
} from "../services/family/member.service.js";

// ============================================
// Create Managed Member
// ============================================

export const createManagedMember = async (req, res) => {

    try {

        const member =
            await createManagedMemberService(

                req.params.familyId,

                req.body

            );

        return res.status(201).json({

            success: true,

            message:
                "Managed member created successfully.",

            data: member,

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
// Get Managed Members
// ============================================

export const getManagedMembers = async (req, res) => {

    try {

        const members =
            await getManagedMembersService(

                req.params.familyId

            );

        return res.json({

            success: true,

            data: members,

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
// Get Managed Member
// ============================================

export const getManagedMember = async (req, res) => {

    try {

        const member =
            await getManagedMemberByIdService(

                req.params.memberId

            );

        return res.json({

            success: true,

            data: member,

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
// Update Managed Member
// ============================================

export const updateManagedMember = async (req, res) => {

    try {

        const member =
            await updateManagedMemberService(

                req.params.memberId,

                req.body

            );

        return res.json({

            success: true,

            message:
                "Managed member updated successfully.",

            data: member,

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
// Archive Managed Member
// ============================================

export const archiveManagedMember = async (req, res) => {

    try {

        const result =
            await archiveManagedMemberService(

                req.params.memberId

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

// ============================================
// Claim Managed Member
// ============================================

export const claimManagedMember = async (req, res) => {

    try {

        const member =
            await claimManagedMemberService(

                req.params.memberId,

                req.user.id

            );

        return res.json({

            success: true,

            message:
                "Managed profile claimed successfully.",

            data: member,

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
// Leave Household
// ============================================

export const leaveHousehold = async (
    req,
    res
) => {

    try {

        const result =
            await leaveHouseholdService(

                req.params.familyId,

                req.user.id

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

// ============================================
// Transfer Ownership
// ============================================

export const transferOwnership = async (
    req,
    res
) => {

    try {

        const family =
            await transferOwnershipService(

                req.params.familyId,

                req.body.userId

            );

        return res.json({

            success: true,

            message:
                "Ownership transferred successfully.",

            data: family,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};