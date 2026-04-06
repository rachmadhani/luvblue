<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { instagramService } from '@/services/instagramService'
import { getImageUrl } from '@/utils/imageUrl'

const photosShared = ref(0)
const heartPixels = ref(0)
const heartFilled = ref(0)
const posts = ref<any[]>([])

const gridRows = 27 // Matches heartMask length
const gridCols = 25

const heartMask: [number, number][][] = [
  [[5,8], [16,19]],
  [[4,9], [15,20]],
  [[3, 10], [14, 21]],
  [[1, 11], [13, 23]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[0, 24]],
  [[1, 23]],
  [[1, 23]],
  [[2, 22]],
  [[2, 22]],
  [[3, 21]],
  [[4, 20]],
  [[5, 19]],
  [[6, 18]],
  [[7, 17]],
  [[8, 16]],
  [[9, 15]],
  [[10, 14]],
  [[11, 13]],
  [[12, 12]],
]

const pixels = computed(() => {
  const positions: { r: number; c: number; opacity: number }[] = []
  
  for (let r = 0; r < heartMask.length; r++) {
    const ranges = heartMask[r]
    if (!ranges) continue
    for (const [start, end] of ranges) {
      for (let c = start; c <= end; c++) {
        positions.push({
          r,
          c,
          opacity: 0.3 + Math.random() * 0.6
        })
      }
    }
  }

  const totalPositions = positions.length
  const occupiedCount = posts.value.length
  const startIndex = Math.max(0, totalPositions - occupiedCount)

  return positions.map((pos, index) => {
    const postIndex = index - startIndex
    const post = postIndex >= 0 ? posts.value[occupiedCount - 1 - postIndex] : null
    
    return {
      ...pos,
      post: post,
      hasImage: !!post,
      username: post ? (post.instagram_users ? (post.instagram_users.trim().startsWith('@') ? post.instagram_users.trim() : `@${post.instagram_users.trim()}`) : 'Anonymous') : `@user_${index + 1}`,
      displayImage: post ? getImageUrl(post.image_url.split(',')[0].trim()) : null
    }
  })
})

const hoveredPixel = ref<any>(null)
const selectedPixel = ref<any>(null)

const openPixel = (pixel: any) => {
  if (pixel.hasImage) {
    selectedPixel.value = pixel
  }
}

const closeModal = () => {
  selectedPixel.value = null
}

const fetchStats = async () => {
  try {
    const [statsRes, postsRes]: any = await Promise.all([
      instagramService.getStats(),
      instagramService.getAll(1, 1000)
    ])

    if (statsRes.success && statsRes.data) {
      photosShared.value = statsRes.data.totalPhotosShared
      heartPixels.value = statsRes.data.heartPixels
      heartFilled.value = statsRes.data.heartFilled
    }

    if (postsRes.success && postsRes.data) {
      posts.value = Array.isArray(postsRes.data) 
        ? postsRes.data 
        : (postsRes.data.data || postsRes.data.rows || [])
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="px-4 py-24">
    <!-- Heart Grid Section -->
    <section class="max-w-4xl mx-auto mb-32">
      <header class="text-center mb-12">
        <p class="text-[10px] tracking-[0.3em] font-semibold text-blue-900/60 uppercase mb-4">
          #LUVBLU · ECOSOFT INTERACTIVE
        </p>
        <h2 class="text-4xl md:text-5xl font-serif text-blue-950 mb-4 leading-tight">
          Every blue moment <br />
          <span class="italic">fills our heart.</span>
        </h2>
      </header>

      <!-- Heart Grid -->
      <div class="relative flex justify-center mb-32">
        <div 
          class="grid gap-1.5"
          :style="{ 
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            width: 'clamp(300px, 90vw, 800px)'
          }"
        >
          <div 
            v-for="i in gridRows * gridCols" 
            :key="i"
            class="aspect-square opacity-0 pointer-events-none"
          ></div>

          <div
            v-for="pixel in pixels"
            :key="`${pixel.r}-${pixel.c}`"
            class="absolute aspect-square rounded-[3px] cursor-pointer transition-all duration-300 hover:scale-150 hover:z-20 group"
            :class="pixel.hasImage ? 'bg-cover bg-center border border-blue-400/30' : 'bg-blue-500'"
            :style="{
              top: `calc(${pixel.r} * (100% / ${gridRows}))`,
              left: `calc(${pixel.c} * (100% / ${gridCols}))`,
              width: `calc(100% / ${gridCols} - 3px)`,
              opacity: pixel.hasImage ? 1 : pixel.opacity,
              backgroundImage: pixel.hasImage ? `url(${pixel.displayImage})` : 'none'
            }"
            @mouseenter="hoveredPixel = pixel"
            @mouseleave="hoveredPixel = null"
            @click="openPixel(pixel)"
          >
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
        <a 
          href="https://www.instagram.com/ashley_luvblu/" 
          target="_blank"
          class="bg-[#2D6CAD] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium flex items-center gap-2 mx-auto transition-all shadow-lg hover:shadow-blue-200 cursor-pointer w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
          ashley_luvblu
        </a>
        <p class="mt-4 text-[10px] text-slate-400 font-medium">
          Post on Instagram with <span class="text-blue-500">#LUVBLU</span> and tag <span class="text-blue-500">@ashley_luvblu</span>
        </p>
      </div>
    </section>

    <!-- Photo Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="selectedPixel" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-blue-950/60 backdrop-blur-md" @click="closeModal"></div>
        
        <div class="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full relative z-10">
          <button @click="closeModal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div class="aspect-square w-full bg-slate-100">
            <img :src="selectedPixel.displayImage" class="w-full h-full object-cover" />
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-bold text-blue-950">{{ selectedPixel.username }}</h3>
                <p class="text-xs text-slate-500">Shared a blue moment</p>
              </div>
            </div>
            
            <a 
              v-if="selectedPixel.post && selectedPixel.post.instagram_links"
              :href="selectedPixel.post.instagram_links.split(',')[0].trim()" 
              target="_blank"
              class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
              </svg>
              View on Instagram
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
