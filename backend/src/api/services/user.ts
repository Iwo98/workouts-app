import { prisma } from "@backend/utils/db";
import type { Authenticate } from "@common/types/auth";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async ({ email, password }: Authenticate) => {
  const createdUser = await prisma.user.create({
    data: {
      password: password,
      email: email,
    },
  });

  return createdUser;
};
