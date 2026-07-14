import express from "express";

import {
    createInsurance,
    getInsurances,
    getInsurance,
    updateInsurance,
    deleteInsurance,
} from "../controllers/insuranceController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Create
// ==========================

router.post(
    "/",
    protect,
    createInsurance
);

// ==========================
// Get All
// ==========================

router.get(
    "/",
    protect,
    getInsurances
);

// ==========================
// Get One
// ==========================

router.get(
    "/:id",
    protect,
    getInsurance
);

// ==========================
// Update
// ==========================

router.put(
    "/:id",
    protect,
    updateInsurance
);

// ==========================
// Delete
// ==========================

router.delete(
    "/:id",
    protect,
    deleteInsurance
);

export default router;