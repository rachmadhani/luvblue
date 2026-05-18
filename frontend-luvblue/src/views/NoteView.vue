<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { blueNoteService } from '@/services/blueNoteService'
import { getImageUrl } from '@/utils/imageUrl'

const latestNote = ref<any>(null)
const gridNotes = ref<any[]>([])
const loading = ref(false)

// Pagination State
const currentPage = ref(1)
const totalPages = ref(1)
const PAGE_SIZE = 4

const fetchNotes = async (page: number = 1) => {
  loading.value = true
  currentPage.value = page
  try {
    const response: any = await blueNoteService.getAll(page, PAGE_SIZE)
    if (response.success) {
      // Handle array or standard paginated structure
      const resData = response.data
      const data = Array.isArray(resData) ? resData : (resData?.data || resData?.rows || [])
      const meta = resData?.meta

      if (data.length > 0) {
        latestNote.value = data[0]
        gridNotes.value = data.slice(1) // Remaining for grid
      } else {
        latestNote.value = null
        gridNotes.value = []
      }

      // Update totalPages
      if (meta) {
        totalPages.value = meta.last_page || Math.ceil((meta.total || 0) / PAGE_SIZE) || 1
      } else {
        // Fallback calculations for robust client-side paging estimation
        if (data.length < PAGE_SIZE) {
          totalPages.value = page
        } else {
          totalPages.value = Math.max(totalPages.value, page + 1)
        }
      }
    }

    // Scroll smoothly to top of viewport on page change
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Failed to fetch blue notes:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchNotes(page)
}

onMounted(() => {
  fetchNotes(1)
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
      <h1 class="font-serif text-5xl md:text-6xl text-[#1e293b] mb-6 leading-tight">
        Start Today: Small Eco Tips for our <span style="color: #71ccd4">blue planet</span>
      </h1>
    </header>

    <!-- Loading State: Featured Note Skeleton -->
    <div v-if="loading" class="max-w-5xl mx-auto mb-16">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row shadow-teal-100/50 min-h-[400px] animate-pulse border border-slate-100/50">
        <div class="md:w-1/2 min-h-[300px] bg-slate-100"></div>
        <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div class="h-4 w-28 bg-slate-100 rounded-full"></div>
          <div class="h-8 w-3/4 bg-slate-100 rounded-lg"></div>
          <div class="space-y-3">
            <div class="h-4 w-full bg-slate-100 rounded"></div>
            <div class="h-4 w-5/6 bg-slate-100 rounded"></div>
            <div class="h-4 w-4/5 bg-slate-100 rounded"></div>
          </div>
          <div class="h-12 w-36 bg-slate-100 rounded-full mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Featured Note Section -->
    <section v-if="!loading && latestNote" class="max-w-5xl mx-auto mb-16">
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
          <h2 class="font-serif text-3xl md:text-4xl text-[#1e293b] mb-6">
            {{ latestNote.note_brief_title || 'A Moment in Blue' }}
          </h2>
          <p class="text-gray-500 leading-relaxed mb-8">
            {{ latestNote.note_brief_description || 'Every small moment carries a story. Today\'s blue note captures the essence of a peaceful afternoon, where the light fills the room with warmth and memories.' }}
          </p>
          <a :href="latestNote.note_instagram_link || '#'" target="_blank" class="flex items-center gap-2 bg-[#4ebbbb] hover:bg-[#3da3a4] text-white px-6 py-3 rounded-full font-serif text-lg transition-all group w-fit">
            Read Full Note
            <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>

    <!-- Loading State: Grid Notes Skeleton -->
    <div v-if="loading" class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col animate-pulse border border-slate-100/50 min-h-[380px]">
        <div class="h-48 bg-slate-100"></div>
        <div class="p-6 space-y-4 flex-grow flex flex-col justify-between">
          <div>
            <div class="h-4 w-20 bg-slate-100 rounded mb-4"></div>
            <div class="h-6 w-3/4 bg-slate-100 rounded mb-4"></div>
            <div class="h-4 w-full bg-slate-100 rounded mb-2"></div>
            <div class="h-4 w-5/6 bg-slate-100 rounded"></div>
          </div>
          <div class="h-8 w-24 bg-slate-100 rounded mt-6"></div>
        </div>
      </div>
    </div>

    <!-- Note Grid -->
    <section v-if="!loading && gridNotes.length > 0" class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          <h3 class="font-serif text-2xl text-[#1e293b] mb-4">{{ note.note_brief_title || 'Small Stories' }}</h3>
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

    <!-- Empty State -->
    <div v-if="!loading && !latestNote && gridNotes.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-5xl mx-auto shadow-sm shadow-teal-50/50">
      <div class="w-16 h-16 bg-[#f0f9fa] rounded-full flex items-center justify-center mx-auto mb-4 text-[#4ebbbb]">
        <BookOpen :size="24" />
      </div>
      <h3 class="text-lg font-medium text-slate-800 font-serif">No notes found</h3>
      <p class="text-slate-500 mt-1">We couldn't find any blue notes at the moment.</p>
    </div>

    <!-- Premium Pagination Bar -->
    <div v-if="totalPages > 1 && !loading" class="flex flex-col sm:flex-row items-center justify-center gap-6 py-12 mt-8 border-t border-slate-100 max-w-5xl mx-auto">
      <div class="flex items-center gap-3">
        <!-- Previous Button -->
        <button 
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          class="w-11 h-11 rounded-full flex items-center justify-center border border-[#e2e8f0] text-[#5f718a] bg-white hover:bg-[#f0f9fa] hover:text-[#3da3a4] hover:border-[#71ccd4] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#5f718a] disabled:hover:border-[#e2e8f0] disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
          aria-label="Previous page"
        >
          <ChevronLeft :size="20" />
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-2">
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="handlePageChange(page)"
            class="w-11 h-11 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center"
            :class="page === currentPage 
              ? 'bg-[#4ebbbb] text-white shadow-lg shadow-teal-100' 
              : 'text-[#5f718a] bg-white border border-[#e2e8f0] hover:bg-[#f0f9fa] hover:text-[#3da3a4] hover:border-[#71ccd4]'"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button 
          @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="w-11 h-11 rounded-full flex items-center justify-center border border-[#e2e8f0] text-[#5f718a] bg-white hover:bg-[#f0f9fa] hover:text-[#3da3a4] hover:border-[#71ccd4] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#5f718a] disabled:hover:border-[#e2e8f0] disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
          aria-label="Next page"
        >
          <ChevronRight :size="20" />
        </button>
      </div>
      
      <div class="text-xs text-[#5f718a] tracking-wider uppercase font-semibold bg-slate-100/50 px-3.5 py-1.5 rounded-full">
        Page <span class="text-[#3da3a4] font-bold">{{ currentPage }}</span> of {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Any specific component-level tweaks if needed */
</style>
