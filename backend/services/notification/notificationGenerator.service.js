import { createNotification } from "./notification.service.js";

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

    });

};