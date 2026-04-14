<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const mouse = { x: 0, y: 0 }
const audioPlayer = ref<HTMLAudioElement | null>(null)
const layersRef = ref<HTMLElement[]>([])
const speechBubbleRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

const isNightTime = () => {
  const hour = new Date().getHours()
  return hour < 6 || hour >= 18 // Night is 6 PM to 6 AM
}

const isNight = ref(isNightTime())
const isManual = ref(false)

const toggleMode = () => {
  isNight.value = !isNight.value
  isManual.value = true
}

// Manual positioning for each part to match loveblue_illustration.jpg
const dayLayers = [
  { id: 'sky', src: '/parallax/loveblue_background_sky.webp', depth: 0.04, style: 'sky-layer w-full h-auto object-cover' },
  { id: 'clouds', src: '/parallax/loveblue_middleground_clouds.webp', depth: 0.08, style: 'w-full h-full object-cover' },
  { id: 'sea', src: '/parallax/loveblue_sea.webp', depth: 0.12, style: 'sea-layer inset-0 w-full h-[34.37%] top-auto bottom-0 object-cover' },
  { id: 'small_island_2', src: '/parallax/loveblue_small_island_2.png', depth: 0.15, style: 'small-island-2-layer top-[92%] left-0 w-[23.6%] h-auto' },
  { id: 'small_island_1', src: '/parallax/loveblue_small_island_1.png', depth: 0.2, style: 'small-island-1-layer top-[79%] right-0 w-[41.2%] h-auto' },
  { id: 'househill', src: '/parallax/loveblue_househill.png', depth: 0.25, style: 'househill-layer right-0 w-[41.8%] h-auto' },
  { id: 'lighthouse', src: '/parallax/loveblue_lighthouse.png', depth: 0.3, style: 'lighthouse-layer top-[26.9%] right-[27.4%] w-[6.8%] h-auto', zIndex: 14 },
  { id: 'whale_base', src: '/parallax/loveblue_whale_small.png', depth: 0.35, style: 'whale-small-layer top-[60%] left-[8.5%] w-[51.1%] h-auto' },
  { id: 'character', src: '/parallax/loveblue_character.png', depth: 0.4, style: 'character-layer top-[55%] left-[39.2%] w-[4.06%] h-auto' },
  { id: 'whale_jump', src: '/parallax/loveblue_whale.png', depth: 0.45, style: 'whale-jump-layer top-[25%] left-[13%] w-[30.2%] h-auto', zIndex: 11 },
  { id: 'whale_splash', src: '/parallax/loveblue_whale_splash.png', depth: 0.5, style:'whale-splash-layer top-[60%] left-[11.8%] w-[21.5%] h-auto', zIndex: 13 },
  { id: 'particles', src: '/parallax/loveblue_particles.png', depth: 0.55, style: 'inset-0 w-full h-full opacity-50 object-cover' },
]

