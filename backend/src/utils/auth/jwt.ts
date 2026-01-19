import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@/types/user";
import { AuthJwtPayload } from "@/types/jwtPayload";

export const generateAccessToken = (user: User) => {
  const payload: AuthJwtPayload = {
    userId: user.id,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "secret_key");
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
