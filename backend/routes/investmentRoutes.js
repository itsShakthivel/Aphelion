import express from "express";

import {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
    previewAngelOneImport,
    confirmAngelOneImport,
    getInvestmentPortfolioController,
} from "../controllers/investmentController.js";

import protect
    from "../middleware/authMiddleware.js";

import uploadInvestmentFile
    from "../middleware/uploadMiddleware.js";


const router =
    express.Router();


// ======================================================
// PREVIEW ANGEL ONE IMPORT
// ======================================================

router.post(

    "/import/angel-one",

    protect,

    uploadInvestmentFile.single(
        "file"
    ),

    previewAngelOneImport

);

// ======================================================
// CONFIRM ANGEL ONE IMPORT
// ======================================================

router.post(

    "/import/angel-one/confirm",

    protect,

    confirmAngelOneImport

);

// ======================================================
// CREATE
// ======================================================

router.post(

    "/",

    protect,

    createInvestment

);


// ======================================================
// GET ALL
// ======================================================

router.get(

    "/",

    protect,

    getInvestments

);

// ======================================================
// GET INVESTMENT PORTFOLIO
// ======================================================

router.get(

    "/portfolio",

    protect,

    getInvestmentPortfolioController

);


// ======================================================
// GET ONE
// ======================================================

router.get(

    "/:id",

    protect,

    getInvestment

);


// ======================================================
// UPDATE
// ======================================================

router.put(

    "/:id",

    protect,

    updateInvestment

);


// ======================================================
// DELETE
// ======================================================

router.delete(

    "/:id",

    protect,

    deleteInvestment

);


export default router;