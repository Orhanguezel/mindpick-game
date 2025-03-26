import express from "express";
import {
  registerUser,
  loginUser,
  getUserScore,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId/score", getUserScore);
router.get("/", getAllUsers);

export default router;

