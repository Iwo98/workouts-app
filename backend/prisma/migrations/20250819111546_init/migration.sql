r-- CreateTable
CREATE TABLE "public"."Workout" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);
