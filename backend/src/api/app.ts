import workoutsRouter from "./routes/workouts";
import workoutExerciseRouter from "./routes/workoutExercise";
import authRouter from "./routes/auth";
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use("/api/workouts", workoutsRouter);
app.use("/api/workout-exercise", workoutExerciseRouter);
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
