import express from "express";
import workoutsRouter from "./routes/workouts";

const app = express();

console.log("test");

app.use(express.json());
app.use("/api/workouts", workoutsRouter);

export default app;
