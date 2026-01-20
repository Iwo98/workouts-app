import { workoutCreateSchema } from "@common/types/workouts";

let test = 67;
test += 7;

const parsed = workoutCreateSchema.safeParse({ ok: test });
// oxlint-disable-next-line no-console
console.log(parsed);
