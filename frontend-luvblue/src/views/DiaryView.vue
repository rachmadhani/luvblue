<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookOpen, ArrowRight } from 'lucide-vue-next'
import { diaryService } from '@/services/diaryService'
import { getImageUrl } from '@/utils/imageUrl'

const latestDiary = ref<any>(null)
const gridDiaries = ref<any[]>([])

const fetchDiaries = async () => {
  try {
    const response: any = await diaryService.getAll(1, 4) // Fetch up to 4 items
    if (response.success) {
      const data = Array.isArray(response.data) ? response.data : response.data?.data
      if (data && data.length > 0) {
        latestDiary.value = data[0]
        gridDiaries.value = data.slice(1) // Remaining for the grid
      }
    }
  } catch (error) {
    console.error('Failed to fetch diaries:', error)
  }
}

onMounted(() => {
  fetchDiaries()
})
</script>

<template>
  <div class="min-h-screen bg-[#fdfbf7] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="max-w-4xl mx-auto text-center mb-16">
      <div class="flex items-center justify-center gap-2 text-[#4ebbbb] text-xs font-bold tracking-[0.2em] mb-4">
        <BookOpen :size="14" />
        <span>MY BLUE DIARY</span>
      </div>
      <h1 class="font-serif text-5xl md:text-6xl text-[#1e293b] mb-6 leading-tight">
        Turning small daily moments into  <span style="color: #71ccd4">my own blue stories</span> 
      </h1>
      <!-- <p class="italic text-gray-500 text-lg">
        "A gentle breeze awakens my senses, marking the first page of this glowing season."
      </p> -->
    </header>

    <!-- Featured Diary Section -->
    <section v-if="latestDiary" class="max-w-5xl mx-auto mb-16">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row shadow-teal-100/50 min-h-[400px]">
        <!-- Featured Image/Visual -->
        <div class="md:w-1/2 relative flex items-center justify-center min-h-[300px] bg-gray-100">
          <!-- Fallback color if no image -->
          <div class="absolute inset-0 bg-[#4ebbbb]" v-if="!latestDiary.diary_image_url"></div>
          <img 
            v-if="latestDiary.diary_image_url" 
            :src="getImageUrl(latestDiary.diary_image_url)" 
            class="absolute inset-0 w-full h-full object-cover" 
            alt="Featured Diary"
            loading="lazy"
          />
          <span v-if="!latestDiary.diary_image_url" class="text-7xl z-10 relative">🌸</span>
          <!-- Optional badge inside image if you had one -->
        </div>
        
        <!-- Featured Content -->
        <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div class="inline-block bg-pink-100 text-pink-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-6 max-w-fit uppercase">
            {{ latestDiary.diary_title || 'SEASONAL DIARY ✦ VOL.2' }}
          </div>
          <h2 class="font-serif text-3xl md:text-4xl text-[#1e293b] mb-6">
            {{ latestDiary.diary_brief_title || 'First Spring, First Kiss' }}
          </h2>
          <p class="text-gray-500 leading-relaxed mb-8">
            {{ latestDiary.diary_brief_description || 'The freshness of spring seeps through the warm sunlight, refilling my heart with new energy. Today\'s spring feels like a tender first greeting — in the warmth of this afternoon, where even a heart carved into old wood feels soft, I find beauty in this peaceful harmony.' }}
          </p>
          <a :href="latestDiary.diary_instagram_link || '#'" target="_blank" class="flex items-center gap-2 bg-[#4ebbbb] hover:bg-[#3da3a4] text-white px-6 py-3 rounded-full font-serif text-lg transition-all group w-fit">
            Read Full Diary
            <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>

    <!-- Diary Grid -->
    <section v-if="gridDiaries.length > 0" class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div v-for="diary in gridDiaries" :key="diary.id" class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
        <div class="h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden bg-gray-100">
          <div class="absolute inset-0 bg-gradient-to-br from-[#71ccd4] to-[#a5f3fc]" v-if="!diary.diary_image_url"></div>
          <img 
            v-if="diary.diary_image_url" 
            :src="getImageUrl(diary.diary_image_url)" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Diary Thumbnail"
            loading="lazy"
          />
          <span v-if="!diary.diary_image_url" class="text-4xl transform group-hover:scale-110 transition-transform relative z-10">🌊</span>
        </div>
        <div class="p-6 flex flex-col grow">
          <div class="text-[#71ccd4] text-[10px] font-bold tracking-widest bg-cyan-50 px-2 py-1 rounded mb-4 inline-block w-fit uppercase">
            {{ diary.diary_title || 'BLUE LETTERS' }}
          </div>
          <h3 class="font-serif text-2xl text-[#1e293b] mb-4">{{ diary.diary_brief_title || 'Letters from the Sea' }}</h3>
          <p class="text-gray-500 text-sm italic mb-6">
            {{ diary.diary_brief_description || '"In the warmth of this afternoon, where even a heart carved into old wood feels soft, I find beauty in peaceful harmony."' }}
          </p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]">Luvblu Diary</span>
            <a :href="diary.diary_instagram_link || '#'" target="_blank" class="text-[#71ccd4] text-xs italic flex items-center gap-1 hover:underline">
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
