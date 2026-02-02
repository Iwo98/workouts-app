import z from "zod";
import { workoutExerciseSchema } from "./workoutExercise";

export const exerciseSchema = z
  .object({
    id: z.uuid(),
    name: z.string().min(1),
    description: z.string().optional(),
    machine: z.string().optional(),
    imageUrl: z.string().optional(),
    workouts: z.array(workoutExerciseSchema).optional(),
  })
  .strict();

export type Exercise = z.infer<typeof exerciseSchema>;
