<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const mouse = { x: 0, y: 0 }
const audioPlayer = ref<HTMLAudioElement | null>(null)
const layersRef = ref<HTMLElement[]>([])

// Manual positioning for each part to match loveblue_illustration.jpg
const layers = [
  { id: 'sky', src: '/parallax/loveblue_background_sky.png', depth: 0.04, style: 'inset-0 w-full h-full object-cover' },
  { id: 'clouds', src: '/parallax/loveblue_middleground_clouds.png', depth: 0.08, style: 'inset-0 w-full h-full object-cover' },
  { id: 'sea', src: '/parallax/loveblue_sea.png', depth: 0.12, style: 'bottom-0 left-0 w-full h-[34.37%] object-cover' },
  { id: 'small_island_2', src: '/parallax/loveblue_small_island_2.png', depth: 0.15, style: 'top-[92%] left-0 w-[23.6%] h-auto' },
  { id: 'small_island_1', src: '/parallax/loveblue_small_island_1.png', depth: 0.2, style: 'top-[79%] right-0 w-[41.2%] h-auto' },
  { id: 'househill', src: '/parallax/loveblue_househill.png', depth: 0.25, style: 'top-[39%] right-0 w-[41.8%] h-auto' },
  { id: 'lighthouse', src: '/parallax/loveblue_lighthouse.png', depth: 0.3, style: 'top-[26.9%] right-[27.4%] w-[6.8%] h-auto', zIndex: 14 },
  { id: 'whale_base', src: '/parallax/loveblue_whale_small.png', depth: 0.35, style: 'top-[60%] left-[8.5%] w-[51.1%] h-auto' },
  { id: 'character', src: '/parallax/loveblue_character.png', depth: 0.4, style: 'top-[55%] left-[39.2%] w-[4.06%] h-auto' },
  { id: 'whale_jump', src: '/parallax/loveblue_whale.png', depth: 0.45, style: 'top-[25%] left-[13%] w-[30.2%] h-auto', zIndex: 11 },
  { id: 'whale_splash', src: '/parallax/loveblue_whale_splash.png', depth: 0.5, style: 'top-[60%] left-[11.8%] w-[21.5%] h-auto', zIndex: 13 },
  { id: 'particles', src: '/parallax/loveblue_particles.png', depth: 0.55, style: 'inset-0 w-full h-full opacity-50 object-cover' },
]

const handleAudioEnd = () => {
  setTimeout(() => {
    if (audioPlayer.value) {
      audioPlayer.value.play();
    }
  }, 12000);
}

const startAudio = () => {
  audioPlayer.value?.play();
};

const handleMouseMove = (e: MouseEvent) => {
  // Parallax disabled per user request
  /*
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  
  mouse.x = (clientX / innerWidth - 0.5)
  mouse.y = (clientY / innerHeight - 0.5)

  layersRef.value.forEach((layer, index) => {
    const config = layers[index]
    if (!layer || !config) return
    const depth = config.depth
    gsap.to(layer, {
      x: mouse.x * depth * 80,
      y: mouse.y * depth * 40,
      duration: 1,
      ease: 'power2.out'
    })
  })
  */
}

onMounted(() => {
  // Entrance Animations: Elegant reveal
  layersRef.value.forEach((layer, index) => {
    const config = layers[index]
    if (!layer || !config) return
    
    if (index < 2) {
      // Sky and Clouds
      gsap.fromTo(layer, 
        { scale: 1.05, filter: 'blur(10px)', opacity: 0 },
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2.5, ease: 'power2.out' }
      )
    } else {
      gsap.fromTo(layer,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: 'power2.out', delay: 0.2 + index * 0.03 }
      )
    }
  })

  // Subtle Bobbing for Whale Base and Character
  const whaleBaseIdx = layers.findIndex(l => l.id === 'whale_base')
  const charIdx = layers.findIndex(l => l.id === 'character')
  
  if (layersRef.value[whaleBaseIdx]) {
    gsap.to([layersRef.value[whaleBaseIdx], layersRef.value[charIdx]], {
      y: '+=5',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Majestic Whale Leap Animation
  const whaleJumpIdx = layers.findIndex(l => l.id === 'whale_jump')
  const whaleSplashIdx = layers.findIndex(l => l.id === 'whale_splash')

  if (layersRef.value[whaleJumpIdx] && layersRef.value[whaleSplashIdx]) {
    const leapTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
    
    // The Whale Leap - Simplified scale for 'size like before'
    leapTl.fromTo(layersRef.value[whaleJumpIdx],
      { y: 500, opacity: 0, rotation: -5 },
      { y: 0, opacity: 1, rotation: 0, duration: 1.8, ease: "power2.out" }
    )
    .to(layersRef.value[whaleJumpIdx],
      { y: 500, opacity: 0, rotation: 5, duration: 1.8, ease: "power2.in" },
      "+=0.4"
    )

    // The Splash (precisely synchronized with breach and re-entry)
    const splashEl = layersRef.value[whaleSplashIdx]
    gsap.set(splashEl, { opacity: 0, scale: 1 })
    
    leapTl.to(splashEl, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)"
    }, 1.1) // Breach splash
    .to(splashEl, {
      opacity: 0,
      scale: 1,
      duration: 0.8
    }, 1.7)
    .to(splashEl, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)"
    }, 2.5) // Re-entry splash
    .to(splashEl, {
      opacity: 0,
      scale: 1,
      duration: 0.8
    }, 3.1)
  }

  // Mouse move disabled per user request
  // window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  // window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <audio 
      ref="audioPlayer" 
      src="/audio/luvblue_theme.mp3" 
      autoplay 
      @ended="handleAudioEnd"
    ></audio>
  <section 
    ref="sectionRef"
    class="relative w-full h-[56.25vw] min-h-[500px] overflow-hidden bg-[#D8EDF2]"
  >
    <!-- Illustration Layers -->
    <div 
      v-for="(layer, index) in layers" 
      :key="layer.id"
      :ref="el => { if (el) layersRef[index] = el as HTMLElement }"
      class="absolute pointer-events-none"
      :class="layer.style"
      :style="{ zIndex: (layer as any).zIndex || (index + 10) }"
    >
      <img 
        :src="layer.src" 
        :alt="layer.id"
        class="w-full h-full object-contain mix-blend-multiply"
      />
    </div>

    <!-- Text Overlay: Refined LUVBLU title -->
    <div class="absolute inset-x-0 top-0 z-50 flex flex-col items-end justify-start pt-32 md:pt-40 pr-10 md:pr-24 pointer-events-none">
      <div class="text-right">
        <h1 class="text-7xl md:text-9xl font-serif text-[#1A4B6E] mb-1 drop-shadow-sm opacity-95 tracking-tighter mix-blend-multiply italic">
          LUVBLU
        </h1>
        <p class="text-xl md:text-2xl text-blue-800 font-medium tracking-tight mb-8">
          One Heart, 500 Blue Stories.
        </p>
        <div class="flex gap-4 justify-end pointer-events-auto">
          <RouterLink to="/gallery" class="bg-blue-600/90 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl backdrop-blur-sm">
            Explore Gallery
          </RouterLink>
          <RouterLink to="/about" class="bg-white/80 hover:bg-white text-blue-600 px-8 py-3 rounded-full font-bold transition-all shadow-lg backdrop-blur-md border border-blue-100">
            Our Story
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Minimal Bottom Fade -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-[25] pointer-events-none"></div>
  </section>
</template>

<style scoped>
section {
  user-select: none;
}
</style>
