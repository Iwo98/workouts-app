import { prisma } from "@backend/utils/db";
import { type WorkoutCreate, type WorkoutUpdate } from "@common/types/workouts";

interface GetWorkoutsServicePayload {
  userId: string;
}

export const getWorkouts = async ({ userId }: GetWorkoutsServicePayload) => {
  const workouts = await prisma.workout.findMany({
    where: { userId: userId },
  });

  return workouts;
};

interface GetWorkoutByIdService {
  userId: string;
  workoutId: string;
}

export const getWorkoutById = async ({
  userId,
  workoutId,
}: GetWorkoutByIdService) => {
  const workout = await prisma.workout.findUnique({
    where: { id: workoutId, userId },
  });

  return workout;
};

interface CreateWorkoutServiceData extends WorkoutCreate {
  userId: string;
}

export interface CreateWorkoutServicePayload {
  data: CreateWorkoutServiceData;
}

export const createWorkout = async ({ data }: CreateWorkoutServicePayload) => {
  const { workoutExercises = [], userId, ...rest } = data;

  const prismaData = {
    ...rest,
    userId,
    workoutExercises: {
      create: workoutExercises.map((workout) => ({
        order: workout.order,
        exercise: { connect: { id: workout.exerciseId } },
        sets: workout.sets
          ? {
              create: workout.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps,
              })),
            }
          : undefined,
      })),
    },
  };

  const workout = await prisma.workout.create({
    data: prismaData,
    include: {
      workoutExercises: {
        include: {
          exercise: true,
          sets: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return workout;
};

interface UpdateWorkoutServiceData extends WorkoutUpdate {
  id: string;
  userId: string;
}

export interface UpdateWorkoutServicePayload {
  data: UpdateWorkoutServiceData;
}

export const updateWorkoutService = async ({
  data,
}: UpdateWorkoutServicePayload) => {
  const workout = await prisma.workout.update({
    where: { id: data.id, userId: data.userId },
    data,
    include: {
      workoutExercises: {
        include: {
          exercise: true,
          sets: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  return workout;
};

interface DeleteWorkoutServicePayload {
  workoutId: string;
  userId: string;
}

export const deleteWorkout = async ({
  workoutId,
  userId,
}: DeleteWorkoutServicePayload) => {
  const deleted = await prisma.workout.delete({
    where: { id: workoutId, userId },
  });

  return !!deleted;
};
