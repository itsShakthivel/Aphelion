import Family from "../../models/Family.js";

import {
    createNotification,
} from "./notification.service.js";

// ============================================
// Notify Family Members
// ============================================

export const notifyFamilyMembers = async (

    familyId,

    data,

    excludeUserId = null

) => {

    const family =
        await Family.findById(

            familyId

        );

    if (!family) {

        throw new Error(

            "Household not found."

        );

    }

    const notifications = [];

    for (

        const member of family.members

    ) {

        const memberId =
            member.user.toString();

        if (

            excludeUserId &&

            memberId ===
                excludeUserId.toString()

        ) {

            continue;

        }

        const notification =
            await createNotification({

                user:
                    member.user,

                scope:
                    "Family",

                family:
                    family._id,

                title:
                    data.title,

                message:
                    data.message,

                type:
                    data.type || "Family",

                priority:
                    data.priority || "Info",

                action:
                    data.action || "",

                link:
                    data.link || "",

                payload:
                    data.payload || {},

            });

        notifications.push(

            notification

        );

    }

    return notifications;

};

// ============================================
// Notify Specific Family Member
// ============================================

export const notifyFamilyMember = async (

    userId,

    familyId,

    data

) => {

    return await createNotification({

        user:
            userId,

        scope:
            "Family",

        family:
            familyId,

        title:
            data.title,

        message:
            data.message,

        type:
            data.type || "Family",

        priority:
            data.priority || "Info",

        action:
            data.action || "",

        link:
            data.link || "",

        payload:
            data.payload || {},

    });

};

// ============================================
// Family Invitation Notification
// ============================================

export const notifyFamilyInvitation = async (

    userId,

    familyId,

    familyName

) => {

    return await notifyFamilyMember(

        userId,

        familyId,

        {

            title:
                "Family Invitation",

            message:
                `You have been invited to join ${familyName}.`,

            type:
                "Family",

            priority:
                "High",

            action:
                "VIEW_INVITATION",

            link:
                "/notifications",

            payload: {

                familyId,

            },

        }

    );

};

// ============================================
// Member Joined
// ============================================

export const notifyMemberJoined = async (

    familyId,

    memberName,

    memberId

) => {

    return await notifyFamilyMembers(

        familyId,

        {

            title:
                "New Family Member",

            message:
                `${memberName} joined the household.`,

            type:
                "Family",

            priority:
                "Info",

            action:
                "VIEW_FAMILY",

            link:
                "/family",

            payload: {

                memberId,

            },

        },

        memberId

    );

};

// ============================================
// Member Removed
// ============================================

export const notifyMemberRemoved = async (

    familyId,

    memberName

) => {

    return await notifyFamilyMembers(

        familyId,

        {

            title:
                "Family Member Removed",

            message:
                `${memberName} was removed from the household.`,

            type:
                "Family",

            priority:
                "Medium",

            action:
                "VIEW_FAMILY",

            link:
                "/family",

            payload: {

                familyId,

            },

        }

    );

};

// ============================================
// Member Role Changed
// ============================================

export const notifyMemberRoleChanged = async (

    familyId,

    userId,

    role

) => {

    return await notifyFamilyMember(

        userId,

        familyId,

        {

            title:
                "Family Role Updated",

            message:
                `Your household role has been changed to ${role}.`,

            type:
                "Family",

            priority:
                "Medium",

            action:
                "VIEW_FAMILY",

            link:
                "/family",

            payload: {

                familyId,

                role,

            },

        }

    );

};

// ============================================
// Contribution Notification
// ============================================

export const notifyFamilyContribution = async (

    familyId,

    contributorName,

    amount,

    contributorId

) => {

    return await notifyFamilyMembers(

        familyId,

        {

            title:
                "Treasury Contribution",

            message:
                `${contributorName} contributed ₹${Number(
                    amount
                ).toLocaleString("en-IN")} to the household treasury.`,

            type:
                "Contribution",

            priority:
                "Info",

            action:
                "VIEW_TREASURY",

            link:
                "/family/treasury",

            payload: {

                amount,

                contributorId,

            },

        },

        contributorId

    );

};

// ============================================
// Household Report Notification
// ============================================

export const notifyFamilyReport = async (

    familyId,

    reportName

) => {

    return await notifyFamilyMembers(

        familyId,

        {

            title:
                "Household Report Ready",

            message:
                `${reportName} is ready to view.`,

            type:
                "Report",

            priority:
                "Info",

            action:
                "VIEW_REPORT",

            link:
                "/family/reports",

            payload: {

                familyId,

            },

        }

    );

};