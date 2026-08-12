import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    generateFamilyPDF,
} from "../controllers/familyReportController.js";

const router = express.Router();

router.get(

    "/pdf",

    protect,

    generateFamilyPDF

);

export default router;