import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { AuthJwtPayload } from "@backend/types/jwtPayload";
import type { User } from "@common/types/user";

export const generateAccessToken = (user: User) => {
  const payload: AuthJwtPayload = {
    userId: user.id,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "secret_key", {
    expiresIn: "2h",
  });
};

export const generateRefreshToken = () => {
  const token = crypto.randomBytes(16).toString("base64url");
  return token;
};

export const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user);
  // const refreshToken = generateRefreshToken();
  return { accessToken };
};
