import z from "zod";

export const workoutStatusEnum = z.enum(["done", "planned"]);

export const workoutSchema = z
  .object({
    date: z.iso.datetime(),
    type: z.string().min(1),
    id: z.uuid(),
    duration: z.number().min(1),
    notes: z.string().optional(),
    status: workoutStatusEnum,
  })
  .strict();

export const workoutCreateSchema = workoutSchema.omit({ id: true });
export const workoutUpdateSchema = workoutCreateSchema;
export const workoutPatchSchema = workoutUpdateSchema.partial();

export type WorkoutStatus = z.infer<typeof workoutStatusEnum>;
export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdate = z.infer<typeof workoutUpdateSchema>;
export type WorkoutPatch = z.infer<typeof workoutPatchSchema>;
