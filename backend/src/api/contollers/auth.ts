import { generateTokens } from "@backend/utils/auth/jwt";
import { authenticateSchema } from "@common/types/auth";
import z from "zod";
import type { AugmentedRequest } from "../middleware/authenticateToken";
import type { Response } from "express";
import bcrypt from "bcrypt";
import * as services from "../services/user";

export const logIn = async (req: AugmentedRequest, res: Response) => {
  try {
    const parsed = authenticateSchema.safeParse(req.body);

    if (parsed.error) {
      return res.status(400).json({
        error: "Validation failed",
        details: z.treeifyError(parsed.error),
      });
    }

    const { password, email } = parsed.data;

    const existingUser = await services.findUserByEmail(email);

    if (!existingUser) {
      return res.status(404).json({ error: "Wrong email or password" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(404).json({ error: "Wrong email or password" });
    }

    const { accessToken } = generateTokens(existingUser);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ message: "Logged in succesfully!" });
  } catch (err) {
    // oxlint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: AugmentedRequest, res: Response) => {
  try {
    const parsed = authenticateSchema.safeParse(req.body);

    if (parsed.error) {
      return res.status(400).json({
        error: "Validation failed",
        details: z.treeifyError(parsed.error),
      });
    }

    const { password, email } = parsed.data;

    const existingUser = await services.findUserByEmail(email);

    if (existingUser) {
      return res.status(404);
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const createdUser = await services.createUser({
      email,
      password: hashedPassword,
    });

    const { accessToken } = generateTokens(createdUser);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ message: "Signed in succesfully!" });
  } catch (err) {
    // oxlint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req: AugmentedRequest, res: Response) => {
  const userIdFromToken = req?.userId;

  if (!userIdFromToken) {
    return res.sendStatus(401);
  }

  return res.json({ message: "Logged in!" });
};
