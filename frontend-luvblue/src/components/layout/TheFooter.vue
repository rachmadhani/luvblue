<script setup lang="ts">
// Footer component
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/logo/LUVBLU.png" alt="LUVBLU Logo" class="h-62 w-auto opacity-100" loading="lazy" />
          </div>
          <p class="footer-tagline">
            Small Actions, Create Big Waves.<br>
            A love letter to the earth — #LUVBLU
          </p>
          <div class="footer-social">
            <a href="https://www.instagram.com/ashley_luvblu" target="_blank" class="social-btn" title="Instagram">📸</a>
            <a href="https://www.luvblu.com" class="social-btn" title="Website">🌊</a>
            <a href="mailto:hello@luvblu.com" class="social-btn" title="Email">💌</a>
          </div>
        </div>

        <div>
          <!-- <div class="footer-col-title">Diary</div> -->
          <ul class="footer-links mt-15">
            <li><RouterLink to="/about">Our Story</RouterLink></li>
            <li><RouterLink to="/blue-heart">Blue Heart</RouterLink></li>
          </ul>
        </div>

        <div>
          <!-- <div class="footer-col-title">Content</div> -->
          <ul class="footer-links mt-15">
             <li><RouterLink to="/diary">Blue Diary</RouterLink></li>
            <li><RouterLink to="/gallery">Blue Gallery</RouterLink></li>
          </ul>
        </div>

        <div>
          <!-- <div class="footer-col-title">Connect</div> -->
          <ul class="footer-links mt-15">
             <li><RouterLink to="/note">Blue Note</RouterLink></li>
            <li><RouterLink to="/collab">Collab</RouterLink></li>
          </ul>
        </div>
        <div>
          <!-- <div class="footer-col-title">Legal</div> -->
          <ul class="footer-links mt-15">
            <li><RouterLink to="/privacy">Privacy Policy</RouterLink></li>
            <li><RouterLink to="/terms">Terms of Use</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© 2026 LUVBLU · @ashley_luvblu · All rights reserved</span>
        <span class="footer-heart">made with 💙 for the ocean</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Scoped styles will be moved to style.css as per user request */
</style>
