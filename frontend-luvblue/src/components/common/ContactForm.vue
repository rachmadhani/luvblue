<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
  <form @submit.prevent="handleSubmit" class="relative z-10 collab-form bg-navy/50 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
    <div class="collab-grid">
      <div class="collab-field">
        <label class="block text-xs uppercase tracking-widest text-white text-mint/60 mb-2 font-bold">Your Name</label>
        <input 
          v-model="form.name" 
          type="text" 
          placeholder="e.g. Luna Blue" 
          required 
          class="collab-input"
        />
      </div>
      <div class="collab-field">
        <label class="block text-xs uppercase tracking-widest text-white text-mint/60 mb-2 font-bold">Email Address</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="hello@example.com" 
          required 
          class="collab-input"
        />
      </div>
    </div>
    <div class="collab-field">
      <label class="block text-xs uppercase tracking-widest text-mint/60 mb-2 text-white font-bold">Subject</label>
      <input 
        v-model="form.subject" 
        type="text" 
        placeholder="How can we help?" 
        required 
        class="collab-input"
      />
    </div>
    <div class="collab-field">
      <label class="block text-xs uppercase tracking-widest text-mint/60 mb-2 text-white font-bold">Message</label>
      <textarea 
        v-model="form.message" 
        placeholder="Tell us about your project or idea..." 
        required 
        rows="5" 
        class="collab-textarea"
      ></textarea>
    </div>
    <button type="submit" class="collab-btn w-full justify-center group" :disabled="isSubmitting">
      <span v-if="!isSubmitting" class="flex items-center gap-2">
        ✦ Send Message 
        <span class="transition-transform group-hover:translate-x-1">→</span>
      </span>
      <span v-else>Sending Waves...</span>
    </button>
  </form>
</template>

<style scoped>
/* Scoped styles can be redundant since they are in style.css, but keeping for standalone feel if needed */
</style>
