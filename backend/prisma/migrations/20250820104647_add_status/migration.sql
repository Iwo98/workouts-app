/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "public"."WorkoutStatus" AS ENUM ('done', 'planned');

-- AlterTable
ALTER TABLE "public"."Workout" DROP CONSTRAINT "Workout_pkey",
ADD COLUMN     "status" "public"."WorkoutStatus" NOT NULL DEFAULT 'planned',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Workout_id_seq";