const nightLayers = [
  { id: 'sky_night', src: '/night-parallax/luvblu_night_sky.webp', depth: 0.02, style: 'sky-night-layer w-full h-auto object-cover', zIndex: 10 },
  { id: 'starry', src: '/night-parallax/APNG/luvblu_illustration_night_starry.png', depth: 0.03, style: 'starry-night-layer inset-0 w-full h-full', zIndex: 15 },
  { id: 'star1', src: '/night-parallax/APNG/luvblu_illustration_night_star_1.png', depth: 0.035, style: 'star-1-layer inset-0 w-full h-full', zIndex: 12 },
  { id: 'star2', src: '/night-parallax/APNG/luvblu_illustration_night_star_2.png', depth: 0.04, style: 'star-2-layer inset-0 w-full h-full', zIndex: 12 },
  { id: 'star3', src: '/night-parallax/APNG/luvblu_illustration_night_star_3.png', depth: 0.045, style: 'star-3-layer inset-0 w-full h-full', zIndex: 12 },
  { id: 'star4', src: '/night-parallax/APNG/luvblu_illustration_night_star_4.png', depth: 0.05, style: 'star-4-layer inset-0 w-full h-full', zIndex: 12 },
  { id: 'star5', src: '/night-parallax/APNG/luvblu_illustration_night_star_5.png', depth: 0.055, style: 'star-5-layer inset-0 w-full h-full', zIndex: 12 },
  { id: 'shootingstar', src: '/night-parallax/APNG/luvblu_illustration_001_night_shootingstar.png', depth: 0.03, style: 'shootingstar-layer w-full h-full', zIndex: 14 },
  { id: 'clouds_night', src: '/night-parallax/luvblu_illustration_night_clouds.webp', depth: 0.06, style: 'clouds-night-layer w-full h-full scale-105 object-cover', zIndex: 13 },
  { id: 'lighthouse_lights', src: '/night-parallax/APNG/luvblu_illustration_001_night_lighthouse_light.png', depth: 0.08, style: 'lighthouse-lights-night-layer w-full h-auto', zIndex: 18 },
  { id: 'sparkaroundlights', src: '/night-parallax/luvblu_night_sparkaroundlights.png', depth: 0.08, style: 'sparkaroundlights-layer inset-0 w-full h-full', zIndex: 16 },
  { id: 'lighthouse_night', src: '/night-parallax/luvblu_night_lighthouse.png', depth: 0.10, style: 'lighthouse-night-layer w-full h-auto', zIndex: 17 },
  { id: 'househill_night', src: '/night-parallax/luvblu_night_househill.png', depth: 0.12, style: 'househill-night-layer right-0 w-full h-auto', zIndex: 23 },
  { id: 'housesmoke', src: '/night-parallax/APNG/luvblu_illustration_001_night_housesmoke.png', depth: 0.12, style: 'housesmoke-night-layer w-full h-auto', zIndex: 19 },
  { id: 'small_island_1_night', src: '/night-parallax/luvblu_night_small_island_1.png', depth: 0.14, style: 'small-island-1-night-layer w-full h-auto', zIndex: 23 },
  { id: 'sea_night', src: '/night-parallax/luvblu_night_sea.webp', depth: 0.16, style: 'sea-night-layer inset-0 w-full h-auto', zIndex: 21 },
  { id: 'kra', src: '/night-parallax/luvblu_night_kra.png', depth: 0.17, style: 'kra-night-layer w-full h-auto', zIndex: 22 },
  { id: 'small_island_2_night', src: '/night-parallax/luvblu_night_small_island_2.png', depth: 0.18, style: 'small-island-2-night-layer w-full h-auto', zIndex: 23 },
  { id: 'whale_base_night', src: '/night-parallax/luvblu_night_whale_small.png', depth: 0.20, style: 'whale-small-night-layer w-full left-[2.5%] h-auto whale-night-pos', zIndex: 24 },
  { id: 'character_night', src: '/night-parallax/luvblu_night_character.png', depth: 0.22, style: 'character-night-layer w-full h-auto left-[1.6%] character-night-pos', zIndex: 25 },
  { id: 'glitter', src: '/night-parallax/luvblu_night_glitter.png', depth: 0.24, style: 'glitter-night-layer inset-0 w-full h-full', zIndex: 30 },
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
  if (!sectionRef.value) return
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  
  mouse.x = (clientX / innerWidth - 0.5)
  mouse.y = (clientY / innerHeight - 0.5)

  const activeLayers = isNight.value ? nightLayers : dayLayers
  layersRef.value.forEach((layer, index) => {
    const config = activeLayers[index]
    if (!layer || !config) return
    const depth = config.depth
    gsap.to(layer, {
      x: mouse.x * depth * 80,
      y: mouse.y * depth * 40,
      duration: 1.5,
      ease: 'power2.out'
    })
  })
  */
}

