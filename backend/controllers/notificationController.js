import {
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
} from "../services/notification/notification.service.js";

// ============================================
// Get All Notifications
// ============================================

export const getUserNotifications = async (req, res) => {

    try {

        const notifications = await getNotifications(
            req.user.id
        );

        res.status(200).json(notifications);

    } catch (error) {

        res.status(500).json({

            message: "Failed to fetch notifications",

            error: error.message,

        });

    }

};

// ============================================
// Mark Notification As Read
// ============================================

export const readNotification = async (req, res) => {

    try {

        const notification = await markAsRead(

            req.params.id,

            req.user.id

        );

        if (!notification) {

            return res.status(404).json({

                message: "Notification not found",

            });

        }

        res.status(200).json(notification);

    } catch (error) {

        res.status(500).json({

            message: "Failed to update notification",

            error: error.message,

        });

    }

};

// ============================================
// Mark All Notifications As Read
// ============================================

export const readAllNotifications = async (req, res) => {

    try {

        await markAllRead(req.user.id);

        res.status(200).json({

            message:
                "All notifications marked as read",

        });

    } catch (error) {

        res.status(500).json({

            message:
                "Failed to update notifications",

            error: error.message,

        });

    }

};

// ============================================
// Delete Notification
// ============================================

export const removeNotification = async (req, res) => {

    try {

        const notification =
            await deleteNotification(

                req.params.id,

                req.user.id

            );

        if (!notification) {

            return res.status(404).json({

                message:
                    "Notification not found",

            });

        }

        res.status(200).json({

            message:
                "Notification deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message:
                "Failed to delete notification",

            error: error.message,

        });

    }

};