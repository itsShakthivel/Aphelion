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

router.post("/", protect, createInvestment);

router.get("/", protect, getInvestments);

router.get("/:id", protect, getInvestment);

router.put("/:id", protect, updateInvestment);

router.delete("/:id", protect, deleteInvestment);

export default router;