const initAnimations = () => {
  // Clear any existing animations
  gsap.killTweensOf('.parallax-layer')
  
  const activeLayers = isNight.value ? nightLayers : dayLayers
  
  layersRef.value.forEach((layer, index) => {
    if (!layer) return
    const config = activeLayers[index]
    if (!config) return
    
    // reset positions
    gsap.set(layer, { x: 0, y: 0, opacity: 0 })

    if (index < 3) {
      // Sky, Starry, Clouds
      gsap.fromTo(layer, 
        { scale: 1.05, filter: 'blur(10px)', opacity: 0 },
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 2.5, ease: 'power2.out', delay: index * 0.1 }
      )
    } else {
      // Apply offset for whale and character to move them higher in night mode
      const nightOffset = isNight.value && (config.id.includes('whale_base') || config.id.includes('character')) ? -40 : 0
      
      gsap.fromTo(layer,
        { y: 20 + nightOffset, opacity: 0 },
        { y: nightOffset, opacity: 1, duration: 1.8, ease: 'power2.out', delay: 0.2 + index * 0.03 }
      )
    }
  })

  // Adjust speech bubble base position for night mode if moving character
  if (isNight.value && speechBubbleRef.value) {
    gsap.set(speechBubbleRef.value, { y: -40 })
  } else if (speechBubbleRef.value) {
    gsap.set(speechBubbleRef.value, { y: 0 })
  }

  // Night specific animations
  if (isNight.value) {

    // Glitter sparkle pulse
    const glitterIdx = nightLayers.findIndex(l => l.id === 'glitter')
    if (layersRef.value[glitterIdx]) {
      gsap.to(layersRef.value[glitterIdx], {
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  } else {
    // Majestic Whale Leap Animation (Day only)
    const whaleJumpIdx = dayLayers.findIndex(l => l.id === 'whale_jump')
    const whaleSplashIdx = dayLayers.findIndex(l => l.id === 'whale_splash')

    if (layersRef.value[whaleJumpIdx] && layersRef.value[whaleSplashIdx]) {
      const leapTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
      
      leapTl.fromTo(layersRef.value[whaleJumpIdx],
        { y: 500, opacity: 0, rotation: -5 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.8, ease: "power2.out" }
      )
      .to(layersRef.value[whaleJumpIdx],
        { y: 500, opacity: 0, rotation: 5, duration: 1.8, ease: "power2.in" },
        "+=0.4"
      )

      const splashEl = layersRef.value[whaleSplashIdx]
      gsap.set(splashEl, { opacity: 0, scale: 1 })
      
      leapTl.to(splashEl, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)"
      }, 1.1)
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
      }, 2.5)
      .to(splashEl, {
        opacity: 0,
        scale: 1,
        duration: 0.8
      }, 3.1)
    }
  }

  // Bobbing for Whale Base and Character (Both modes)
  const whaleBaseIdx = activeLayers.findIndex(l => l.id.includes('whale_base'))
  const charIdx = activeLayers.findIndex(l => l.id.includes('character'))
  
  if (layersRef.value[whaleBaseIdx]) {
    // Night uses full-frame images, so reduce bobbing to match day's visual feel
    const bobAmount = isNight.value ? 2 : 5
    gsap.to([layersRef.value[whaleBaseIdx], layersRef.value[charIdx], speechBubbleRef.value], {
      y: `+=${bobAmount}`,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Subtle breathing animation for character (Day only — night uses full-frame images so scale looks wrong)
  if (layersRef.value[charIdx] && !isNight.value) {
    gsap.to(layersRef.value[charIdx], {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Fade in the text overlay
  if (overlayRef.value) {
    gsap.fromTo(overlayRef.value,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out', delay: 0.8 }
    )
  }
}

let timeCheckInterval: number | null = null

onMounted(() => {
  initAnimations()
  window.addEventListener('mousemove', handleMouseMove)

  // Auto-update mode based on local time
  timeCheckInterval = window.setInterval(() => {
    if (isManual.value) return // Don't auto-switch if user manually toggled
    const newMode = isNightTime()
    if (newMode !== isNight.value) {
      isNight.value = newMode
    }
  }, 60000)

  // Scroll reveal observer for the new content section
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el)
  })
})

watch(isNight, () => {
  nextTick(() => {
    initAnimations()
  })
})

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

    // Kill any in-progress animations on this element
    if (lyricRef.value) {
      gsap.killTweensOf(lyricRef.value)
    }

    if (lyricRef.value && currentLyric.value !== "") {
      // Fade out current lyric, then fade in new one
      gsap.to(lyricRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.25, // Faster
        ease: "power2.inOut",
        onComplete: () => {
          currentLyric.value = activeLyric.text
          // Ensure opacity is 0 before the new text renders
          if (lyricRef.value) {
            gsap.set(lyricRef.value, { opacity: 0, y: 10 })
          }
          nextTick(() => {
            if (lyricRef.value) {
              gsap.to(lyricRef.value, {
                opacity: 1, y: 0, duration: 0.4, ease: "power3.out", // Faster
                onComplete: () => { isAnimating.value = false }
              })
            } else {
              isAnimating.value = false
            }
          })
        }
      })
    } else {
      // First lyric appearance — set hidden before updating text
      if (lyricRef.value) {
        gsap.set(lyricRef.value, { opacity: 0, y: 10 })
      }
      currentLyric.value = activeLyric.text
      nextTick(() => {
        if (lyricRef.value) {
          gsap.set(lyricRef.value, { opacity: 0, y: 10 })
          gsap.to(lyricRef.value, {
            opacity: 1, y: 0, duration: 0.4, ease: "power3.out", // Faster
            onComplete: () => { isAnimating.value = false }
          })
        } else {
          isAnimating.value = false
        }
      })
    }
  } else if (!activeLyric && currentLyric.value !== "" && !isAnimating.value) {
    isAnimating.value = true
    if (lyricRef.value) {
      gsap.killTweensOf(lyricRef.value)
    }
    gsap.to(lyricRef.value, {
      opacity: 0,
      y: -10,
      duration: 0.25, // Faster
      ease: "power2.inOut",
      onComplete: () => {
        currentLyric.value = ""
        isAnimating.value = false
      }
    })
  }
}

