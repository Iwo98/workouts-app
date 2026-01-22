import z from "zod";
import { setSchema } from "./set";

export const workoutExerciseSchema = z
  .object({
    id: z.uuid(),
    workoutId: z.uuid(),
    exerciseId: z.uuid(),
    createdAt: z.iso.datetime(),
    order: z.number().int().positive(),
    sets: z.array(setSchema).optional(),
  })
  .strict();

export const workoutExerciseCreateSchema = workoutExerciseSchema.omit({
  id: true,
  createdAt: true,
});

export const workoutExerciseUpdateSchema = workoutExerciseCreateSchema;
export const workoutExercisePatchSchema = workoutExerciseUpdateSchema.partial();

export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
export type WorkoutExerciseCreate = z.infer<typeof workoutExerciseCreateSchema>;
export type WorkoutExerciseUpdate = z.infer<typeof workoutExerciseUpdateSchema>;
export type WorkoutExercisePatch = z.infer<typeof workoutExercisePatchSchema>;
