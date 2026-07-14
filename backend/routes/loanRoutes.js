import express from "express";

import {
    createLoan,
    getLoans,
    getLoan,
    updateLoan,
    deleteLoan,
} from "../controllers/loanController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Create
// ==========================

router.post(
    "/",
    protect,
    createLoan
);

// ==========================
// Get All
// ==========================

router.get(
    "/",
    protect,
    getLoans
);

// ==========================
// Get One
// ==========================

router.get(
    "/:id",
    protect,
    getLoan
);

// ==========================
// Update
// ==========================

router.put(
    "/:id",
    protect,
    updateLoan
);

// ==========================
// Delete
// ==========================

router.delete(
    "/:id",
    protect,
    deleteLoan
);

export default router;