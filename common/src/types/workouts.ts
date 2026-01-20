import z from "zod";

export const workoutStatusEnum = z.enum(["done", "planned"]);

export const workoutSchema = z
  .object({
    createdAt: z.iso.datetime(),
    date: z.iso.datetime(),
    duration: z.number().min(1),
    id: z.uuid(),
    type: z.string().min(1),
    updatedAt: z.iso.datetime(),
    notes: z.string().optional(),
    status: workoutStatusEnum,
    userId: z.uuid(),
  })
  .strict();

export const workoutCreateSchema = workoutSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const workoutUpdateSchema = workoutCreateSchema;
export const workoutPatchSchema = workoutUpdateSchema.partial();

export type WorkoutStatus = z.infer<typeof workoutStatusEnum>;
export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdate = z.infer<typeof workoutUpdateSchema>;
export type WorkoutPatch = z.infer<typeof workoutPatchSchema>;
