<template>
  <ThemeProvider>
    <SidebarProvider>
      <!-- Public pages get HeaderNavbar, admin pages use AdminLayout via router -->
      <div v-if="isPublicRoute" class="min-h-screen bg-blue-50/30">
        <HeaderNavbar />
        <RouterView v-slot="{ Component }">
          <Transition :name="route.name === 'Home' ? '' : 'page-fade'" mode="out-in" appear>
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
        <TheCollab />
        <TheFooter />
      </div>
      <RouterView v-else v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'
import TheCollab from './components/layout/TheCollab.vue'
import TheFooter from './components/layout/TheFooter.vue'

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

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
