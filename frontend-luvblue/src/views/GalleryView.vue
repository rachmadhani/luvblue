<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { instagramService } from '@/services/instagramService'
import { getImageUrl } from '@/utils/imageUrl'
import Modal from '@/components/common/modal/Modal.vue'

const posts = ref<any[]>([])
const loading = ref(true)
const selectedPost = ref<any>(null)
const showModal = ref(false)

// Pagination State
const currentPage = ref(1)
const totalPages = ref(1)
const pageSize = 20

const fetchPosts = async (page: number = 1) => {
  loading.value = true
  currentPage.value = page
  try {
    const res = await instagramService.getAll(page, pageSize) as any
    if (res.success && res.data) {
      // Backend returns { data: { data: [...], meta: { last_page: N } } }
      const responseData = res.data.data || res.data.rows || []
      posts.value = responseData
      
      // Update totals from meta
      if (res.data.meta) {
        totalPages.value = res.data.meta.last_page || Math.ceil((res.data.meta.total || 0) / pageSize) || 1
      }
    }
    
    // Scroll to top of grid area smoothly
    if (page > 1 || posts.value.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Failed to fetch gallery:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchPosts(page)
}

const openModal = (post: any) => {
  selectedPost.value = post
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedPost.value = null
}

onMounted(fetchPosts)
</script>

<template>
  <main class="pt-32 pb-24 px-4 min-h-screen bg-[#fdfbf7]">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif text-blue-950 mb-4 tracking-tight">
          Blue Moments Gallery
        </h1>
        <p class="text-slate-500 max-w-2xl mx-auto text-lg">
          A collection of shared moments from our community, filling the heart with blue.
        </p>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="aspect-square bg-white rounded-2xl animate-pulse border border-slate-100"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="posts.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-slate-300" viewBox="0 0 16 16">
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-slate-900">No moments yet</h3>
        <p class="text-slate-500 mt-1">Be the first to share a blue heart moment!</p>
      </div>

      <!-- Posts Grid -->
      <div v-else class="space-y-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="post in posts" 
            :key="post.id"
            @click="openModal(post)"
            class="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-slate-100"
          >
            <!-- Image -->
            <img 
              :src="getImageUrl(post.image_url.split(',')[0].trim())" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Gallery moment"
              loading="lazy"
            />
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-white font-medium">@{{ post.instagram_users?.split(',')[0].trim() || 'Anonymous' }}</p>
                <p class="text-blue-200 text-xs mt-1">Click to view details</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Bar -->
        <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-center gap-6 py-12 border-t border-slate-100">
          <div class="flex items-center gap-2">
            <!-- Previous Button -->
            <button 
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              class="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="handlePageChange(page)"
                class="min-w-[40px] h-10 px-2 rounded-xl text-sm font-semibold transition-all"
                :class="page === currentPage 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600'"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next Button -->
            <button 
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div class="text-sm text-slate-400 font-medium">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <Modal :show="showModal" title="Moment Details" @close="closeModal">
      <div v-if="selectedPost" class="space-y-6">
        <!-- Image Preview -->
        <div class="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
          <img 
            :src="getImageUrl(selectedPost.image_url.split(',')[0].trim())" 
            class="w-full h-full object-cover"
            alt="Shared moment"
            loading="lazy"
          />
        </div>
        
        <!-- Post Info -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-blue-950">
              @{{ selectedPost.instagram_users?.split(',')[0].trim() || 'Anonymous' }}
            </h3>
            <p class="text-sm text-slate-500">Shared a blue moment</p>
          </div>
        </div>

        <!-- Action Button -->
        <a 
          v-if="selectedPost.instagram_links"
          :href="selectedPost.instagram_links.split(',')[0].trim()" 
          target="_blank"
          class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
          View on Instagram
        </a>
      </div>
    </Modal>
  </main>
</template>
