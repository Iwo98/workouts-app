<script setup lang="ts">
import TheWelcome from "@frontend/components/ui/theWelcome/TheWelcome.vue";
import { RouterLink, RouterView } from "vue-router";
import { Button } from "@frontend/components/ui/button";
import { ref } from "vue";

const count = ref<number>(0);
</script>

<template>
  <div>
    <div class="p-2 flex gap-1 flex-col">
      <TheWelcome msg="Tutaj" />
      <TheWelcome class="bg-secondary rounded-xs" msg="Tutaj" />
      <TheWelcome class="bg-secondary rounded-sms p-1" msg="Tutaj" />
      <TheWelcome class="bg-secondary rounded-md" msg="Tutaj" />
      <TheWelcome class="bg-secondary rounded-xl" msg="Tutaj" />
      <TheWelcome class="bg-primary" msg="Tutaj" />
      <TheWelcome class="bg-tertiary" msg="Tutaj" />
      <RouterLink to="/log-in">Log In</RouterLink>
    </div>
    <Button as="button" @click="count++" variant="default">Button</Button>
    <Button as="button" @click="count++" variant="destructive">Button</Button>
    <Button as="button" @click="count++" variant="ghost">Button</Button>
    <Button as="button" @click="count++" variant="link">Button</Button>
    <Button as="button" @click="count++" variant="outline">Button</Button>
    <Button as="button" @click="count++" variant="secondary">Button</Button>
    <Button as="button" @click="count++" variant="secondary">Button</Button>
    <div class="rounded-xl w-4">{{ count }}</div>
  </div>
</template>
