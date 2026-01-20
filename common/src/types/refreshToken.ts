import z from "zod";

export const refreshTokenSchema = z
  .object({
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    expireAt: z.iso.datetime(),
    revoked: z.boolean(),
    id: z.uuid(),
    userId: z.string(),
    hashedToken: z.string(),
  })
  .strict();

export type RefreshToken = z.infer<typeof refreshTokenSchema>;
