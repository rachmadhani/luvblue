<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderNavbar from './components/HeaderNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-blue-50/30">
    <HeaderNavbar />
    <RouterView />
  </div>
</template>

<style>
/* Smooth font transitions */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

