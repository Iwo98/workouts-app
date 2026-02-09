import type { AuthJwtPayload } from "@backend/types/jwtPayload";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AugmentedRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AugmentedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.accessToken as string;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET || "secret_key",
    (err, decoded) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      req.userId = (decoded as AuthJwtPayload).userId;
      next();
    },
  );
};
