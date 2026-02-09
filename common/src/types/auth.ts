import { z } from "zod";

// TODO add safer conditions for password
export const authenticateSchema = z
  .object({
    email: z.email(),
    password: z.string(),
  })
  .strict();

export type Authenticate = z.infer<typeof authenticateSchema>;
