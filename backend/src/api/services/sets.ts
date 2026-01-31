import { prisma } from "@backend/utils/db";

interface GetAllSetsFromWorkout {
  workoutId: string;
  userId: string;
  exerciseId: string;
}

export const getAllSetsFromWorkoutExercise = ({
  workoutId,
  userId,
  exerciseId,
}: GetAllSetsFromWorkout) => {
  const workout = prisma.workout.findFirst({
    where: { userId, id: workoutId },
  });

  if (!workout) {
    return null;
  }

  const sets = prisma.set.findMany({
    where: { workoutExercise: { exerciseId, workoutId } },
  });

  return sets;
};

interface CreateSetData {
  workoutExerciseId: string;
  userId: string;
  weight: number;
  reps: number;
}

export const createSet = async ({
  workoutExerciseId,
  userId,
  weight,
  reps,
}: CreateSetData) => {
  // Verify workout exercise belongs to user's workout
  const workoutExercise = await prisma.workoutExercise.findFirst({
    where: {
      id: workoutExerciseId,
      workout: { userId },
    },
  });

  if (!workoutExercise) {
    return null;
  }

  return await prisma.set.create({
    data: {
      workoutExerciseId,
      weight,
      reps,
    },
  });
};

interface UpdateSetData {
  setId: string;
  userId: string;
  weight?: number;
  reps?: number;
}

export const updateSet = async ({
  setId,
  userId,
  weight,
  reps,
}: UpdateSetData) => {
  // Verify set belongs to user's workout
  const existingSet = await prisma.set.findFirst({
    where: {
      id: setId,
      workoutExercise: {
        workout: { userId },
      },
    },
  });

  if (!existingSet) {
    return null;
  }

  return await prisma.set.update({
    where: { id: setId },
    data: {
      reps,
      weight,
    },
  });
};

interface DeleteSetData {
  setId: string;
  userId: string;
}

export const deleteSet = async ({ setId, userId }: DeleteSetData) => {
  const existingSet = await prisma.set.findFirst({
    where: {
      id: setId,
      workoutExercise: {
        workout: { userId },
      },
    },
  });

  if (!existingSet) {
    return null;
  }

  await prisma.set.delete({
    where: { id: setId },
  });

  return true;
};
