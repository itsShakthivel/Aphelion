import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

    getUserNotifications,

    readNotification,

    readAllNotifications,

    removeNotification,

} from "../controllers/notificationController.js";

const router = express.Router();

// ============================================
// Notification Routes
// ============================================

router.get(

    "/",

    protect,

    getUserNotifications

);

router.put(

    "/read-all",

    protect,

    readAllNotifications

);

router.put(

    "/:id/read",

    protect,

    readNotification

);

router.delete(

    "/:id",

    protect,

    removeNotification

);

export default router;