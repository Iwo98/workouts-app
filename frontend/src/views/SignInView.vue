<script setup lang="ts">
import TheWelcome from "@frontend/components/ui/theWelcome/TheWelcome.vue";
import { RouterLink, RouterView } from "vue-router";
import { Button } from "@frontend/components/ui/button";
import { ref } from "vue";
import { workoutExerciseCreateSchema } from "@common/types/workoutExercise";

const count = ref<number>(0);
const parsed = workoutExerciseCreateSchema.parse(count);
</script>

<template>
  <div>
    <TheWelcome msg="Tutaj" />
    <RouterLink to="/log-in">Log In</RouterLink>
    <Button as="button" @click="count++" variant="outline">Button</Button>
    <div>{{ count }}</div>
  </div>
</template>
