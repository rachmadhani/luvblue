<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
const mouse = { x: 0, y: 0 }
const audioPlayer = ref<HTMLAudioElement | null>(null)
const layersRef = ref<HTMLElement[]>([])
const speechBubbleRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

const isNight = ref(localStorage.getItem('home-hero-mode') === 'night')

const toggleMode = () => {
  isNight.value = !isNight.value
  localStorage.setItem('home-hero-mode', isNight.value ? 'night' : 'day')
}

// Manual positioning for each part to match loveblue_illustration.jpg
const dayLayers = [
  { id: 'sky', src: '/parallax/loveblue_background_sky.webp', depth: 0.04, style: 'w-full h-auto object-cover' },
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
  { id: 'sky_night', src: '/night-parallax/luvblu_night_sky.png', depth: 0.02, style: 'inset-0 w-full h-full', zIndex: 10 },
  { id: 'starry', src: '/night-parallax/APNG/luvblu_illustration_night_starry.png', depth: 0.03, style: 'inset-0 w-full h-full', zIndex: 15 },
  { id: 'star1', src: '/night-parallax/APNG/luvblu_illustration_night_star_1.png', depth: 0.035, style: 'inset-0 w-full h-full', zIndex: 12 },
  { id: 'star2', src: '/night-parallax/APNG/luvblu_illustration_night_star_2.png', depth: 0.04, style: 'inset-0 w-full h-full', zIndex: 12 },
  { id: 'star3', src: '/night-parallax/APNG/luvblu_illustration_night_star_3.png', depth: 0.045, style: 'inset-0 w-full h-full', zIndex: 12 },
  { id: 'star4', src: '/night-parallax/APNG/luvblu_illustration_night_star_4.png', depth: 0.05, style: 'inset-0 w-full h-full', zIndex: 12 },
  { id: 'star5', src: '/night-parallax/APNG/luvblu_illustration_night_star_5.png', depth: 0.055, style: 'inset-0 w-full h-full', zIndex: 12 },
  { id: 'shootingstar', src: '/night-parallax/APNG/luvblu_illustration_001_night_shootingstar.png', depth: 0.03, style: 'inset-0 w-full h-full', zIndex: 14 },
  { id: 'clouds_night', src: '/night-parallax/luvblu_illustration_night_clouds.png', depth: 0.06, style: 'inset-0 w-full h-full scale-105', zIndex: 13 },
  { id: 'lighthouse_lights', src: '/night-parallax/APNG/luvblu_illustration_001_night_lighthouse_light.png', depth: 0.08, style: 'inset-0 w-full h-full', zIndex: 18 },
  { id: 'sparkaroundlights', src: '/night-parallax/luvblu_night_sparkaroundlights.png', depth: 0.08, style: 'inset-0 w-full h-full', zIndex: 16 },
  { id: 'lighthouse_night', src: '/night-parallax/luvblu_night_lighthouse.png', depth: 0.10, style: 'inset-0 w-full h-full', zIndex: 17 },
  { id: 'househill_night', src: '/night-parallax/luvblu_night_househill.png', depth: 0.12, style: 'inset-0 w-full h-full', zIndex: 23 },
  { id: 'housesmoke', src: '/night-parallax/APNG/luvblu_illustration_001_night_housesmoke.png', depth: 0.12, style: 'inset-0 w-full h-full', zIndex: 19 },
  { id: 'small_island_1_night', src: '/night-parallax/luvblu_night_small_island_1.png', depth: 0.14, style: 'inset-0 w-full h-full', zIndex: 23 },
  { id: 'sea_night', src: '/night-parallax/luvblu_night_sea.png', depth: 0.16, style: 'inset-0 w-full h-full', zIndex: 21 },
  { id: 'kra', src: '/night-parallax/luvblu_night_kra.png', depth: 0.17, style: 'inset-0 w-full h-full', zIndex: 22 },
  { id: 'small_island_2_night', src: '/night-parallax/luvblu_night_small_island_2.png', depth: 0.18, style: 'inset-0 w-full h-full', zIndex: 23 },
  { id: 'whale_base_night', src: '/night-parallax/luvblu_night_whale_small.png', depth: 0.20, style: 'inset-0 w-full h-full', zIndex: 24 },
  { id: 'character_night', src: '/night-parallax/luvblu_night_character.png', depth: 0.22, style: 'inset-0 w-full h-full', zIndex: 25 },
  { id: 'glitter', src: '/night-parallax/luvblu_night_glitter.png', depth: 0.24, style: 'inset-0 w-full h-full', zIndex: 30 },
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

  // Night specific animations (GIFs handle starry, shooting star, lighthouse, smoke)
  if (isNight.value) {
    // Subtle cloud drift with scale to prevent gaps
    const cloudIdx = nightLayers.findIndex(l => l.id === 'clouds_night')
    if (layersRef.value[cloudIdx]) {
      gsap.to(layersRef.value[cloudIdx], {
        x: '+=30',
        scale: 1.1,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

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
    gsap.to([layersRef.value[whaleBaseIdx], layersRef.value[charIdx], speechBubbleRef.value], {
      y: '+=5',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Subtle breathing animation for character
  if (layersRef.value[charIdx]) {
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

onMounted(() => {
  initAnimations()
  window.addEventListener('mousemove', handleMouseMove)
})

watch(isNight, () => {
  nextTick(() => {
    initAnimations()
  })
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

    // Kill any in-progress animations on this element
    if (lyricRef.value) {
      gsap.killTweensOf(lyricRef.value)
    }

    if (lyricRef.value && currentLyric.value !== "") {
      // Fade out current lyric, then fade in new one
      gsap.to(lyricRef.value, {
        opacity: 0,
        y: -10,
        duration: 0.4,
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
                opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
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
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
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
      duration: 0.4,
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
    class="hero-section relative w-full h-[56.25vw] min-h-[400px] overflow-hidden transition-colors duration-1000"
    :class="isNight ? 'bg-[#0B1426]' : 'bg-[#5FBFCA]'"
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
      class="absolute inset-0 z-50 flex flex-col items-end justify-end md:justify-start pt-0 md:pt-40 pb-12 md:pb-0 px-6 md:pr-24 pointer-events-none"
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
</template>

<style scoped>
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
}

/* Househill: position to match desktop composition */
.househill-layer {
  top: 39%;
}

@media screen and (max-width: 767px) {
  .househill-layer {
    top: 50%;
  }

  .sea-layer img {
    object-position: bottom !important;
  }

  .small-island-1-layer {
    top: 84%;
  }

  .small-island-2-layer {
    top: 93%;
  }
  
  .whale-small-layer {
    top: 65%;
  }

  .character-layer {
     top: 61%;
  }

  .whale-jump-layer {
    top: 30%;
  }

  .lighthouse-layer {
    top: 45%;
  }

  .whale-splash-layer {
    top: 69%;
  }
}

@media screen and (max-width: 360px) and (max-height: 780px) {
  .househill-layer {
    top: 53%;
  }

  .whale-small-layer {
    top: 67%;
  }

  .small-island-1-layer {
    top: 86%;
  }

  .small-island-2-layer {
    top: 94%;
  }

  .lighthouse-layer {
    top: 45%;
  }
  .whale-splash-layer {
    top: 72%;
  }

  .whale-jump-layer {
    top: 35%;
  }

  .character-layer {
     top: 63%;
  }

  .sea-layer {
    height: 45%;
    bottom: 0;
  }
}

</style>
