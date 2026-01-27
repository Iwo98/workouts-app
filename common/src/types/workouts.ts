import z from "zod";
import { workoutExerciseSchema } from "./workoutExercise";

export const workoutStatusEnum = z.enum(["active", "done", "planned"]);

export const workoutSchema = z
  .object({
    createdAt: z.iso.datetime(),
    date: z.iso.datetime(),
    id: z.uuid(),
    type: z.string().min(1),
    updatedAt: z.iso.datetime(),
    notes: z.string().optional(),
    name: z.string().min(1),
    status: workoutStatusEnum,
    userId: z.uuid(),
    workoutExercises: z.array(workoutExerciseSchema).optional(),
  })
  .strict();

export const workoutCreateSchema = workoutSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const workoutUpdateSchema = workoutSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    workoutExercises: true,
  })
  .partial();

export const workoutPatchSchema = workoutUpdateSchema.partial();

export type WorkoutStatus = z.infer<typeof workoutStatusEnum>;
export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdate = z.infer<typeof workoutUpdateSchema>;
export type WorkoutPatch = z.infer<typeof workoutPatchSchema>;
