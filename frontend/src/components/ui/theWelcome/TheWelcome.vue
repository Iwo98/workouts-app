<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div>
    <h1 class="green">Your {{ msg }}</h1>
    <h3 class="bg-amber-400">Let's get this party started</h3>
  </div>
</template>