onUnmounted(() => {
  if (timeCheckInterval) clearInterval(timeCheckInterval)
  window.removeEventListener('mousemove', handleMouseMove)
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
    class="hero-section relative w-full h-[100vw] md:h-[56.25vw] min-h-[400px] overflow-hidden transition-colors duration-1000"
    :class="[isNight ? 'bg-[#0B1426] is-night' : 'bg-[#5FBFCA] is-day']"
  >
    <!-- Day Layers -->
    <template v-if="!isNight">
      <div 
        v-for="(layer, index) in dayLayers" 
        :id="layer.id"
        :key="layer.id"
        :ref="el => { if (el) layersRef[index] = el as HTMLElement }"
        class="absolute pointer-events-none parallax-layer"
        :class="layer.style"
        :style="{ zIndex: (layer as any).zIndex || (index + 10) }"
      >
        <img 
          :src="layer.src" 
          :alt="layer.id"
          class="w-full h-full"
          :class="[
            (layer as any).blendMode || 'mix-blend-multiply',
            layer.style.includes('object-cover') ? 'object-cover' : 'object-contain'
          ]"
          loading="eager"
        />
      </div>
    </template>

    <!-- Night Layers (all full-frame 2560x1440 compositing layers) -->
    <template v-else>
      <div 
        v-for="(layer, index) in nightLayers" 
        :id="layer.id"
        :key="layer.id"
        :ref="el => { if (el) layersRef[index] = el as HTMLElement }"
        class="absolute pointer-events-none parallax-layer"
        :class="layer.style"
        :style="{ zIndex: (layer as any).zIndex || (index + 10) }"
      >
        <img 
          :src="layer.src" 
          :alt="layer.id"
          class="w-full h-full object-cover"
          :class="(layer as any).blendMode ? `mix-blend-${(layer as any).blendMode}` : ''"
          loading="eager"
        />
      </div>
    </template>

    <!-- Text Overlay: Refined LUVBLU title -->
    <div 
      ref="overlayRef"
      class="absolute inset-0 z-50 flex flex-col items-end justify-end md:justify-start pt-0 md:pt-40 pb-4 md:pb-0 px-4 md:pr-24 pointer-events-none"
    >
      <div class="text-right flex flex-col items-end">
        <h1 class="hidden md:block text-7xl md:text-9xl font-serif mb-1 drop-shadow-sm opacity-95 tracking-tighter italic"
            :class="isNight ? 'text-blue-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]' : 'text-[#1A4B6E] mix-blend-multiply'">
          LUVBLU
        </h1>
        <p class="hidden md:block text-xl md:text-2xl font-medium tracking-tight mb-8"
           :class="isNight ? 'text-blue-300' : 'text-blue-800'">
          Small actions, Create Big Waves.
        </p>
        <div class="flex gap-4 justify-end pointer-events-auto">
          <!-- Premium Day/Night Toggle -->
          <button 
            @click="toggleMode"
            class="group relative flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full transition-all duration-500 border border-white/20 shadow-2xl"
            :title="isNight ? 'Switch to Day' : 'Switch to Night'"
          >
            <div class="relative w-6 h-6 flex items-center justify-center">
              <span v-if="!isNight" class="text-xl transition-transform duration-500 group-hover:rotate-12">☀️</span>
              <span v-else class="text-xl transition-transform duration-500 group-hover:-rotate-12">🌙</span>
            </div>
            <span class="text-xs font-bold tracking-widest uppercase opacity-80" :class="isNight ? 'text-blue-100' : 'text-blue-900'">
              {{ isNight ? 'Night' : 'Day' }}
            </span>
          </button>
          <RouterLink to="/gallery" class="bg-blue-600/90 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-xl backdrop-blur-sm text-sm md:text-base">
            Explore Gallery
          </RouterLink>
          <RouterLink to="/about" class="hidden md:inline-block bg-white/80 hover:bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold transition-all shadow-lg backdrop-blur-md border border-blue-100 text-sm md:text-base">
            Our Story
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Minimal Bottom Fade -->
    <div class="absolute inset-x-0 bottom-0 h-16 md:h-32 bg-gradient-to-t from-white to-transparent z-[25] pointer-events-none"></div>

    <!-- Character Speech Bubble -->
    <div 
      v-if="currentLyric"
      ref="speechBubbleRef"
      class="absolute z-[60] pointer-events-none transition-all duration-300
             top-[50%] left-[44%] translate-x-[-50%]
             md:top-[45%] md:left-[41%]
             flex items-center justify-center"
    >
      <div 
        ref="lyricRef"
        class="speech-bubble"
      >
        <p class="speech-text">
          {{ currentLyric }}
        </p>
      </div>
    </div>
  </section>

  <!-- ─── SCRAPBOOK HERO (from luvblu_en.html) ─── -->
  <section id="scrapbook-hero">
    <div class="hero-bg"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Doodles -->
    <div class="doodle doodle-ring" style="top:18%;right:15%;opacity:0.25;">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" stroke="var(--teal)" stroke-width="2" stroke-dasharray="6 4" />
      </svg>
    </div>
    <div class="doodle doodle-star" style="top:32%;left:8%;opacity:0.5;">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 0v28M0 14h28M4 4l20 20M24 4L4 24" stroke="var(--mint)" stroke-width="1.5" />
      </svg>
    </div>
    <div class="doodle" style="bottom:22%;right:7%;opacity:0.35;animation:float 6s 1s ease-in-out infinite;">
      <svg width="48" height="44" viewBox="0 0 40 36" fill="none">
        <path
          d="M20 34L3 17C1 15 0 12 0 9.5 0 4.3 4.3 0 9.5 0c2.9 0 5.5 1.3 7.3 3.3L20 6.7l3.2-3.4C25 1.3 27.6 0 30.5 0 35.7 0 40 4.3 40 9.5c0 2.5-1 4.8-2.7 6.5L20 34z"
          stroke="var(--pink)" stroke-width="2" fill="none" />
      </svg>
    </div>

    <div class="hero-content section-inner" style="padding-top:0;padding-bottom:0;">
      <div class="hero-left">
        <div class="hero-badge">Blue Campaign - Let's work together ✨</div>
        <h1 class="hero-title font-serif">
          Small<br>
          <span class="accent">Actions,</span><br>
          Create <span class="pink">Big</span><br>
          Waves 🌊
        </h1>
        <p class="hero-subtitle text-slate-600 text-lg leading-relaxed italic opacity-80">
         Sharing Love for the Earth —<br>
         One Blue Picture at a Time
        </p>
        <div class="hero-actions">
          <RouterLink to="/blue-heart" class="btn-primary text-sm font-medium">Blue Campaign</RouterLink>
          <a href="https://www.instagram.com/ashley_luvblu" target="_blank" class="btn-secondary text-sm font-medium">@ashley_luvblu</a>
        </div>
      </div>

      <div class="hero-right">
        <!-- Wrapper 1 (Sakura - Large Center) -->
        <div class="photo-wrapper pw-1">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-1.jpg" alt="pollaroid 1" loading="lazy" style="height:190px;" />
            <div class="polaroid-label">First Spring, First Kiss ♡</div>
          </div>
          <div class="tape tape-pink"></div>
        </div>

        <!-- Wrapper 2 (Tulip - Top Left) -->
        <div class="photo-wrapper pw-2">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-2.jpg" alt="pollaroid 2"  loading="lazy" style="height:140px;" />
            <div class="polaroid-label">memories ✦</div>
          </div>
          <div class="tape tape-blue"></div>
        </div>

        <!-- Wrapper 3 (Wave - Far Top Right) -->
        <div class="photo-wrapper pw-3">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-3.jpg" alt="pollaroid 3" loading="lazy" style="height:130px;" />
            <div class="polaroid-label">My Blue Diary</div>
          </div>
          <div class="tape tape-pink"></div>
          <div class="sticker sticker-luv" style="top:110px; right:-10px; background:var(--blush); border-color:var(--pink); color:#d47fa0; transform:rotate(4deg);">🌊 #LUVBLU</div>
        </div>

        <!-- Wrapper 4 (Wave - Mid Right) -->
        <div class="photo-wrapper pw-4">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-4.jpg" alt="pollaroid 4" loading="lazy" style="height:150px;" />
            <div class="polaroid-label">My Blue Diary</div>
          </div>
          <div class="tape tape-blue"></div>
        </div>

        <!-- Wrapper 5 (Tulip - Bottom Left) -->
        <div class="photo-wrapper pw-5">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-5.jpg" alt="pollaroid 5" loading="lazy" style="height:150px;" />
            <div class="polaroid-label">memories ✦</div>
          </div>
          <div class="tape tape-blue"></div>
        </div>

        <!-- Wrapper 6 (Tulip - Bottom Mid) -->
        <div class="photo-wrapper pw-6">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-6.jpg" alt="pollaroid 6" loading="lazy" style="height:140px;" />
            <div class="polaroid-label">memories ✦</div>
          </div>
          <div class="tape tape-blue"></div>
        </div>

        <!-- Wrapper 7 (Tulip - Bottom Right) -->
        <div class="photo-wrapper pw-7">
          <div class="card-photo polaroid">
            <img class="polaroid-image" src="/pollaroid/pollaroid-7.jpg" alt="pollaroid 7" loading="lazy" style="height:150px;" />
            <div class="polaroid-label">memories ✦</div>
          </div>
          <div class="tape tape-blue"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --sb-sky: #A8D5EA;
  --sb-mint: #5BBCB8;
  --sb-teal: #3A9E9A;
  --sb-pink: #F5AECB;
  --sb-blush: #F9D4E4;
  --sb-ivory: #F7F4EE;
  --sb-cream: #EDE8DF;
  --sb-navy: #1D3557;
  --sb-darkblue: #2B4E72;
  --sb-warm: #C9A882;
  --sb-white: #FDFCFA;
}

