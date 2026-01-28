import { prisma } from "@backend/utils/db";

// interface ReorderExerciseData {
//   workoutExerciseId: string;
//   userId: string;
//   newOrder: number;
// }

interface AddExerciseData {
  workoutId: string;
  userId: string;
  exerciseId: string;
  order?: number;
}

interface AddExerciseToWorkout {
  data: AddExerciseData;
}

export const addExerciseToWorkout = async ({ data }: AddExerciseToWorkout) => {
  const { workoutId, userId, exerciseId, order } = data;

  // Verify workout belongs to user
  const workout = await prisma.workout.findFirst({
    where: { id: workoutId, userId },
  });

  if (!workout) {
    return null;
  }

  // If order not provided, set as next
  let exerciseOrder = order;
  if (exerciseOrder === undefined) {
    const lastExercise = await prisma.workoutExercise.findFirst({
      where: { workoutId },
      orderBy: { order: "desc" },
    });
    exerciseOrder = lastExercise ? lastExercise.order + 1 : 0;
  }

  return await prisma.workoutExercise.create({
    data: {
      workoutId,
      exerciseId,
      order: exerciseOrder,
    },
    include: {
      exercise: true,
      sets: true,
    },
  });
};

interface RemoveExerciseData {
  workoutExerciseId: string;
  userId: string;
}

export const removeWorkoutExerciseFromWorkout = async ({
  workoutExerciseId,
  userId,
}: RemoveExerciseData) => {
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

  await prisma.workoutExercise.delete({
    where: { id: workoutExerciseId },
  });

  return true;
};

// TODO reorder later
// export const reorderExercise = async (data: ReorderExerciseData) => {
//   const { workoutExerciseId, userId, newOrder } = data;

//   // Verify workout exercise belongs to user's workout
//   const workoutExercise = await prisma.workoutExercise.findFirst({
//     where: {
//       id: workoutExerciseId,
//       workout: { userId },
//     },
//   });

//   if (!workoutExercise) {
//     return null;
//   }

//   return await prisma.workoutExercise.update({
//     where: { id: workoutExerciseId },
//     data: { order: newOrder },
//     include: {
//       exercise: true,
//       sets: true,
//     },
//   });
// };
