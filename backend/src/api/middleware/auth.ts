import { AuthJwtPayload } from "@/types/jwtPayload";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AugmentedRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AugmentedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET || "secret_key",
    (err, decoded) => {
      console.log(err);
      if (err) {
        res.sendStatus(403);
        return;
      }

      req.userId = (decoded as AuthJwtPayload).userId;
      next();
    },
  );
};