section {
  user-select: none;
}

.speech-bubble {
  position: relative;
  background: #ffffff;
  border: 2px solid #2a2a2a;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(3px 4px 0 rgba(0,0,0,0.12));
  image-rendering: pixelated;
}

/* Tail border (outer) */
.speech-bubble::before {
  content: '';
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 18px solid #2a2a2a;
}

/* Tail fill (inner) */
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -13px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 14px solid #ffffff;
}

.speech-text {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1A4B6E;
  line-height: 1.4;
  letter-spacing: -0.02em;
  white-space: nowrap;
  padding: 14px 28px;
  margin: 0;
}

@media screen and (max-width: 760px) {
  .speech-text {
    font-size: 0.5rem;
    padding: 5px 10px;
    white-space: normal;
    max-width: 120px;
    text-align: center;
  }

  .speech-bubble::before {
    bottom: -12px;
    border-left-width: 9px;
    border-right-width: 9px;
    border-top-width: 12px;
  }

  .speech-bubble::after {
    bottom: -8px;
    border-left-width: 7px;
    border-right-width: 7px;
    border-top-width: 9px;
  }

  .sky-layer {
    width: 500px;
  }

  .sea-layer{
    width: 500px;
  }

  .sky-night-layer {
    width: 500px;
  }
}

