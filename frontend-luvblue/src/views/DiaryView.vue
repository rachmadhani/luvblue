<script setup lang="ts">
import { BookOpen, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-[#fdfbf7] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="max-w-4xl mx-auto text-center mb-16">
      <div class="flex items-center justify-center gap-2 text-[#4ebbbb] text-xs font-bold tracking-[0.2em] mb-4">
        <BookOpen :size="14" />
        <span>MY BLUE DIARY</span>
      </div>
      <h1 class="font-script text-5xl md:text-6xl text-[#1e293b] mb-6">
        Turning small daily moments into  <span style="color: #71ccd4">my own blue stories</span> 
      </h1>
      <!-- <p class="italic text-gray-500 text-lg">
        "A gentle breeze awakens my senses, marking the first page of this glowing season."
      </p> -->
    </header>

    <!-- Featured Diary Section -->
    <section class="max-w-5xl mx-auto mb-16">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row shadow-teal-100/50">
        <!-- Featured Image/Visual -->
        <div class="md:w-1/2 bg-[#4ebbbb] relative flex items-center justify-center min-h-[300px]">
          <span class="text-7xl">🌸</span>
          <div class="absolute bottom-4 right-6 text-white/60 text-xs italic">Vol.2</div>
        </div>
        
        <!-- Featured Content -->
        <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div class="inline-block bg-pink-100 text-pink-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-6 max-w-fit">
            SEASONAL DIARY ✦ VOL.2
          </div>
          <h2 class="font-script text-3xl md:text-4xl text-[#1e293b] mb-6">First Spring, First Kiss</h2>
          <p class="text-gray-500 leading-relaxed mb-8">
            The freshness of spring seeps through the warm sunlight, refilling my heart with new energy. Today's spring feels like a tender first greeting — in the warmth of this afternoon, where even a heart carved into old wood feels soft, I find beauty in this peaceful harmony.
          </p>
          <button class="flex items-center gap-2 bg-[#4ebbbb] hover:bg-[#3da3a4] text-white px-6 py-3 rounded-full font-script text-lg transition-all group w-fit">
            Read Full Diary
            <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    <!-- Diary Grid -->
    <section class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
        <div class="h-48 bg-gradient-to-br from-[#71ccd4] to-[#a5f3fc] flex items-center justify-center">
          <span class="text-4xl transform group-hover:scale-110 transition-transform">🌊</span>
        </div>
        <div class="p-6">
          <div class="text-[#71ccd4] text-[10px] font-bold tracking-widest bg-cyan-50 px-2 py-1 rounded mb-4 inline-block">
            BLUE LETTERS
          </div>
          <h3 class="font-script text-2xl text-[#1e293b] mb-4">Letters from the Sea</h3>
          <p class="text-gray-500 text-sm italic mb-6">
            "In the warmth of this afternoon, where even a heart carved into old wood feels soft, I find beauty in peaceful harmony."
          </p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]">Spring 2026</span>
            <a href="#" class="text-[#71ccd4] text-xs italic flex items-center gap-1 hover:underline">
              Read <ArrowRight :size="12" />
            </a>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
        <div class="h-48 bg-[#f9d5e5] flex items-center justify-center">
          <span class="text-4xl transform group-hover:scale-110 transition-transform">♻️</span>
        </div>
        <div class="p-6">
          <div class="text-[#4ebbbb] text-[10px] font-bold tracking-widest bg-teal-50 px-2 py-1 rounded mb-4 inline-block uppercase">
            Small Actions
          </div>
          <h3 class="font-script text-2xl text-[#1e293b] mb-4">Hip Recycling — Make It Cool</h3>
          <p class="text-gray-500 text-sm mb-6 leading-relaxed">
            What if recycling was a lifestyle, not a chore? Let's make sustainability the most stylish thing you do all day.
          </p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]">March 2026</span>
            <a href="#" class="text-[#4ebbbb] text-xs italic flex items-center gap-1 hover:underline">
              Read <ArrowRight :size="12" />
            </a>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
        <div class="h-48 bg-gradient-to-b from-[#e0f2fe] to-white flex items-center justify-center">
          <span class="text-4xl transform group-hover:scale-110 transition-transform">🌷</span>
        </div>
        <div class="p-6">
          <div class="text-pink-400 text-[10px] font-bold tracking-widest bg-pink-50 px-2 py-1 rounded mb-4 inline-block uppercase">
            Seasonal Diary
          </div>
          <h3 class="font-script text-2xl text-[#1e293b] mb-4">A Letter Among the Tulips</h3>
          <p class="text-gray-500 text-sm italic mb-6">
            "Yet, a quiet worry rises — that the shifting pace of seasons might disturb this precious order. I hope this radiant spring never fades."
          </p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]">Spring 2026</span>
            <a href="#" class="text-[#4ebbbb] text-xs italic flex items-center gap-1 hover:underline">
              Read <ArrowRight :size="12" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Button -->
    <div class="flex justify-center">
      <button class="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#4ebbbb] text-gray-700 hover:text-[#4ebbbb] px-8 py-3 rounded-full transition-all shadow-sm">
        <BookOpen :size="18" />
        <span class="font-medium">View All Diary Entries</span>
        <ArrowRight :size="18" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Any specific component-level tweaks if needed */
</style>
