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
  <main class="pt-32 pb-24 min-h-screen bg-[#fdfbf7]">
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
              <div style="text-align:center;">
                <div style="font-size:72px;margin-bottom:12px;">🌊</div>
                <div class="font-caveat text-[28px] font-bold text-white opacity-90">Ashley</div>
                <div class="font-caveat text-[16px] text-white/65 mt-1">@ashley_luvblu</div>
              </div>
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
            <div class="tape"></div>
            <div class="sticker font-caveat">🐚 ocean lover</div>
            <div class="floating-heart animate-float">
              <svg width="36" height="32" viewBox="0 0 40 36" fill="#5BBCB8">
                <path d="M20 34L3 17C1 15 0 12 0 9.5 0 4.3 4.3 0 9.5 0c2.9 0 5.5 1.3 7.3 3.3L20 6.7l3.2-3.4C25 1.3 27.6 0 30.5 0 35.7 0 40 4.3 40 9.5c0 2.5-1 4.8-2.7 6.5L20 34z" />
              </svg>
            </div>
          </div>

          <!-- Text -->
          <div class="reveal-manual" ref="textCol">
            <div class="section-tag">My Story</div>
            <h2 class="section-title font-caveat">
              Those who feel<br>
              beauty are the ones<br>
              who <span style="color: #3A9E9A;">protect it.</span>
            </h2>
            <p class="section-body font-batang">
              I'm someone who tears up at the sight of ocean sunsets, who stops walking just to listen to cherry blossoms
              fall. The day I realized that beauty might disappear — that's when LUVBLU began.
            </p>
            <p class="section-body font-batang">
              There are many ways to talk about the environment. I choose to write love letters. Not campaigns — diaries.
              Not lectures — feelings. Because I believe the world changes when people fall in love with it first.
            </p>

            <div class="meaning-row">
              <div class="meaning-card blue">
                <div class="meaning-letter">LUV</div>
                <div class="meaning-desc font-dm">Love — for the ocean, the earth, and all the quiet beauty of everyday life.</div>
              </div>
              <div class="meaning-card pink">
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

<style scoped>
#about {
  --sky: #A8D5EA;
  --mint: #5BBCB8;
  --teal: #3A9E9A;
  --pink: #F5AECB;
  --blush: #F9D4E4;
  --ivory: #F7F4EE;
  --cream: #EDE8DF;
  --navy: #1D3557;
  --darkblue: #2B4E72;
  --warm: #C9A882;
  --white: #ffffff;

  --font-caveat: "Caveat", cursive;
  --font-batang: "Gowun Batang", serif;
  --font-dm: "DM Sans", sans-serif;

  background: #ffffff;
  color: var(--navy);
  font-family: var(--font-dm);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-visual {
  position: relative;
  height: 500px;
}

.about-card-main {
  position: absolute;
  width: 300px;
  height: 360px;
  top: 0;
  left: 0;
  transform: rotate(-3deg);
  background: linear-gradient(145deg, var(--sky), var(--mint));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 48px rgba(29, 53, 87, 0.12);
}

.about-note {
  position: absolute;
  width: 220px;
  background: #FFFEF5;
  border: 1px solid rgba(201, 168, 130, 0.3);
  padding: 28px 20px 20px;
  bottom: 40px;
  right: 0;
  transform: rotate(2deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.about-note-lines {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.about-note-line {
  height: 1px;
  background: rgba(168, 213, 234, 0.55);
}

.about-note-text {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  font-size: 15px;
  color: var(--darkblue);
  line-height: 1.8;
}

.pin {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sky);
  border: 3px solid rgba(168, 213, 234, 0.8);
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.meaning-row {
  display: flex;
  gap: 20px;
  margin-top: 36px;
}

.meaning-card {
  flex: 1;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1.5px solid;
}

.meaning-card.blue {
  background: rgba(168, 213, 234, 0.1);
  border-color: rgba(168, 213, 234, 0.4);
}

.meaning-card.pink {
  background: rgba(245, 174, 203, 0.1);
  border-color: rgba(245, 174, 203, 0.4);
}

.meaning-letter {
  font-family: var(--font-caveat);
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 6px;
}

.meaning-card.blue .meaning-letter {
  color: var(--teal);
}

.meaning-card.pink .meaning-letter {
  color: var(--pink);
}

.meaning-desc {
  font-size: 13px;
  color: var(--darkblue);
  opacity: 0.7;
  line-height: 1.5;
}

.section-tag {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 500;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-tag::before {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--teal);
}

.section-title {
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 700;
  line-height: 1.15;
  color: var(--navy);
  margin-bottom: 24px;
}

.section-body {
  font-size: 16px;
  line-height: 1.9;
  color: var(--darkblue);
  opacity: 0.8;
  margin-bottom: 20px;
}

.tape {
  position: absolute;
  width: 56px;
  top: 8px;
  left: 126px;
  transform: rotate(-5deg);
  background: rgba(245, 174, 203, 0.7);
  height: 18px;
  border-radius: 2px;
  z-index: 5;
}

.sticker {
  position: absolute;
  top: 185px;
  left: -14px;
  transform: rotate(-8deg);
  font-size: 13px;
  background: var(--white);
  border: 2px solid var(--teal);
  border-radius: 8px;
  padding: 6px 12px;
  color: var(--teal);
  z-index: 8;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
}

.floating-heart {
  position: absolute;
  bottom: 60px;
  left: 200px;
  opacity: 0.3;
}

.reveal-manual {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-manual.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .about-visual {
    display: none;
  }
}
</style>