/* Househill: position to match desktop composition */
.househill-layer {
  top: 39%;
}

@media screen and (max-width: 767px) {
  .househill-layer {
    top: 52%;
  }

  .househill-night-layer {
    top: 30%;
  }

  .speech-bubble {
    left: -10px;
  }

  .sky-layer {
    width: 500px;
  }

  .sea-layer img {
    object-position: bottom !important;
  }

  .small-island-1-layer {
    top: 89%;
  }

  .small-island-1-night-layer {
    top: 43%;
  }

  .small-island-2-layer {
    top: 95%;
  }

  .small-island-2-night-layer {
    top: 43%;
  }
  
  .whale-small-layer {
    top: 60%;
  }

  .whale-small-night-layer {
    top: 35%;
  }

  .character-layer {
     top: 57%;
  }

  .character-night-layer {
    top: 35%;
  }

  .kra-night-layer {
    top: 30%;
  }

  .whale-jump-layer {
    top: 35%;
  }

  .lighthouse-layer {
    top: 46%;
  }

  .lighthouse-night-layer {
    top: 30%;
  }

  .lighthouse-lights-night-layer {
    top: 30%;
  }
  
  .housesmoke-night-layer {
    top: 30%;
  }

  .whale-splash-layer {
    top: 62%;
  }
}

