import express from "express";

import {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
} from "../controllers/investmentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create
router.post(
    "/",
    protect,
    createInvestment
);

// Get All
router.get(
    "/",
    protect,
    getInvestments
);

// Get One
router.get(
    "/:id",
    protect,
    getInvestment
);

// Update
router.put(
    "/:id",
    protect,
    updateInvestment
);

// Delete
router.delete(
    "/:id",
    protect,
    deleteInvestment
);

export default router;