import API from "./axios";

// ============================================
// Get Notifications
// ============================================

export const getNotifications = async () => {

    const { data } = await API.get("/notifications");

    return data;

};

// ============================================
// Mark One As Read
// ============================================

export const markNotificationRead = async (id) => {

    const { data } = await API.put(
        `/notifications/${id}/read`
    );

    return data;

};

// ============================================
// Mark All As Read
// ============================================

export const markAllNotificationsRead = async () => {

    const { data } = await API.put(
        "/notifications/read-all"
    );

    return data;

};

// ============================================
// Delete Notification
// ============================================

export const deleteNotification = async (id) => {

    const { data } = await API.delete(
        `/notifications/${id}`
    );

    return data;

};