@media screen and (max-width: 360px) and (max-height: 780px) {
  .sea-layer {
    top: 70%;
  }
  .househill-layer {
    top: 58%;
  }

  .househill-night-layer {
    top: 37%;
  }

  .housesmoke-night-layer {
    top: 37%;
  }

  .lighthouse-night-layer {
    top: 37%;
  }

  .lighthouse-lights-night-layer{
    top: 37%;
  }

  .speech-bubble {
    bottom: -20px;
  }

  .whale-small-layer {
    top: 66%;
  }

  .small-island-1-layer {
    top: 90%;
  }

  .small-island-1-night-layer {
    top: 49%;
  }

  .small-island-2-layer {
    top: 95%;
  }

  .small-island-2-night-layer {
    top: 48%;
  }

  .lighthouse-layer {
    top: 54%;
  }

  .whale-splash-layer {
    top: 68%;
  }

  .whale-jump-layer {
    top: 40%;
  }

  .character-layer {
     top: 63%;
  }

  .whale-small-night-layer {
    top: 43%;
  }

  .character-night-layer {
    top: 43%;
  }

  .kra-night-layer {
    top: 37%;
  }

  .sea-night-layer {
    height: 105%;
    bottom: 0;
  }

  .sea-layer {
    height: 45%;
    bottom: 0;
  }
}



/* ─── SCRAPBOOK HERO STYLES (Scoped to #scrapbook-hero) ─── */
#scrapbook-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 48px 80px;
  position: relative;
  overflow: hidden;
  background: var(--ivory);
}

#scrapbook-hero .hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 20% 50%, rgba(168, 213, 234, 0.35) 0%, transparent 70%),
    radial-gradient(ellipse 50% 70% at 80% 30%, rgba(245, 174, 203, 0.25) 0%, transparent 65%),
    radial-gradient(ellipse 60% 50% at 60% 80%, rgba(91, 188, 184, 0.15) 0%, transparent 60%);
}

#scrapbook-hero .blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: float 8s ease-in-out infinite;
}

#scrapbook-hero .blob-1 { width: 300px; height: 300px; background: var(--sky); top: 10%; left: -80px; animation-delay: 0s; }
#scrapbook-hero .blob-2 { width: 200px; height: 200px; background: var(--pink); top: 20%; right: 5%; animation-delay: 2s; }
#scrapbook-hero .blob-3 { width: 250px; height: 250px; background: var(--mint); bottom: 15%; left: 30%; animation-delay: 4s; }

#scrapbook-hero .doodle { position: absolute; opacity: 0.6; }
#scrapbook-hero .doodle-star { animation: pulse-glow 3s ease-in-out infinite; }
#scrapbook-hero .doodle-ring { animation: spin-slow 20s linear infinite; }

@keyframes sb-spin-slow { to { transform: rotate(360deg); } }
@keyframes sb-pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

#scrapbook-hero .hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

#scrapbook-hero .hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(91, 188, 184, 0.12);
  border: 1px solid rgba(91, 188, 184, 0.3);
  border-radius: 50px;
  padding: 6px 16px;
  margin-bottom: 28px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 500;
  animation: fadeSlideUp 0.8s ease both;
}

#scrapbook-hero .hero-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  animation: pulse-glow 2s ease-in-out infinite;
}

#scrapbook-hero .hero-title {
  /* font-family: 'Caveat', cursive; */
  font-size: clamp(52px, 7vw, 88px);
  font-weight: 700;
  line-height: 1.05;
  color: var(--navy);
  margin-bottom: 12px;
  animation: fadeSlideUp 0.8s 0.1s ease both;
}

#scrapbook-hero .accent { color: var(--teal); }
#scrapbook-hero .pink { color: var(--pink); }

#scrapbook-hero .hero-subtitle {
  /* font-family: 'Gowun Batang', serif; */
  font-size: 18px;
  color: var(--darkblue);
  opacity: 0.7;
  line-height: 1.7;
  margin-bottom: 36px;
  font-style: italic;
  animation: fadeSlideUp 0.8s 0.2s ease both;
}

#scrapbook-hero .hero-tagline {
  font-family: 'Caveat', cursive;
  font-size: 22px;
  color: var(--teal);
  margin-bottom: 44px;
  animation: fadeSlideUp 0.8s 0.25s ease both;
}

#scrapbook-hero .hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeSlideUp 0.8s 0.35s ease both;
}

#scrapbook-hero .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--teal);
  color: var(--white);
  /* font-family: 'Caveat', cursive; */
  font-size: 18px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(91, 188, 184, 0.35);
}

