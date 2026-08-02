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
// Create Family
// ============================================

export const createFamilyService = async (

    userId,

    data

) => {

    const inviteCode = generateInviteCode();

    const family = await Family.create({

        name: data.name,

        description: data.description,

        owner: userId,

        inviteCode,

        members: [

            {

                user: userId,

                role: "Owner",

            },

        ],

    });

    return family.populate(

        "owner",

        "name email"

    );

};

// ============================================
// Get Family
// ============================================

export const getFamilyService = async (

    userId

) => {

    return await Family.findOne({

        "members.user": userId,

        isActive: true,

    })

        .populate(

            "owner",

            "name email"

        )

        .populate(

            "members.user",

            "name email avatar"

        );

};

// ============================================
// Update Family
// ============================================

export const updateFamilyService = async (

    familyId,

    data

) => {

    return await Family.findByIdAndUpdate(

        familyId,

        {

            name: data.name,

            description: data.description,

        },

        {

            new: true,

            runValidators: true,

        }

    );

};

// ============================================
// Delete Family
// ============================================

export const deleteFamilyService = async (

    familyId

) => {

    return await Family.findByIdAndDelete(

        familyId

    );

};