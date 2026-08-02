import Notification from "../../models/Notification.js";

// ============================================
// Create Notification
// ============================================

export const createNotification = async (

    data

) => {

    return await Notification.create(data);

};

// ============================================
// Get User Notifications
// ============================================

export const getNotifications = async (userId) => {

    const notifications = await Notification.find({

        user: userId,

    }).sort({

        createdAt: -1,

    });

    const summary = {

        total: notifications.length,

        unread: notifications.filter(
            notification => !notification.read
        ).length,

        critical: notifications.filter(
            notification =>
                notification.priority === "Critical"
        ).length,

        high: notifications.filter(
            notification =>
                notification.priority === "High"
        ).length,

        medium: notifications.filter(
            notification =>
                notification.priority === "Medium"
        ).length,

        low: notifications.filter(
            notification =>
                notification.priority === "Low"
        ).length,

        info: notifications.filter(
            notification =>
                notification.priority === "Info"
        ).length,

    };

    return {

        summary,

        notifications,

    };

};

// ============================================
// Mark As Read
// ============================================

export const markAsRead = async (

    id,

    userId

) => {

    return await Notification.findOneAndUpdate(

        {

            _id: id,

            user: userId,

        },

        {

            read: true,

        },

        {

            new: true,

        }

    );

};

// ============================================
// Mark All Read
// ============================================

export const markAllRead = async (

    userId

) => {

    return await Notification.updateMany(

        {

            user: userId,

            read: false,

        },

        {

            read: true,

        }

    );

};

// ============================================
// Delete Notification
// ============================================

export const deleteNotification = async (

    id,

    userId

) => {

    return await Notification.findOneAndDelete({

        _id: id,

        user: userId,

    });

};