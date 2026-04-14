<script setup lang="ts">
import { ref, onMounted } from 'vue'

const collabSection = ref<HTMLElement | null>(null)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Backend integration later as requested
  console.log('Form submitted:', form.value)
  setTimeout(() => {
    alert('Thank you! We will get back to you soon.')
    form.value = { name: '', email: '', subject: '', message: '' }
    isSubmitting.value = false
  }, 1000)
}

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

      <form @submit.prevent="handleSubmit" class="collab-form">
        <div class="collab-grid">
          <div class="collab-field">
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Your Name" 
              required 
              class="collab-input"
            />
          </div>
          <div class="collab-field">
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="Email Address" 
              required 
              class="collab-input"
            />
          </div>
        </div>
        <div class="collab-field">
          <input 
            v-model="form.subject" 
            type="text" 
            placeholder="Subject" 
            required 
            class="collab-input"
          />
        </div>
        <div class="collab-field">
          <textarea 
            v-model="form.message" 
            placeholder="Tell us about your project..." 
            required 
            rows="4" 
            class="collab-textarea"
          ></textarea>
        </div>
        <button type="submit" class="collab-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">✦ Send Message →</span>
          <span v-else>Sending...</span>
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles kept here or moved to style.css as per user request.
   User asked for CSS in style.css, so I will move them there shortly. */
</style>
