/*
  Warnings:

  - You are about to drop the column `duration` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "WorkoutStatus" ADD VALUE 'active';

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "duration",
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Unnamed Workout';