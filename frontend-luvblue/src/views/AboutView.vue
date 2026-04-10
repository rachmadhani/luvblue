<script setup lang="ts">
import { onMounted, ref } from 'vue';

const heroSection = ref<HTMLElement | null>(null);
const visualCol = ref<HTMLElement | null>(null);
const textCol = ref<HTMLElement | null>(null);
const ourStory = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  [heroSection, visualCol, textCol, ourStory].forEach(refItem => {
    if (refItem.value) observer.observe(refItem.value);
  });
});
</script>

<template>
  <main class="pt-32 min-h-screen bg-[#fdfbf7]">
    <!-- Hero & Our Story (Constrained Width) -->
    <div class="max-w-6xl mx-auto px-4 mb-24">
      <section class="text-center mb-20 reveal-manual" ref="heroSection">
        <h1 class="text-5xl md:text-7xl font-serif text-blue-950 mb-8 tracking-tighter leading-tight">
          Small Actions,<br />
          <span style="color: #71ccd4">Create Big Waves.</span>
        </h1>
        <div class="w-24 h-1 mx-auto rounded-full mb-12" style="background-color: #71ccd4"></div>
      </section>

      <!-- Our Story (Original) -->
      <div class="grid md:grid-cols-2 gap-12 items-center reveal-manual" ref="ourStory">
        <div class="space-y-6">
          <h2 class="text-3xl font-serif text-blue-900 tracking-tight ">Our Story</h2>
          <p class="text-slate-600 text-lg leading-relaxed  italic opacity-80">
            In our daily lives, it is not easy to completely avoid plastic or disposable products. Still, I believe that even small actions can lead to big change. Something as simple as carrying a tumbler or bringing an eco-bag when shopping can help reduce the use of disposable cups and plastic bags.
          </p>
          <p class="text-slate-600 text-lg leading-relaxed  italic opacity-80">
            We may not be able to change everything at once, but small choices and consistent actions can grow into something much bigger. That belief is the reason I started this campaign — to encourage us all to take small steps together and create meaningful change. From Ashely
          </p>
        </div>
        <div class="relative group">
          <div class="absolute -inset-4 bg-blue-600/5 rounded-[2rem] transform rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
          <div class="relative aspect-square bg-slate-100 rounded-2xl shadow-xl overflow-hidden border border-blue-100 flex items-center justify-center">
            <img src="/story/ashley_pic.png" alt="Ashley Profile" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed About Section (Full Width Background) -->
    <section id="about" class="py-[100px]">
      <div class="max-w-6xl mx-auto px-4">
        <div class="about-grid">
          <!-- Visual -->
          <div class="about-visual reveal-manual" ref="visualCol">
            <div class="about-card-main">
              <img src="/logo/LUVBLU.png" alt="LUVBLU Logo" class="w-full h-full object-contain p-8" loading="lazy" />
            </div>

            <div class="about-note">
              <div class="pin"></div>
              <div class="about-note-lines">
                <div class="about-note-line"></div>
                <div class="about-note-line"></div>
                <div class="about-note-line"></div>
                <div class="about-note-line"></div>
                <div class="about-note-line"></div>
              </div>
              <div class="about-note-text font-caveat">
                "The ocean taught me<br>
                that beauty is always<br>
                worth protecting. 🌊<br><br>
                — Ashley ♡"
              </div>
            </div>

            <!-- Tape & sticker decorations -->
            <!-- <div class="tape"></div> -->
            <!-- <div class="sticker font-caveat">🐚 ocean lover</div> -->
            <div class="floating-heart animate-float">
              <svg width="36" height="32" viewBox="0 0 40 36" fill="#5BBCB8">
                <path d="M20 34L3 17C1 15 0 12 0 9.5 0 4.3 4.3 0 9.5 0c2.9 0 5.5 1.3 7.3 3.3L20 6.7l3.2-3.4C25 1.3 27.6 0 30.5 0 35.7 0 40 4.3 40 9.5c0 2.5-1 4.8-2.7 6.5L20 34z" />
              </svg>
            </div>
          </div>

          <!-- Text -->
          <div class="reveal-manual space-y-6" ref="textCol">
            <div class="section-tag">My Story</div>
            <h2 class="section-title font-serif">
              Those who feel<br>
              beauty are the ones<br>
              who <span style="color: #71ccd4;">protect it.</span>
            </h2>
            <div class="space-y-6">
              <p class="text-slate-600 text-lg section-body italic opacity-80">
                There are many ways to talk about the environment. I am not expecting some huge change. I simply want people to experience nature as it is, because I believe the world begins to change when people fall in love with it.
              </p>
              <p class="text-slate-600 text-lg section-body italic opacity-80">
                I'm someone who tears up at the sight of ocean sunsets, who stops walking just to listen to cherry blossoms
                fall. The day I realized that beauty might disappear — that's when LUVBLU began.
              </p>
            </div>

            <div class="meaning-row">
              <div class="meaning-card pink">
                <div class="meaning-letter">LUV</div>
                <div class="meaning-desc font-dm">Love — for the ocean, the earth, and all the quiet beauty of everyday life.</div>
              </div>
              <div class="meaning-card blue">
                <div class="meaning-letter">BLU</div>
                <div class="meaning-desc font-dm">Blue — the color of what we must protect. The sea. The sky. Hope.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

