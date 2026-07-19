import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

    getFIREPlanner,

} from "../controllers/fireController.js";

const router = express.Router();

router.get(

    "/",

    protect,

    getFIREPlanner

);

export default router;