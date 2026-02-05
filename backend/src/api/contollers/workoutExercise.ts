import type { Response } from "express";
import * as service from "@backend/api/services/workoutExercise";
import type { AugmentedRequest } from "../middleware/auth";
import z from "zod";
import { workoutExerciseCreateSchema } from "@common/types/workoutExercise";

export const addExerciseToWorkout = async (
  req: AugmentedRequest,
  res: Response,
) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = workoutExerciseCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: z.treeifyError(parsed.error),
    });
  }

  const payload = {
    data: {
      ...parsed.data,
      userId: userIdFromToken,
    },
  };

  try {
    const workoutExercise = await service.addExerciseToWorkout(payload);

    if (!workoutExercise) {
      return res.status(404).json({ error: "Workout not found" });
    }

    return res.status(201).json({ workoutExercise });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error adding exercise to workout", details: error });
  }
};

export const removeExerciseFromWorkout = async (
  req: AugmentedRequest,
  res: Response,
) => {
  const workoutExerciseId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  if (!workoutExerciseId) {
    return res.sendStatus(404);
  }

  try {
    const deleted = await service.removeWorkoutExerciseFromWorkout({
      workoutExerciseId,
      userId: userIdFromToken,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Workout exercise not found" });
    }

    return res.json({ message: "Exercise removed from workout successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error removing exercise from workout", details: error });
  }
};

// TODO reorder later
// export const reorderExercise = async (req: AugmentedRequest, res: Response) => {
//   if (!req?.userId) {
//     return res.sendStatus(401);
//   }

//   const { newOrder } = req.body;

//   if (newOrder === undefined || typeof newOrder !== "number") {
//     return res.status(400).json({ error: "newOrder is required" });
//   }

//   try {
//     const workoutExercise = await service.reorderExercise({
//       workoutExerciseId: req.params.id,
//       userId: req.userId,
//       newOrder,
//     });

//     if (!workoutExercise) {
//       return res.status(404).json({ error: "Workout exercise not found" });
//     }

//     return res.json({ workoutExercise });
//   } catch (error) {
//     console.error("Error in reorderExercise:", error);
//     return res.status(500).json({ error: "Error reordering exercise" });
//   }
// };
