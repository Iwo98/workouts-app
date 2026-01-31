import { Response } from "express";
import * as service from "@backend/api/services/sets";
import type { AugmentedRequest } from "../middleware/auth";
import { setCreateSchema, setUpdateSchema } from "@common/types/set";
import z from "zod";

export const getAllSetsFromWorkout = async (
  req: AugmentedRequest,
  res: Response,
) => {
  const userIdFromToken = req?.userId;
  const workoutId = req.params.id.toString();

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const set = await service.getAllSetsFromWorkoutExercise({
      exerciseId: "as",
      userId: userIdFromToken,
      workoutId,
    });

    if (!set) {
      return res.status(404).json({ error: "Workout exercise not found" });
    }

    return res.status(201).json({ set });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating set", details: error });
  }
};

export const createSet = async (req: AugmentedRequest, res: Response) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = setCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: z.treeifyError(parsed.error),
    });
  }

  try {
    const set = await service.createSet({
      workoutExerciseId: parsed.data.workoutExerciseId,
      userId: userIdFromToken,
      weight: parsed.data.weight,
      reps: parsed.data.reps,
    });

    if (!set) {
      return res.status(404).json({ error: "Workout exercise not found" });
    }

    return res.status(201).json({ set });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating set", details: error });
  }
};

export const updateSet = async (req: AugmentedRequest, res: Response) => {
  const setId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = setUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: z.treeifyError(parsed.error),
    });
  }

  try {
    const set = await service.updateSet({
      setId,
      userId: userIdFromToken,
      weight: parsed.data?.weight,
      reps: parsed.data?.reps,
    });

    if (!set) {
      return res.status(404).json({ error: "Set not found" });
    }

    return res.json({ set });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating set", details: error });
  }
};

export const deleteSet = async (req: AugmentedRequest, res: Response) => {
  const setId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const deleted = await service.deleteSet({
      setId,
      userId: userIdFromToken,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Set not found" });
    }

    return res.json({ message: "Set deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error deleting set", details: error });
  }
};
