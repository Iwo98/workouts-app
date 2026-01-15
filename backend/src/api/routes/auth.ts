import { generateTokens } from "@/utils/auth/jwt";
import z from "zod";
import { findUserByEmail } from "../contollers/user";
import bcrypt from "bcrypt";
import { prisma } from "@/utils/db";
import { authenticateSchema } from "@/types/auth";

import { Router } from "express";

const router: Router = Router();

router.post("/login", async (req, res) => {
  try {
    const parsed = authenticateSchema.safeParse(req.body);

    if (parsed.error) {
      return res.status(400).json({
        error: "Validation failed",
        details: z.treeifyError(parsed.error),
      });
    }

    const { password, email } = parsed.data;

    if (!email || !password) {
      return res.status(400);
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(403).json("Wrong password or email");
    }

    const { accessToken } = generateTokens(existingUser);

    return res.json({
      accessToken,
    });
  } catch (err) {
    // oxlint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const parsed = authenticateSchema.safeParse(req.body);

    if (parsed.error) {
      return res.status(400).json({
        error: "Validation failed",
        details: z.treeifyError(parsed.error),
      });
    }

    const { password, email } = parsed.data;

    if (!email || !password) {
      return res.status(400);
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400);
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const createdUser = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: email,
      },
    });

    const { accessToken } = generateTokens(createdUser);

    return res.json({
      accessToken,
    });
  } catch (err) {
    // oxlint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
