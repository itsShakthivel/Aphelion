import crypto from "crypto";
import Family from "../../models/Family.js";

// ============================================
// Generate Invite Code
// ============================================

const generateInviteCode = () => {
    return crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase();
};

// ============================================
// Populate Helper
// ============================================

const populateFamily = async (family) => {
    return await family.populate([
        {
            path: "owner",
            select: "name email avatar",
        },
        {
            path: "members.user",
            select: "name email avatar",
        },
    ]);
};

// ============================================
// Create Household
// ============================================

export const createFamilyService = async (
    userId,
    data
) => {

    // User should not own another active household
    const existingFamily = await Family.findOne({
        owner: userId,
        isActive: true,
        isArchived: false,
    });

    if (existingFamily) {
        throw new Error(
            "You already own a household."
        );
    }

    const inviteCode = generateInviteCode();

    const family = await Family.create({

        name: data.name,

        description: data.description || "",

        avatar: data.avatar || "",

        owner: userId,

        inviteCode,

        members: [
            {
                user: userId,
                role: "Owner",
                status: "Active",
            },
        ],

        configuration: {
            currency: "INR",
            timezone: "Asia/Kolkata",
            locale: "en-IN",
        },

        features: {
            treasuryEnabled: true,
            managedMembersEnabled: true,
            invitationsEnabled: true,
        },

        statistics: {
            memberCount: 1,
            registeredMemberCount: 1,
            managedMemberCount: 0,
        },

    });

    return await populateFamily(family);

};

// ============================================
// Get Household
// ============================================

export const getFamilyService = async (
    userId
) => {

    const family = await Family.findOne({

        "members.user": userId,

        isActive: true,

        isArchived: false,

    });

    if (!family) return null;

    return await populateFamily(family);

};

// ============================================
// Update Household
// ============================================

export const updateFamilyService = async (
    familyId,
    data
) => {

    const family = await Family.findById(
        familyId
    );

    if (!family) {
        throw new Error(
            "Household not found."
        );
    }

    if (data.name !== undefined)
        family.name = data.name;

    if (data.description !== undefined)
        family.description = data.description;

    if (data.avatar !== undefined)
        family.avatar = data.avatar;

    if (data.configuration) {

        family.configuration = {

            ...family.configuration.toObject(),

            ...data.configuration,

        };

    }

    await family.save();

    return await populateFamily(family);

};

// ============================================
// Archive Household
// ============================================

export const deleteFamilyService = async (
    familyId
) => {

    const family = await Family.findById(
        familyId
    );

    if (!family) {
        throw new Error(
            "Household not found."
        );
    }

    family.isActive = false;
    family.isArchived = true;

    await family.save();

    return family;

};

// ============================================
// Get Household By ID
// ============================================

export const getFamilyByIdService = async (
    familyId
) => {

    const family = await Family.findById(
        familyId
    );

    if (!family) return null;

    return await populateFamily(family);

};