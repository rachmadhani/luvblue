<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const mouse = { x: 0, y: 0 }
const audioPlayer = ref<HTMLAudioElement | null>(null)
const layersRef = ref<HTMLElement[]>([])

// Manual positioning for each part to match loveblue_illustration.jpg
const layers = [
  { id: 'sky', src: '/parallax/loveblue_background_sky.png', depth: 0.04, style: 'w-full h-auto object-cover' },
  { id: 'clouds', src: '/parallax/loveblue_middleground_clouds.png', depth: 0.08, style: ' w-full h-full object-cover' },
  { id: 'sea', src: '/parallax/loveblue_sea.png', depth: 0.12, style: 'inset-0 w-full h-full md:h-[34.37%] md:top-auto md:bottom-0 object-cover' },
  { id: 'small_island_2', src: '/parallax/loveblue_small_island_2.png', depth: 0.15, style: 'top-[95%] md:top-[92%] left-0 w-[40%] md:w-[23.6%] h-auto' },
  { id: 'small_island_1', src: '/parallax/loveblue_small_island_1.png', depth: 0.2, style: 'top-[85%] md:top-[79%] right-0 w-[60%] md:w-[41.2%] h-auto' },
  { id: 'househill', src: '/parallax/loveblue_househill.png', depth: 0.25, style: 'top-[45%] md:top-[39%] right-0 w-[60%] md:w-[41.8%] h-auto' },
  { id: 'lighthouse', src: '/parallax/loveblue_lighthouse.png', depth: 0.3, style: 'top-[22%] md:top-[26.9%] right-[5%] md:right-[27.4%] w-[15%] md:w-[6.8%] h-auto', zIndex: 14 },
  { id: 'whale_base', src: '/parallax/loveblue_whale_small.png', depth: 0.35, style: 'top-[50%] md:top-[60%] left-[-10%] md:left-[8.5%] w-[120%] md:w-[51.1%] h-auto' },
  { id: 'character', src: '/parallax/loveblue_character.png', depth: 0.4, style: 'top-[46%] md:top-[55%] left-[48%] md:left-[39.2%] w-[8%] md:w-[4.06%] h-auto' },
  { id: 'whale_jump', src: '/parallax/loveblue_whale.png', depth: 0.45, style: 'top-[18%] md:top-[25%] left-[5%] md:left-[13%] w-[60%] md:w-[30.2%] h-auto', zIndex: 11 },
  { id: 'whale_splash', src: '/parallax/loveblue_whale_splash.png', depth: 0.5, style: 'top-[50%] md:top-[60%] left-[0%] md:left-[11.8%] w-[40%] md:w-[21.5%] h-auto', zIndex: 13 },
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

// const lyricsData = [
//   {
//     startTime: 33,
//     endTime: 92,
//     text: "The morning wakes in a shade of pale... A fragile world behind a misty veil... I hear the heartbeat of the deep blue sea... Whispering secrets of how it used to be... Soft as a feather, the wind begins to sigh... Searching for clarity in a clouded sky... Every breath we take is a gift from the green... Every drop of life in the rivers unseen... It’s time to listen, it’s time to feel... The spirit of the earth, so pure and real"
//   },
//   {
//     startTime: 93,
//     endTime: 137,
//     text: "LoveBlue, oh, LoveBlue... A sapphire dream we’re holding onto... Underneath the velvet sky so wide... Keep the light of the stars alive... LoveBlue, with every beat of our heart... For a world that shall never fall apart"
//   },
//   {
//     startTime: 138,
//     endTime: 169,
//     text: "Golden sands and the emerald trees... Dancing slow in the cooling breeze... But shadows linger where the plastic flows... A silent ache that the mountain knows... Let’s heal the scars with a gentle hand... To bring the magic back to the land"
//   },
//   {
//     startTime: 170,
//     endTime: 196,
//     text: "It’s not too late to change the flow... To let the ancient forests grow... A simple choice, a kinder way... To save the dawn of a brand new day... Grace in our steps, love in our soul"
//   },
//   {
//     startTime: 197,
//     endTime: 239,
//     text: "LoveBlue, oh, LoveBlue... A sapphire dream we’re holding onto... Underneath the velvet sky so wide... Keep the light of the stars alive... LoveBlue, with every beat of our heart... For a world that shall never fall apart"
//   },
//   {
//     startTime: 240,
//     endTime: 260,
//     text: "Keep it blue... keep it pure... LoveBlue..."
//   }
// ]

const lyricsData = [
  {
    startTime: 33,
    endTime: 36,
    text: "The morning wakes in a shade of pale ..."
  },
  {
    startTime: 36,
    endTime: 40,
    text: "A fragile world behind a misty veil..."
  },
  {
    startTime: 41,
    endTime: 48,
    text: "I hear the heartbeat of the deep blue sea..."
  },
  {
    startTime: 49,
    endTime: 52,
    text: "Whispering secrets of how it used to be..."
  },
  {
    startTime: 53,
    endTime: 56,
    text: "Soft as a feather, the wind begins to sigh..."
  },
  {
    startTime: 57,
    endTime: 63,
    text: "Searching for clarity in a clouded sky..."
  },
  {
    startTime: 64,
    endTime: 71,
    text: "Every breath we take is a gift from the green..."
  },
  {
    startTime: 72,
    endTime: 80,
    text: "Every drop of life in the rivers unseen..."
  },
  {
    startTime: 81,
    endTime: 84,
    text: "It’s time to listen, it’s time to feel..."
  },
  {
    startTime: 85,
    endTime: 92,
    text: "The spirit of the earth, so pure and real..."
  },
  
  {
    startTime: 93,
    endTime: 103,
    text: "LoveBlue, oh, LoveBlue..."
  },
  {
    startTime: 104,
    endTime: 108,
    text: "A sapphire dream we’re holding onto..."
  },
  {
    startTime: 109,
    endTime: 113,
    text: "Underneath the velvet sky so wide..."
  },
  {
    startTime: 114,
    endTime: 118,
    text: "Keep the light of the stars alive..."
  },
  {
    startTime: 119,
    endTime: 127,
    text: "LoveBlue, with every beat of our heart..."
  },
  {
    startTime: 128,
    endTime: 137,
    text: "For a world that shall never fall apart..."
  },
  {
    startTime: 138,
    endTime: 141,
    text: "Golden sands and the emerald trees..."
  },
  {
    startTime: 142,
    endTime: 145,
    text: "Dancing slow in the cooling breeze..."
  },
  {
    startTime: 146,
    endTime: 153,
    text: "But shadows linger where the plastic flows..."
  },
  {
    startTime: 154,
    endTime: 156,
    text: "A silent ache that the mountain knows..."
  },
  {
    startTime: 157,
    endTime: 162,
    text: "Let’s heal the scars with a gentle hand..."
  },
  {
    startTime: 163,
    endTime: 169,
    text: "To bring the magic back to the land..."
  },
  {
    startTime: 172,
    endTime: 174,
    text: "It’s not too late to change the flow..."
  },
  {
    startTime: 175,
    endTime: 178,
    text: "To let the ancient forests grow..."
  },
  {
    startTime: 179,
    endTime: 183,
    text: "A simple choice, a kinder way..."
  },
  {
    startTime: 184,
    endTime: 187,
    text: "To save the dawn of a brand new day..."
  },
  {
    startTime: 188,
    endTime: 195,
    text: "Grace in our steps, love in our soul..."
  },
  {
    startTime: 196,
    endTime: 206,
    text: "LoveBlue, oh, LoveBlue..."
  },
  {
    startTime: 207,
    endTime: 211,
    text: "A sapphire dream we’re holding onto..."
  },
  {
    startTime: 212,
    endTime: 216,
    text: "Underneath the velvet sky so wide..."
  },
  {
    startTime: 217,
    endTime: 221,
    text: "Keep the light of the stars alive..."
  },
  {
    startTime: 222,
    endTime: 230,
    text: "LoveBlue, with every beat of our heart..."
  },
  {
    startTime: 231,
    endTime: 240,
    text: "For a world that shall never fall apart..."
  },
  {
    startTime: 243,
    endTime: 244,
    text: "Keep it blue...  LoveBlue..."
  },
  {
    startTime: 245,
    endTime: 247,
    text: "Keep it pure..."
  },
  {
    startTime: 248,
    endTime: 256,
    text: "LoveBlue...."
  }
]


const currentLyric = ref("")
const lyricRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

const handleTimeUpdate = (e: Event) => {
  const time = (e.target as HTMLAudioElement).currentTime
  const activeLyric = lyricsData.find(l => time >= l.startTime && time < l.endTime)
  
  if (activeLyric && activeLyric.text !== currentLyric.value && !isAnimating.value) {
    isAnimating.value = true
    if (lyricRef.value && currentLyric.value !== "") {
      // Fade out then in
      gsap.to(lyricRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          currentLyric.value = activeLyric.text
          gsap.fromTo(lyricRef.value, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", onComplete: () => { isAnimating.value = false } }
          )
        }
      })
    } else {
      currentLyric.value = activeLyric.text
      // Small delay to ensure DOM update
      setTimeout(() => {
        if (lyricRef.value) {
          gsap.fromTo(lyricRef.value, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", onComplete: () => { isAnimating.value = false } }
          )
        } else {
          isAnimating.value = false
        }
      }, 50)
    }
  } else if (!activeLyric && currentLyric.value !== "" && !isAnimating.value) {
    isAnimating.value = true
    gsap.to(lyricRef.value, {
      opacity: 0,
      y: -10,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        currentLyric.value = ""
        isAnimating.value = false
      }
    })
  }
}

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
      @timeupdate="handleTimeUpdate"
    ></audio>
  <section 
    ref="sectionRef"
    class="hero-section relative w-full h-[120vw] md:h-[56.25vw] min-h-[500px] md:min-h-[600px] overflow-hidden bg-[#5FBFCA]"
  >
    <!-- Illustration Layers -->
    <div 
      v-for="(layer, index) in layers" 
      :id="layer.id"
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
    <div class="absolute inset-x-0 top-0 z-50 flex flex-col items-center md:items-end justify-start pt-24 md:pt-40 px-6 md:pr-24 pointer-events-none">
      <div class="text-right flex flex-col items-center md:items-end">
        <h1 class="hidden md:block text-7xl md:text-9xl font-serif text-[#1A4B6E] mb-1 drop-shadow-sm opacity-95 tracking-tighter mix-blend-multiply italic">
          LUVBLU
        </h1>
        <p class="hidden md:block text-xl md:text-2xl text-blue-800 font-medium tracking-tight mb-8">
          Small actions, Create Big Waves.
        </p>
        <div class="flex gap-4 justify-center md:justify-end pointer-events-auto">
          <RouterLink to="/gallery" class="bg-blue-600/90 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl backdrop-blur-sm">
            Explore Gallery
          </RouterLink>
          <RouterLink to="/about" class="hidden md:inline-block bg-white/80 hover:bg-white text-blue-600 px-8 py-3 rounded-full font-bold transition-all shadow-lg backdrop-blur-md border border-blue-100">
            Our Story
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Minimal Bottom Fade -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-[25] pointer-events-none"></div>

    <!-- Lyrics Display (Bottom Right) -->
    <div 
      v-if="currentLyric"
      class="absolute bottom-40 right-30 z-[60] max-w-sm md:max-w-md pointer-events-none selection:bg-none"
    >
      <div 
        ref="lyricRef"
        class="text-right"
      >
        <p class="text-lg md:text-xl font-medium text-[#1A4B6E]/90 italic leading-relaxed tracking-tight drop-shadow-sm whitespace-pre-line">
          {{ currentLyric }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  user-select: none;
}

@media (max-width: 767px) {
  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 400px;
    /* height: 120px; */
    background-color: #5FBFCA;
    z-index: 11;
    pointer-events: none;
  }
  .hero-section #sky {
    width: 500px;
  }
}
</style>
