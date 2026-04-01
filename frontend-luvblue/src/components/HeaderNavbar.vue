<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const openDropdown = ref<string | null>(null)

const navLinks = [
  { name: 'Our Story', to: { name: 'About' } },
  { 
    name: 'Daily Blue', 
    children: [
      { name: 'Blue Diary', to: { name: 'BlueDiary' } }
    ]
  },
  { 
    name: 'Blue Campaign', 
    children: [
      { name: 'Blue Heart', to: { name: 'Home' } }
    ]
  },
  { name: 'Blue Gallery', to: { name: 'Gallery' } },
  { name: 'Join Us', to: { name: 'Signup' } }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  openDropdown.value = null
}

const toggleDropdown = (name: string) => {
  if (openDropdown.value === name) {
    openDropdown.value = null
  } else {
    openDropdown.value = name
  }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-blue-100/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <RouterLink :to="{ name: 'Home' }" class="flex-shrink-0 flex items-center">
          <img src="/logo/LUVBLU.png" alt="LUVBLU Logo" class="h-36 w-auto object-contain" />
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <template v-for="link in navLinks" :key="link.name">
            <!-- Simple Link -->
            <RouterLink v-if="!link.children" :to="link.to" 
               class="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
               active-class="text-blue-600">
              {{ link.name }}
            </RouterLink>

            <!-- Dropdown Link -->
            <div v-else class="relative group">
              <button @click="toggleDropdown(link.name)" 
                class="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {{ link.name }}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              
              <div class="absolute left-0 mt-2 w-48 bg-white border border-blue-50 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <RouterLink v-for="child in link.children" :key="child.name" :to="child.to"
                  class="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                  {{ child.name }}
                </RouterLink>
              </div>
            </div>
          </template>

          <RouterLink :to="{ name: 'Signin' }" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-blue-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add Moment
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-slate-600 hover:text-blue-600 p-2">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-blue-50 py-4 px-4 space-y-1">
        <template v-for="link in navLinks" :key="link.name">
          <RouterLink v-if="!link.children" :to="link.to" 
             @click="isMenuOpen = false"
             class="block px-3 py-2.5 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
             active-class="text-blue-600 bg-blue-50/50">
            {{ link.name }}
          </RouterLink>

          <div v-else class="space-y-1">
            <button @click="toggleDropdown(link.name)"
              class="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all">
              {{ link.name }}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': openDropdown === link.name }" class="transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="openDropdown === link.name" class="pl-6 space-y-1 pb-2">
              <RouterLink v-for="child in link.children" :key="child.name" :to="child.to"
                @click="isMenuOpen = false"
                class="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all">
                {{ child.name }}
              </RouterLink>
            </div>
          </div>
        </template>
        <div class="pt-4 pb-2">
          <RouterLink :to="{ name: 'Signin' }" @click="isMenuOpen = false" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add Moment
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Scoped styles if needed */
</style>
