import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import * as notificationAPI from "../../api/notificationService";

// ============================================
// Fetch Notifications
// ============================================

export const fetchNotifications = createAsyncThunk(
    "notifications/fetch",
    async (_, thunkAPI) => {
        try {
            return await notificationAPI.getNotifications();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);

// ============================================
// Mark One As Read
// ============================================

export const markNotificationRead = createAsyncThunk(
    "notifications/read",
    async (id, thunkAPI) => {
        try {
            await notificationAPI.markNotificationRead(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);

// ============================================
// Mark All As Read
// ============================================

export const markAllNotificationsRead = createAsyncThunk(
    "notifications/readAll",
    async (_, thunkAPI) => {
        try {
            await notificationAPI.markAllNotificationsRead();
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);

// ============================================
// Delete Notification
// ============================================

export const deleteNotification = createAsyncThunk(
    "notifications/delete",
    async (id, thunkAPI) => {
        try {
            await notificationAPI.deleteNotification(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message
            );
        }
    }
);

const initialState = {

    notifications: [],

    summary: {

        total: 0,

        unread: 0,

        critical: 0,

        high: 0,

        medium: 0,

        low: 0,

        info: 0,

    },

    loading: false,

    error: null,

};

const notificationSlice = createSlice({

    name: "notifications",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // ===============================
            // Fetch
            // ===============================

            .addCase(
                fetchNotifications.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchNotifications.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.notifications =
                        action.payload.notifications;

                    state.summary =
                        action.payload.summary;

                }
            )

            .addCase(
                fetchNotifications.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            )

            // ===============================
            // Mark One Read
            // ===============================

            .addCase(
                markNotificationRead.fulfilled,
                (state, action) => {

                    const notification =
                        state.notifications.find(
                            item =>
                                item._id === action.payload
                        );

                    if (
                        notification &&
                        !notification.read
                    ) {

                        notification.read = true;

                        state.summary.unread--;

                    }

                }
            )

            // ===============================
            // Mark All Read
            // ===============================

            .addCase(
                markAllNotificationsRead.fulfilled,
                (state) => {

                    state.notifications.forEach(
                        notification =>
                            notification.read = true
                    );

                    state.summary.unread = 0;

                }
            )

            // ===============================
            // Delete
            // ===============================

            .addCase(
                deleteNotification.fulfilled,
                (state, action) => {

                    const deleted =
                        state.notifications.find(
                            item =>
                                item._id === action.payload
                        );

                    if (
                        deleted &&
                        !deleted.read
                    ) {

                        state.summary.unread--;

                    }

                    state.notifications =
                        state.notifications.filter(
                            item =>
                                item._id !== action.payload
                        );

                    state.summary.total--;

                }
            );

    },

});

export default notificationSlice.reducer;