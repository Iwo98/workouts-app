import { api } from "../axios";
import type { Authenticate } from "@common/types/auth";

export const logIn = async ({ email, password }: Authenticate) =>
  await api.post("auth/login", {
    email,
    password,
  });

export const register = async ({ email, password }: Authenticate) =>
  await api.post("auth/register", {
    email,
    password,
  });

export const getMe = async (): Promise<"authorized" | "guest"> => {
  try {
    const data = await api.get("auth/me");

    return data.status === 200 ? "authorized" : "guest";
  } catch {
    return "guest";
  }
};
