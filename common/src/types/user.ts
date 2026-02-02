import z from "zod";
import { refreshTokenSchema } from "./refreshToken";
import { transformDatesSchema } from "@common/utils/transfromDates";
import { workoutSchema } from "./workouts";

export const userSchema = z
  .object({
    createdAt: transformDatesSchema(),
    updatedAt: transformDatesSchema(),
    email: z.email(),
    id: z.uuid(),
    refreshTokens: z.array(refreshTokenSchema).optional(),
    password: z.string(),
    workouts: z.array(workoutSchema).optional(),
  })
  .strict();

export type User = z.infer<typeof userSchema>;
