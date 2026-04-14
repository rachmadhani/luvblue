<script setup lang="ts">
import ContactForm from '@/components/common/ContactForm.vue'
</script>

<template>
  <main class="collab-page min-h-screen pt-32 pb-20 bg-[#0B1426] relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-mint/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="section-inner relative z-10 max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint/10 border border-mint/20 border-white text-white text-mint text-xs uppercase tracking-widest font-bold mb-6">
          ✦ Collaboration 
        </div>
        <h1 class="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
          Let’s Create <span class="text-mint">Waves</span> Together
        </h1>
        <p class="text-lg text-blue-200/60 max-w-2xl mx-auto font-batang italic">
          "Sharing Love for the Earth — One Blue Picture at a Time."
        </p>
      </div>

      <ContactForm />
      
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">🌱</div>
          <h3 class="text-white font-bold mb-2">Eco Brands</h3>
          <!-- <p class="text-xs text-blue-200/40">Partnering with sustainable labels to amplify their message.</p> -->
        </div>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">🌊</div>
          <h3 class="text-white font-bold mb-2">Marine Projects</h3>
          <!-- <p class="text-xs text-blue-200/40">Supporting ocean conservation and awareness initiatives.</p> -->
        </div>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">🎨</div>
          <h3 class="text-white font-bold mb-2">Creatives</h3>
          <!-- <p class="text-xs text-blue-200/40">Collaborating on art and visual stories that matter.</p> -->
        </div>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">📷</div>
          <h3 class="text-white font-bold mb-2">Content Collabs</h3>
          <!-- <p class="text-xs text-blue-200/40">Collaborating on art and visual stories that matter.</p> -->
        </div>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">♻️</div>
          <h3 class="text-white font-bold mb-2">Sustainability Campaigns
</h3>
          <!-- <p class="text-xs text-blue-200/40">Collaborating on art and visual stories that matter.</p> -->
        </div>
        <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div class="text-2xl mb-3">💙</div>
          <h3 class="text-white font-bold mb-2">Brand Partnerships
</h3>
          <!-- <p class="text-xs text-blue-200/40">Collaborating on art and visual stories that matter.</p> -->
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.collab-page {
  background-attachment: fixed;
}
</style>
