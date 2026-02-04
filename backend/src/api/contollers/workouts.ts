import type { Response } from "express";
import type { AugmentedRequest } from "../middleware/auth";
import { prisma } from "@backend/utils/db";
import * as service from "@backend/api/services/workouts";
import z from "zod";
import {
  workoutCreateSchema,
  workoutUpdateSchema,
} from "@common/types/workout";

export const getAllWorkouts = async (req: AugmentedRequest, res: Response) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  // TODO more sophisticated query params
  //   const { status, startDate, endDate, limit = "50" } = req.query;
  try {
    const workouts = await service.getWorkouts({ userId: userIdFromToken });
    return res.json(workouts);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while getting workouts", details: { error } });
  }
};

export const getWorkoutById = async (req: AugmentedRequest, res: Response) => {
  const workoutId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const workout = await service.getWorkoutById({
      userId: userIdFromToken,
      workoutId,
    });

    if (workout) {
      return res.json(workout);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while getting workout", details: { error } });
  }
};

export const createWorkout = async (req: AugmentedRequest, res: Response) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = workoutCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: z.treeifyError(parsed.error),
    });
  }

  try {
    const workout = await service.createWorkout({
      data: {
        ...parsed.data,
        userId: userIdFromToken,
      },
    });

    return res
      .status(201)
      .location(`/api/workouts/${workout.id}`)
      .json(workout);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while creating workout", details: { error } });
  }
};

export const updateWorkout = async (req: AugmentedRequest, res: Response) => {
  const workoutId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = workoutUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid data", issues: z.treeifyError(parsed.error) });
  }

  try {
    const existingWorkout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: req.userId,
      },
    });

    // TODO check if necessary
    if (!existingWorkout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const workout = await service.updateWorkoutService({
      data: { ...parsed.data, id: workoutId, userId: userIdFromToken },
    });

    return res.status(200).json(workout);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while updating workout", details: { error } });
  }
};

export const deleteWorkout = async (req: AugmentedRequest, res: Response) => {
  const workoutId = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    const deleted = await service.deleteWorkout({
      workoutId,
      userId: userIdFromToken,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Workout not found" });
    }

    return res.status(201).json({ message: "Workout deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while deleting workout", details: { error } });
  }
};
