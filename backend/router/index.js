import express from "express";
import userRoutes from "./userRoutes.js";
import questionRoutes from "./questionRoutes.js";
import answerRoutes from "./answerRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

export default router;
