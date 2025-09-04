import express from "express";
import {
  workoutCreateSchema,
  workoutUpdateSchema,
  workoutPatchSchema,
} from "@/types/workouts";
import z from "zod";
import { prisma } from "@/lib/prisma";

const router = express.Router();

// GET /api/workouts
router.get("/", async (_, res) => {
  const workouts = await prisma.workout.findMany();

  res.json(workouts);

  console.log("ok");
});

// POST /api/workouts
router.post("/", async (req, res) => {
  const parsed = workoutCreateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: z.treeifyError(parsed.error),
    });
  }

  // workoutsData.push(newWorkout);
  const workout = await prisma.workout.create({
    data: parsed.data,
  });

  return res.status(201).location(`/api/workouts/${workout.id}`).json(workout);
});

// PUT api/workouts/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const parsed = workoutUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid data", issues: z.treeifyError(parsed.error) });
  }

  try {
    const updated = await prisma.workout.update({
      where: { id },
      data: parsed.data,
    });
    return res.status(200).json(updated);
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

// DELETE api/workouts/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.workout.delete({ where: { id } });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

// PATCH api/workouts/:id
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const parsed = workoutPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: "Invalid data", issues: z.treeifyError(parsed.error) });
  }

  try {
    const updated = await prisma.workout.update({
      where: { id },
      data: parsed.data,
    });
    return res.json(updated);
  } catch {
    return res.status(404).json({ error: "Workout not found" });
  }
});

export default router;