#scrapbook-hero .btn-primary:hover {
  background: var(--mint);
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(91, 188, 184, 0.45);
}

#scrapbook-hero .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--navy);
  /* font-family: 'Caveat', cursive; */
  font-size: 18px;
  font-weight: 600;
  padding: 14px 32px;
  border-radius: 50px;
  border: 2px solid rgba(29, 53, 87, 0.2);
  text-decoration: none;
  transition: all 0.3s;
}

#scrapbook-hero .btn-secondary:hover {
  border-color: var(--teal);
  color: var(--teal);
  transform: translateY(-3px);
}

#scrapbook-hero .hero-right {
  position: relative;
  height: 700px;
  animation: fadeSlideUp 0.8s 0.4s ease both;
}

#scrapbook-hero .photo-wrapper {
  position: absolute;
  transition: all 0.4s ease;
}

#scrapbook-hero .photo-wrapper:hover {
  transform: rotate(0deg) scale(1.05) !important;
  z-index: 50;
}

#scrapbook-hero .card-photo {
  position: relative;
  background: white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

#scrapbook-hero .polaroid {
  padding: 14px 14px 48px;
  display: flex;
  flex-direction: column;
}

#scrapbook-hero .polaroid-image {
  width: 100%;
  object-fit: cover;
  border-radius: 2px;
  background: #f0f0f0;
}

#scrapbook-hero .polaroid-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Caveat', cursive;
  font-size: 15px;
  color: var(--sb-navy);
  opacity: 0.8;
}

/* Polaroids Arc Arrangement - Spaced Out */
#scrapbook-hero .pw-1 { width: 230px; height: 300px; top: 160px; left: 130px; transform: rotate(2deg); z-index: 10; }
#scrapbook-hero .pw-2 { width: 180px; height: 230px; top: 10px; left: -80px; transform: rotate(-8deg); z-index: 5; }
#scrapbook-hero .pw-3 { width: 180px; height: 230px; top: -30px; right: -50px; transform: rotate(9deg); z-index: 6; }
#scrapbook-hero .pw-4 { width: 180px; height: 230px; top: 250px; right: -80px; transform: rotate(-5deg); z-index: 7; }
#scrapbook-hero .pw-5 { width: 190px; height: 240px; bottom: 0px; left: -80px; transform: rotate(-6deg); z-index: 4; }
#scrapbook-hero .pw-6 { width: 180px; height: 230px; bottom: 20px; left: 150px; transform: rotate(3deg); z-index: 2; }
#scrapbook-hero .pw-7 { width: 190px; height: 240px; bottom: -50px; right: -20px; transform: rotate(5deg); z-index: 8; }

#scrapbook-hero .tape {
  position: absolute;
  height: 24px;
  border-radius: 2px;
  z-index: 15;
  opacity: 0.8;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

#scrapbook-hero .tape-pink { width: 80px; background: rgba(245, 174, 203, 0.7); transform: translateX(-50%) rotate(-2deg); }
#scrapbook-hero .tape-blue { width: 70px; background: rgba(168, 213, 234, 0.65); transform: translateX(-50%) rotate(3deg); }

#scrapbook-hero .pw-2 .tape { transform: translateX(-65%) rotate(-35deg); left: 15%; top: -8px; }
#scrapbook-hero .pw-4 .tape { transform: rotate(90deg); left: auto; right: -18px; top: 35%; width: 55px; }
#scrapbook-hero .pw-5 .tape { transform: rotate(-90deg); left: -18px; top: 35%; width: 55px; }
#scrapbook-hero .pw-7 .tape { transform: rotate(-95deg); left: auto; right: 25%; top: -12px; }

#scrapbook-hero .sticker {
  position: absolute;
  left: auto !important;
  width: max-content;
  font-family: 'Caveat', cursive;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 6px 14px;
  z-index: 20;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--sb-teal);
  background: var(--sb-white);
  color: var(--sb-teal);
}

#scrapbook-hero .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }

@media (max-width: 900px) {
  #scrapbook-hero { padding: 120px 24px 80px; }
  #scrapbook-hero .hero-content { grid-template-columns: 1fr; gap: 48px; }
  #scrapbook-hero .hero-right { height: 300px; }
  #scrapbook-hero .section-inner { padding: 0 24px; }
}

/* Global Reveal Classes */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible { opacity: 1; transform: translateY(0); }

</style>
