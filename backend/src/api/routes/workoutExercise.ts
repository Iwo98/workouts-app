// routes/workout-exercises.ts
import { Router } from "express";
import { authenticateToken } from "@backend/api/middleware/auth";
import * as controllers from "@backend/api/contollers/workoutExercise";

const router = Router();

// Add exercise to workout
router.post("/", authenticateToken, controllers.addExerciseToWorkout);

// Remove exercise from workout
router.delete("/:id", authenticateToken, controllers.removeExerciseFromWorkout);

// TODO check reoder Reorder exercise in workout
// router.patch("/:id/reorder", authenticateToken, controllers.reorderExercise);

export default router;
