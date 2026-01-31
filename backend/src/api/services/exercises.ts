import { prisma } from "@backend/utils/db";

export const getExercises = async () => {
  const workouts = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
  });

  return workouts;
};

interface GetExerciseById {
  exerciseId: string;
}

export const getExerciseById = async ({ exerciseId }: GetExerciseById) => {
  const workout = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  });

  return workout;
};
