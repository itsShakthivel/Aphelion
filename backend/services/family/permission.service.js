import Family from "../../models/Family.js";

// ============================================
// Get Member Role
// ============================================

export const getMemberRole = async (

    familyId,

    userId

) => {

    const family = await Family.findById(

        familyId

    );

    if (!family) return null;

    const member = family.members.find(

        member =>

            member.user.toString() ===

            userId.toString()

    );

    return member?.role || null;

};

// ============================================
// Check Permission
// ============================================

export const hasPermission = (

    role,

    allowedRoles

) => {

    return allowedRoles.includes(

        role

    );

};

// ============================================
// Owner Check
// ============================================

export const isOwner = (

    role

) => {

    return role === "Owner";

};

// ============================================
// Admin Check
// ============================================

export const isAdmin = (

    role

) => {

    return (

        role === "Owner" ||

        role === "Admin"

    );

};