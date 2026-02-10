import workoutsRouter from "./routes/workouts";
import exercisesRouter from "./routes/exercises";
import workoutExerciseRouter from "./routes/workoutExercise";
import setsRouter from "./routes/sets";
import authRouter from "./routes/auth";
import type { Application } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(cookieParser());

app.use(express.json());
app.use("/api/workouts", workoutsRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/workout-exercise", workoutExerciseRouter);
app.use("/api/sets/", setsRouter);
app.use("/api/auth", authRouter);

// TODO Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: "Coś poszło nie tak!",
//     message: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

export default app;
