<template>
  <ThemeProvider>
    <SidebarProvider>
      <!-- Public pages get HeaderNavbar, admin pages use AdminLayout via router -->
      <div v-if="isPublicRoute" class="min-h-screen bg-blue-50/30">
        <HeaderNavbar />
        <RouterView />
      </div>
      <RouterView v-else />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'

const route = useRoute()

const isPublicRoute = computed(() => {
  return route.meta.layout === 'public'
})
</script>

<style>
/* Smooth font transitions */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
