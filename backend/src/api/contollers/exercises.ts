import type { Response } from "express";
import type { AugmentedRequest } from "../middleware/authenticateToken";
import * as service from "@backend/api/services/exercises";

export const getAllExercises = async (req: AugmentedRequest, res: Response) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const workouts = await service.getExercises();
    return res.json(workouts);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while getting all exercises", details: { error } });
  }
};

export const getExerciseById = async (req: AugmentedRequest, res: Response) => {
  const exerciseId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const exercise = await service.getExerciseById({
      exerciseId,
    });

    if (exercise) {
      return res.json(exercise);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while getting exercise", details: { error } });
  }
};
