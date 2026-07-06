import express from "express";
import { getDashboardAnalytics } from "../controllers/dashboardController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.get(
    "/",
    protect,
    getDashboardAnalytics
);

export default router;