import express from "express";

import {
    createInsurance,
    getInsurances,
    updateInsurance,
    deleteInsurance,
}
from "../controllers/insuranceController.js";

import protect
from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    protect,
    createInsurance
);

router.get(
    "/",
    protect,
    getInsurances
);

router.put(
    "/:id",
    protect,
    updateInsurance
);

router.delete(
    "/:id",
    protect,
    deleteInsurance
);

export default router;