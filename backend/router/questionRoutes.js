import express from "express";
import { getRandomQuestion, getAllQuestions, createQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.get("/random", getRandomQuestion);
router.get("/", getAllQuestions);
router.post("/", createQuestion); 

export default router;
