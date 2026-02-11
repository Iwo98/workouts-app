<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@frontend/components/ui/button";
import { Badge } from "@frontend/components/ui/badge";

type MockSet = { reps: number; weight: string };
type MockExercise = { name: string; sets: MockSet[] };
type MockWorkout = {
  id: string;
  name: string;
  date: string;
  exercises: MockExercise[];
};

const workouts = ref<MockWorkout[]>([
  {
    id: "w1",
    name: "Full Body Blast",
    date: "2026-02-10T10:30:00.000Z",
    exercises: [
      {
        name: "Squat",
        sets: [
          { reps: 8, weight: "80kg" },
          { reps: 6, weight: "85kg" },
          { reps: 6, weight: "85kg" },
          { reps: 6, weight: "85kg" },
          { reps: 6, weight: "85kg" },
          { reps: 6, weight: "85kg" },
        ],
      },
      {
        name: "Bench Press",
        sets: [
          { reps: 8, weight: "60kg" },
          { reps: 6, weight: "65kg" },
        ],
      },
    ],
  },
  {
    id: "w2",
    name: "Upper Strength",
    date: "2026-02-08T18:00:00.000Z",
    exercises: [
      {
        name: "Pull Ups",
        sets: [
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
        ],
      },
      {
        name: "Pull Ups",
        sets: [
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
        ],
      },
      {
        name: "Pull Ups",
        sets: [
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
        ],
      },
      {
        name: "Pull Ups",
        sets: [
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
          { reps: 5, weight: "body" },
        ],
      },
      { name: "OHP", sets: [{ reps: 6, weight: "40kg" }] },
    ],
  },
  {
    id: "w3",
    name: "Leg Day",
    date: "2026-02-06T08:15:00.000Z",
    exercises: [
      { name: "Deadlift", sets: [{ reps: 5, weight: "120kg" }] },
      {
        name: "Lunge",
        sets: [
          { reps: 10, weight: "20kg" },
          { reps: 10, weight: "20kg" },
        ],
      },
    ],
  },
]);

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString() : "";
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Action buttons (stacked vertically) -->
    <div class="flex flex-col gap-3 mb-6">
      <Button variant="default" size="lg" class="w-full">Start workout</Button>
      <Button variant="secondary" size="lg" class="w-full">Plan Workout</Button>
      <Button variant="link" size="lg" class="w-full"
        >See previous workouts</Button
      >
    </div>

    <!-- Last workouts section -->
    <h4 class="text-lg font-medium mb-3">Your last 3 workouts</h4>
    <div class="grid gap-3">
      <div
        v-for="workout in workouts"
        :key="workout.id"
        class="flex flex-col justify-between gap-3 p-3 rounded-lg border bg-background shadow-sm"
      >
        <div class="min-w-0">
          <div class="flex items-baseline justify-between gap-3">
            <div class="truncate font-semibold text-sm text-foreground">
              {{ workout.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ formatDate(workout.date) }}
            </div>
          </div>

          <div class="mt-2 space-y-3">
            <div
              v-for="exercise in workout.exercises"
              :key="exercise.name"
              class="grid gap-4 grid-cols-[minmax(0,_auto)_minmax(auto,_100%)]"
            >
              <div class="text-xs text-foreground truncate">
                {{ exercise.name }}
              </div>
              <div class="flex gap-1 flex-wrap flex-row justify-end">
                <Badge
                  class="bg-tertiary"
                  v-for="(s, i) in exercise.sets"
                  :key="i"
                  variant="outline"
                  >{{ s.reps }} x {{ s.weight }}</Badge
                >
              </div>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <Button variant="outline" size="sm" class="">Use workout</Button>
        </div>
      </div>
    </div>
  </div>
</template>
