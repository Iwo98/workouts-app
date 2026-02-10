import { authenticateToken } from "../middleware/authenticateToken";
import express from "express";
import * as controllers from "../contollers/exercises";

const router = express.Router();

// GET /api/workouts
router.get("/", authenticateToken, controllers.getAllExercises);

// GET /api/exercises/:id
router.get("/:id", authenticateToken, controllers.getExerciseById);

export default router;
