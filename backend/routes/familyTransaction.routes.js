import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    requireAdmin,
} from "../middleware/familyPermissionMiddleware.js";

import {

    createTransaction,

    getTransactions,

    getTransaction,

    updateTransaction,

    deleteTransaction,

} from "../controllers/FamilyTransactionController.js";

const router = express.Router();

router.use(protect);

// ============================================
// Transactions
// ============================================

router.post(

    "/:familyId/:treasuryId",

    requireAdmin,

    createTransaction

);

router.get(

    "/:treasuryId",

    getTransactions

);

router.get(

    "/details/:transactionId",

    getTransaction

);

router.put(

    "/:transactionId",

    requireAdmin,

    updateTransaction

);

router.delete(

    "/:transactionId",

    requireAdmin,

    deleteTransaction

);

export default router;