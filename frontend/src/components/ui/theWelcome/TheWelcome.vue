<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div>
    <h1>Your {{ msg }}</h1>
  </div>
</template>
