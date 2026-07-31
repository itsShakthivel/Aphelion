import express from "express";

import {
    downloadPDFReport,
    downloadCSVReport,
    getReports,
    removeReport,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/pdf",
    protect,
    downloadPDFReport
);

router.get(
    "/csv",
    protect,
    downloadCSVReport
);

router.get(

    "/history",

    protect,

    getReports

);

router.delete(

    "/history/:id",

    protect,

    removeReport

);

export default router;