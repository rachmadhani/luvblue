<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width || 24"
    :height="height || 24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>
