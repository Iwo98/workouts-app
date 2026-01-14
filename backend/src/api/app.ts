import workoutsRouter from "./routes/workouts";
import authRouter from "./routes/auth";
import express, { Application } from "express";
import { authenticateToken } from "./middleware/auth";

const app: Application = express();

// app.use(authenticateToken);
app.use(express.json());
app.use("/api/workouts", workoutsRouter);
app.use("/api/auth", authRouter);

export default app;
