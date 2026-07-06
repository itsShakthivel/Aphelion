import express from "express";

import {
    saveRetirement,
    getRetirement,
}
from "../controllers/retirementController.js";

import protect
from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    protect,
    saveRetirement
);

router.get(
    "/",
    protect,
    getRetirement
);

export default router;