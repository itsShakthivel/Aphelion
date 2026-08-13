import {
    createNotification,
} from "./notification.service.js";

// ============================================
// Generate Notification
// ============================================

export const generateNotification = async ({

    user,

    title,

    message,

    type,

    priority,

    action = "",

    link = "",

    payload = {},

    scope = "Personal",

    family = null,

}) => {

    return await createNotification({

        user,

        title,

        message,

        type,

        priority,

        action,

        link,

        payload,

        scope,

        family,

    });

};