import z from "zod";

export const setSchema = z
  .object({
    id: z.uuid(),
    workoutExerciseId: z.uuid(),
    weight: z.number(),
    reps: z.number().int().positive(),
    createdAt: z.iso.datetime(),
  })
  .strict();

export type Set = z.infer<typeof setSchema>;
