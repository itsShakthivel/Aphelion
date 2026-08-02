import Family from "../../models/Family.js";
import ManagedMember from "../../models/ManagedMember.js";

// ============================================
// Remove Registered Member
// ============================================

export const removeMemberService = async (
    familyId,
    memberId
) => {

    const family = await Family.findById(familyId);

    if (!family) {
        throw new Error("Household not found.");
    }

    const member = family.members.find(
        (member) =>
            member.user.toString() === memberId.toString()
    );

    if (!member) {
        throw new Error("Member not found.");
    }

    family.members = family.members.filter(
        (member) =>
            member.user.toString() !== memberId.toString()
    );

    family.statistics.memberCount = Math.max(
        0,
        family.statistics.memberCount - 1
    );

    family.statistics.registeredMemberCount = Math.max(
        0,
        family.statistics.registeredMemberCount - 1
    );

    await family.save();

    return {
        success: true,
        message: "Member removed successfully.",
    };

};

// ============================================
// Update Registered Member Role
// ============================================

export const updateMemberRoleService = async (
    familyId,
    memberId,
    role
) => {

    const family = await Family.findById(familyId);

    if (!family) {
        throw new Error("Household not found.");
    }

    const member = family.members.find(
        (member) =>
            member.user.toString() === memberId.toString()
    );

    if (!member) {
        throw new Error("Member not found.");
    }

    member.role = role;

    await family.save();

    return family;

};

// ============================================
// Create Managed Member
// ============================================

export const createManagedMemberService = async (
    familyId,
    data
) => {

    const family = await Family.findById(familyId);

    if (!family) {
        throw new Error("Household not found.");
    }

    const existingMember = await ManagedMember.findOne({
        family: familyId,
        name: data.name,
        relationship: data.relationship,
        isArchived: false,
    });

    if (existingMember) {
        throw new Error(
            "A managed member with the same name and relationship already exists."
        );
    }

    const managedMember = await ManagedMember.create({
        family: familyId,
        ...data,
    });

    family.statistics.memberCount += 1;
    family.statistics.managedMemberCount += 1;

    await family.save();

    return managedMember;

};

// ============================================
// Get Managed Members
// ============================================

export const getManagedMembersService = async (
    familyId
) => {

    return await ManagedMember.find({
        family: familyId,
        isArchived: false,
    }).populate(
        "claimedUser",
        "name email avatar"
    );

};

// ============================================
// Get Managed Member By ID
// ============================================

export const getManagedMemberByIdService = async (
    memberId
) => {

    const member = await ManagedMember.findById(
        memberId
    ).populate(
        "claimedUser",
        "name email avatar"
    );

    if (!member) {
        throw new Error("Managed member not found.");
    }

    return member;

};

// ============================================
// Update Managed Member
// ============================================

export const updateManagedMemberService = async (
    memberId,
    data
) => {

    const member = await ManagedMember.findById(
        memberId
    );

    if (!member) {
        throw new Error("Managed member not found.");
    }

    Object.assign(member, data);

    await member.save();

    return member;

};

// ============================================
// Archive Managed Member
// ============================================

export const archiveManagedMemberService = async (
    memberId
) => {

    const member = await ManagedMember.findById(
        memberId
    );

    if (!member) {
        throw new Error("Managed member not found.");
    }

    if (member.isArchived) {
        throw new Error("Managed member is already archived.");
    }

    member.isArchived = true;
    member.isActive = false;

    await member.save();

    await Family.findByIdAndUpdate(
        member.family,
        {
            $inc: {
                "statistics.memberCount": -1,
                "statistics.managedMemberCount": -1,
            },
        }
    );

    return {
        success: true,
        message: "Managed member archived successfully.",
    };

};

// ============================================
// Claim Managed Member
// ============================================

export const claimManagedMemberService = async (
    memberId,
    userId
) => {

    const member = await ManagedMember.findById(memberId);

    if (!member) {
        throw new Error("Managed member not found.");
    }

    if (member.isArchived) {
        throw new Error("Managed member has been archived.");
    }

    if (member.isClaimed) {
        throw new Error("This profile has already been claimed.");
    }

    const family = await Family.findById(member.family);

    if (!family) {
        throw new Error("Household not found.");
    }

    const alreadyRegistered = family.members.some(
        member =>
            member.user.toString() ===
            userId.toString()
    );

    if (alreadyRegistered) {
        throw new Error(
            "You are already a registered household member."
        );
    }

    family.members.push({

        user: userId,

        role: member.role,

        status: "Active",

        joinedAt: new Date(),

    });

    family.statistics.memberCount += 1;

    family.statistics.registeredMemberCount += 1;

    await family.save();

    member.isClaimed = true;

    member.claimedUser = userId;

    await member.save();

    return member.populate(
        "claimedUser",
        "name email avatar"
    );

};

// ============================================
// Leave Household
// ============================================

export const leaveHouseholdService = async (
    familyId,
    userId
) => {

    const family = await Family.findById(familyId);

    if (!family) {
        throw new Error("Household not found.");
    }

    const member = family.members.find(
        member =>
            member.user.toString() === userId.toString()
    );

    if (!member) {
        throw new Error("You are not a household member.");
    }

    if (member.role === "Owner") {
        throw new Error(
            "Transfer ownership before leaving the household."
        );
    }

    family.members = family.members.filter(
        member =>
            member.user.toString() !== userId.toString()
    );

    family.statistics.memberCount = Math.max(
        0,
        family.statistics.memberCount - 1
    );

    family.statistics.registeredMemberCount = Math.max(
        0,
        family.statistics.registeredMemberCount - 1
    );

    await family.save();

    return {
        success: true,
        message: "You left the household successfully.",
    };

};

// ============================================
// Transfer Household Ownership
// ============================================

export const transferOwnershipService = async (

    familyId,

    newOwnerId

) => {

    const family = await Family.findById(
        familyId
    );

    if (!family) {
        throw new Error(
            "Household not found."
        );
    }

    const currentOwner =
        family.members.find(
            member =>
                member.role === "Owner"
        );

    const newOwner =
        family.members.find(
            member =>
                member.user.toString() ===
                newOwnerId.toString()
        );

    if (!newOwner) {
        throw new Error(
            "New owner is not a household member."
        );
    }

    if (currentOwner) {
        currentOwner.role = "Admin";
    }

    newOwner.role = "Owner";

    family.owner = newOwner.user;

    await family.save();

    return family;

};