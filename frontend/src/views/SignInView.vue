<script setup lang="ts">
import TheWelcome from "@frontend/components/ui/theWelcome/TheWelcome.vue";
import { RouterLink, RouterView } from "vue-router";
import { Button } from "@frontend/components/ui/button";
import { ref } from "vue";

const count = ref<number>(0);
</script>

<template>
  <div>
    <TheWelcome msg="Tutaj" />
    <RouterLink to="/log-in">Log In</RouterLink>
    <Button as="button" @click="count++" variant="outline">Button</Button>
    <div>{{ count }}</div>
  </div>
</template>
