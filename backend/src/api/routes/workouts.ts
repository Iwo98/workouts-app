import {
  workoutCreateSchema,
  workoutUpdateSchema,
  workoutPatchSchema,
} from "@/types/workouts";
import z from "zod";
import { prisma } from "@/utils/db";
import { AugmentedRequest, authenticateToken } from "../middleware/auth";

import express from "express";

const router = express.Router();

// GET /api/workouts
router.get("/", authenticateToken, async (req: AugmentedRequest, res) => {
  if (!req?.userId) {
    return res.sendStatus(401);
  }

  const workouts = await prisma.workout.findMany({
    where: { userId: req.userId },
  });

  return res.json(workouts);
});

// GET /api/workouts/:id
router.get("/:id", authenticateToken, async (req: AugmentedRequest, res) => {
  const id = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const workout = await prisma.workout.findUnique({
    where: { id, userId: userIdFromToken },
  });

  if (workout?.userId !== userIdFromToken) {
    return res.sendStatus(401);
  }

  return res.json(workout);
});

// POST /api/workouts
router.post("/", authenticateToken, async (req: AugmentedRequest, res) => {
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

  // Ensure workout is always created for the authenticated user.
  // Ignore any userId sent by the client and attach server-side.
  const data = {
    ...parsed.data,
    userId: userIdFromToken,
  };
  try {
    const workout = await prisma.workout.create({ data });

    return res
      .status(201)
      .location(`/api/workouts/${workout.id}`)
      .json(workout);
  } catch (err) {
    return res.status(404).json({ error: err });
  }
});

// PUT api/workouts/:id
router.put("/:id", authenticateToken, async (req: AugmentedRequest, res) => {
  const id = req.params.id.toString();
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
    const updated = await prisma.workout.update({
      where: { id, userId: userIdFromToken },
      data: parsed.data,
    });
    return res.status(200).json(updated);
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

// DELETE api/workouts/:id
router.delete("/:id", authenticateToken, async (req: AugmentedRequest, res) => {
  const id = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  try {
    await prisma.workout.delete({ where: { id, userId: userIdFromToken } });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

// PATCH api/workouts/:id
router.patch("/:id", authenticateToken, async (req: AugmentedRequest, res) => {
  const id = req.params.id.toString();
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  const parsed = workoutPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid data", issues: z.treeifyError(parsed.error) });
  }

  try {
    const updated = await prisma.workout.update({
      where: { id, userId: userIdFromToken },
      data: parsed.data,
    });
    return res.json(updated);
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

export default router;
