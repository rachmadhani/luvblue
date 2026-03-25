<script setup lang="ts">
import { ref, computed } from 'vue'

const photosShared = 128
const heartPixels = 500
const heartFilled = 26

// Heart shape defined as a bitmap mask
// Each row is an array of [startCol, endCol] ranges that are "filled"
// Grid: 25 rows x 25 cols = perfect heart with ~500 pixels
const gridRows = 25
const gridCols = 25

// Pixel-perfect heart mask: each entry is [startCol, endCol] (inclusive)
// Two bumps at top, merging in middle, tapering to a point at bottom
// Total pixels: ~500
const heartMask: [number, number][][] = [
  // Row 0: two small bumps starting
  [[3, 10], [14, 21]],          // 8 + 8 = 16
  // Row 1: bumps widen
  [[1, 11], [13, 23]],          // 11 + 11 = 22
  // Row 2: bumps merge
  [[0, 24]],                     // 25
  // Row 3
  [[0, 24]],                     // 25
  // Row 4
  [[0, 24]],                     // 25
  // Row 5
  [[0, 24]],                     // 25
  // Row 6
  [[0, 24]],                     // 25
  // Row 7
  [[0, 24]],                     // 25
  // Row 8
  [[0, 24]],                     // 25
  // Row 9
  [[0, 24]],                     // 25
  // Row 10
  [[0, 24]],                     // 25
  // Row 11
  [[1, 23]],                     // 23
  // Row 12
  [[1, 23]],                     // 23
  // Row 13
  [[2, 22]],                     // 21
  // Row 14
  [[2, 22]],                     // 21
  // Row 15
  [[3, 21]],                     // 19
  // Row 16
  [[4, 20]],                     // 17
  // Row 17
  [[5, 19]],                     // 15
  // Row 18
  [[6, 18]],                     // 13
  // Row 19
  [[7, 17]],                     // 11
  // Row 20
  [[8, 16]],                     // 9
  // Row 21
  [[9, 15]],                     // 7
  // Row 22
  [[10, 14]],                    // 5
  // Row 23
  [[11, 13]],                    // 3
  // Row 24: tip
  [[12, 12]],                    // 1
]

const pixels = computed(() => {
  const result: { r: number; c: number; opacity: number; username: string }[] = []
  
  for (let r = 0; r < heartMask.length; r++) {
    const ranges = heartMask[r]
    if (!ranges) continue
    for (const [start, end] of ranges) {
      for (let c = start; c <= end; c++) {
        result.push({
          r,
          c,
          opacity: 0.3 + Math.random() * 0.6,
          username: `@user_${result.length + 1}`
        })
      }
    }
  }
  
  return result
})

const hoveredPixel = ref<any>(null)
</script>

<template>
  <main class="min-h-screen pt-16 pb-24 px-4 bg-blue-50/30">
    <!-- Header -->
    <header class="text-center mb-12">
      <p class="text-[10px] tracking-[0.3em] font-semibold text-blue-900/60 uppercase mb-4">
        #LOVEBLUE · ECOSOFT INTERACTIVE
      </p>
      <h1 class="text-5xl md:text-6xl font-serif text-blue-950 mb-4 leading-tight">
        Every blue moment <br />
        <span class="italic">fills our heart.</span>
      </h1>
      <p class="text-slate-500 text-sm max-w-md mx-auto">
        500 photos from our community, each one a pixel of love for our blue planet.
      </p>
    </header>

    <!-- Heart Grid -->
    <div class="relative max-w-4xl mx-auto flex justify-center mb-16">
      <div 
        class="grid gap-1.5"
        :style="{ 
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          width: 'clamp(300px, 90vw, 800px)'
        }"
      >
        <!-- Background Grid (Lightly visible) -->
        <div 
          v-for="i in gridRows * gridCols" 
          :key="i"
          class="aspect-square rounded-[3px] bg-blue-100/10 border border-blue-500/5"
        ></div>

        <!-- Heart Pixels -->
        <div
          v-for="pixel in pixels"
          :key="`${pixel.r}-${pixel.c}`"
          class="absolute aspect-square rounded-[3px] bg-blue-500 cursor-pointer transition-all duration-300 hover:scale-150 hover:z-20 group"
          :style="{
            top: `calc(${pixel.r} * (100% / ${gridRows}))`,
            left: `calc(${pixel.c} * (100% / ${gridCols}))`,
            width: `calc(100% / ${gridCols} - 3px)`,
            opacity: pixel.opacity
          }"
          @mouseenter="hoveredPixel = pixel"
          @mouseleave="hoveredPixel = null"
        >
          <!-- Tooltip -->
          <div 
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#1a2b3c] text-white text-[10px] rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30"
          >
            {{ pixel.username }}
            <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#1a2b3c]"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
      <div class="text-center relative">
        <div class="font-serif text-3xl text-blue-900">{{ photosShared }}</div>
        <div class="text-[9px] tracking-widest text-blue-900/40 font-bold uppercase">Photos Shared</div>
      </div>
      <div class="w-px h-8 bg-blue-100 hidden md:block"></div>
      <div class="text-center">
        <div class="font-serif text-3xl text-blue-900">{{ heartPixels }}</div>
        <div class="text-[9px] tracking-widest text-blue-900/40 font-bold uppercase">Heart Pixels</div>
      </div>
      <div class="w-px h-8 bg-blue-100 hidden md:block"></div>
      <div class="text-center">
        <div class="font-serif text-3xl text-blue-900">{{ heartFilled }}%</div>
        <div class="text-[9px] tracking-widest text-blue-900/40 font-bold uppercase">Heart Filled</div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="text-center">
      <button class="bg-[#2D6CAD] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 mx-auto transition-all shadow-lg hover:shadow-blue-200 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
        </svg>
        Add your blue moment
      </button>
      <p class="mt-4 text-[10px] text-slate-400 font-medium pb-24">
        Post on Instagram with <span class="text-blue-500">#LoveBlue</span> and tag <span class="text-blue-500">@ashley_loveblue</span>
      </p>
    </div>
  </main>
</template>

<style>
/* Smooth font transitions */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
