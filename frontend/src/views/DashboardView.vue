<script setup lang="ts">
import type { Workout } from "@common/types/workout";
import { Button } from "@frontend/components/ui/button";
import { api } from "@frontend/lib/api/axios";
import { ref } from "vue";

const workouts = ref<Workout[]>([]);

const getWorkouts = async () => {
  const result = await api.get("workouts");

  workouts.value = result.data;
};
</script>

<template>
  <div class="flex gap-3 flex-col items-start p-4">
    <h1 class="fill-primary justify-self-center">Dashboard</h1>
    <Button
      as="button"
      @click="getWorkouts"
      variant="secondary"
      size="default"
      class="w-full mt-2"
      >Get workouts</Button
    >
    <div v-for="workout in workouts">
      <div>{{ workout.name }}</div>
    </div>
  </div>
</template>
