import express from "express";

import {
    createInvestment,
    getInvestments,
    getInvestment,
    updateInvestment,
    deleteInvestment,
    previewAngelOneImport,
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