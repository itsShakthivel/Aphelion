import express from "express";

import {
    createLoan,
    getLoans,
    updateLoan,
    deleteLoan,
}
from "../controllers/loanController.js";

import protect
from "../middleware/authMiddleware.js";

const router =
    express.Router();

router.post(
    "/",
    protect,
    createLoan
);

router.get(
    "/",
    protect,
    getLoans
);

router.put(
    "/:id",
    protect,
    updateLoan
);

router.delete(
    "/:id",
    protect,
    deleteLoan
);

export default router;