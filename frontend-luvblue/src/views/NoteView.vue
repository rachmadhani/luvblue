<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookOpen, ArrowRight } from 'lucide-vue-next'
import { blueNoteService } from '@/services/blueNoteService'
import { getImageUrl } from '@/utils/imageUrl'

const latestNote = ref<any>(null)
const gridNotes = ref<any[]>([])

const fetchNotes = async () => {
  try {
    const response: any = await blueNoteService.getAll(1, 4) // Fetch up to 4 items
    if (response.success) {
      const data = Array.isArray(response.data) ? response.data : response.data?.data
      if (data && data.length > 0) {
        latestNote.value = data[0]
        gridNotes.value = data.slice(1) // Remaining for the grid
      }
    }
  } catch (error) {
    console.error('Failed to fetch blue notes:', error)
  }
}

onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <div class="min-h-screen bg-[#fdfbf7] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="max-w-4xl mx-auto text-center mb-16">
      <div class="flex items-center justify-center gap-2 text-[#4ebbbb] text-xs font-bold tracking-[0.2em] mb-4">
        <BookOpen :size="14" />
        <span>MY BLUE NOTE</span>
      </div>
      <h1 class="font-script text-5xl md:text-6xl text-[#1e293b] mb-6 leading-tight">
        Start Today: Small Eco Tips for our <span style="color: #71ccd4">blue planet</span>
      </h1>
    </header>

    <!-- Featured Note Section -->
    <section v-if="latestNote" class="max-w-5xl mx-auto mb-16">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row shadow-teal-100/50 min-h-[400px]">
        <!-- Featured Image/Visual -->
        <div class="md:w-1/2 relative flex items-center justify-center min-h-[300px] bg-gray-100">
          <!-- Fallback color if no image -->
          <div class="absolute inset-0 bg-[#4ebbbb]" v-if="!latestNote.note_image_url"></div>
          <img 
            v-if="latestNote.note_image_url" 
            :src="getImageUrl(latestNote.note_image_url)" 
            class="absolute inset-0 w-full h-full object-cover" 
            alt="Featured Note"
            loading="lazy"
          />
          <span v-if="!latestNote.note_image_url" class="text-7xl z-10 relative">🌸</span>
        </div>
        
        <!-- Featured Content -->
        <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div class="inline-block bg-pink-100 text-pink-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-6 max-w-fit uppercase">
            {{ latestNote.note_title || 'SEASONAL NOTE ✦ VOL.1' }}
          </div>
          <h2 class="font-script text-3xl md:text-4xl text-[#1e293b] mb-6">
            {{ latestNote.note_brief_title || 'A Moment in Blue' }}
          </h2>
          <p class="text-gray-500 leading-relaxed mb-8">
            {{ latestNote.note_brief_description || 'Every small moment carries a story. Today\'s blue note captures the essence of a peaceful afternoon, where the light fills the room with warmth and memories.' }}
          </p>
          <a :href="latestNote.note_instagram_link || '#'" target="_blank" class="flex items-center gap-2 bg-[#4ebbbb] hover:bg-[#3da3a4] text-white px-6 py-3 rounded-full font-script text-lg transition-all group w-fit">
            Read Full Note
            <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>

    <!-- Note Grid -->
    <section v-if="gridNotes.length > 0" class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div v-for="note in gridNotes" :key="note.id" class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
        <div class="h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden bg-gray-100">
          <div class="absolute inset-0 bg-gradient-to-br from-[#71ccd4] to-[#a5f3fc]" v-if="!note.note_image_url"></div>
          <img 
            v-if="note.note_image_url" 
            :src="getImageUrl(note.note_image_url)" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Note Thumbnail"
            loading="lazy"
          />
          <span v-if="!note.note_image_url" class="text-4xl transform group-hover:scale-110 transition-transform relative z-10">🌊</span>
        </div>
        <div class="p-6 flex flex-col grow">
          <div class="text-[#71ccd4] text-[10px] font-bold tracking-widest bg-cyan-50 px-2 py-1 rounded mb-4 inline-block w-fit uppercase">
            {{ note.note_title || 'BLUE MOMENTS' }}
          </div>
          <h3 class="font-script text-2xl text-[#1e293b] mb-4">{{ note.note_brief_title || 'Small Stories' }}</h3>
          <p class="text-gray-500 text-sm italic mb-6">
            {{ note.note_brief_description || '"In the warmth of this afternoon, I find beauty in peaceful harmony."' }}
          </p>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-400 text-[10px]">Luvblu Note</span>
            <a :href="note.note_instagram_link || '#'" target="_blank" class="text-[#71ccd4] text-xs italic flex items-center gap-1 hover:underline">
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
        <span class="font-medium">View All Blue Notes</span>
        <ArrowRight :size="18" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Any specific component-level tweaks if needed */
</style>
