import { authenticateToken } from "../middleware/authenticateToken";
import express from "express";
import * as controllers from "../contollers/workouts";

const router = express.Router();

// GET /api/workouts
router.get("/", authenticateToken, controllers.getAllWorkouts);

// GET /api/workouts/:id
router.get("/:id", authenticateToken, controllers.getWorkoutById);

// POST /api/workouts
router.post("/", authenticateToken, controllers.createWorkout);

// TODO - do I need put??
// PUT api/workouts/:id
// router.put("/:id", authenticateToken, controllers.updateWorkout);

// DELETE api/workouts/:id
router.delete("/:id", authenticateToken, controllers.deleteWorkout);

// PATCH api/workouts/:id
router.patch("/:id", authenticateToken, controllers.updateWorkout);

export default router;
