<script setup lang="ts">
import { ref, onMounted } from 'vue'

const collabSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.12 })

  if (collabSection.value) observer.observe(collabSection.value)
})
</script>

<template>
  <!-- ─── COLLAB ─── -->
  <section id="collab" class="reveal-manual" ref="collabSection">
    <div class="section-inner collab-inner">
      <div class="section-tag" style="justify-content:center;color:var(--mint);">✦ Work Together</div>
      <h2 class="collab-title">Let's Create Waves Together</h2>
      <p class="collab-sub">
        "At my own pace, I write down my quiet resolves —<br>
        fully embracing this dazzling beginning with my most authentic breath."
      </p>
      
      <div class="collab-tags">
        <span class="collab-tag">🌱 Eco Brands</span>
        <span class="collab-tag">🌊 Marine Organizations</span>
        <span class="collab-tag">📷 Content Collabs</span>
        <span class="collab-tag">🎨 Creative Projects</span>
        <span class="collab-tag">♻️ Sustainability Campaigns</span>
        <span class="collab-tag">💙 Brand Partnerships</span>
      </div>

      <div class="flex justify-center mt-4">
        <RouterLink to="/collab" class="collab-btn">
          ✦ Say Hello →
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles kept here or moved to style.css as per user request.
   User asked for CSS in style.css, so I will move them there shortly. */
</style>
