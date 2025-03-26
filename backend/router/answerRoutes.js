import express from "express";
import { submitAnswer, getUserAnswers } from "../controllers/answerController.js";

const router = express.Router();

router.post("/", submitAnswer);
router.get("/:userId", getUserAnswers);

export default router;
