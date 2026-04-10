<script setup lang="ts">
import { onMounted, ref } from 'vue';

const heroSection = ref<HTMLElement | null>(null);
const visualCol = ref<HTMLElement | null>(null);
const textCol = ref<HTMLElement | null>(null);
const ourStory = ref<HTMLElement | null>(null);
const collabSection = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  [heroSection, visualCol, textCol, ourStory, collabSection].forEach(refItem => {
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
              <img src="/logo/LUVBLU.png" alt="LUVBLU Logo" class="w-full h-full object-contain p-8" />
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
        <a href="mailto:hello@luvblu.com" class="collab-btn">✦ Say Hello →</a>
      </div>
    </section>

    <!-- ─── FOOTER ─── -->
    <footer>
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <svg width="26" height="24" viewBox="0 0 40 36" fill="var(--teal)">
                <path d="M20 34L3 17C1 15 0 12 0 9.5 0 4.3 4.3 0 9.5 0c2.9 0 5.5 1.3 7.3 3.3L20 6.7l3.2-3.4C25 1.3 27.6 0 30.5 0 35.7 0 40 4.3 40 9.5c0 2.5-1 4.8-2.7 6.5L20 34z" />
                <circle cx="20" cy="17" r="5" fill="#111E2E" />
              </svg>
              LUVBLU
            </div>
            <p class="footer-tagline">
              Small Actions, Create Big Waves.<br>
              A love letter to the earth — #LUVBLU
            </p>
            <div class="footer-social">
              <a href="https://www.instagram.com/ashley_luvblu" target="_blank" class="social-btn">📸</a>
              <a href="https://www.luvblu.com" class="social-btn">🌊</a>
              <a href="mailto:hello@luvblu.com" class="social-btn">💌</a>
            </div>
          </div>

          <div>
            <div class="footer-col-title">Diary</div>
            <ul class="footer-links">
              <li><a href="#diary">My Blue Diary</a></li>
              <li><a href="#diary">Blue Letters</a></li>
              <li><a href="#diary">Seasonal Stories</a></li>
              <li><a href="#diary">Small Actions</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Content</div>
            <ul class="footer-links">
              <li><a href="#reels">Blue Note Vol.1</a></li>
              <li><a href="#reels">Blue Note Vol.2</a></li>
              <li><a href="#reels">Hip Recycling</a></li>
              <li><a href="https://www.instagram.com/ashley_luvblu" target="_blank">All Reels</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Connect</div>
            <ul class="footer-links">
              <li><a href="#shop">Eco Shop (Soon)</a></li>
              <li><a href="#shop">Join Waitlist</a></li>
              <li><a href="#collab">Collab Inquiry</a></li>
              <li><a href="https://www.luvblu.com">luvblu.com</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-copy">© 2026 LUVBLU · @ashley_luvblu · All rights reserved</span>
          <span class="footer-heart">made with 💙 for the ocean</span>
        </div>
      </div>
    </footer>
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
  height: 550px;
}

.about-card-main {
  position: absolute;
  width: 380px;
  height: 440px;
  top: 0;
  left: 0;
  transform: none;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 48px rgba(29, 53, 87, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
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

/* ─── FOOTER ─── */
footer {
  background: #111E2E;
  padding: 64px 48px 32px;
  margin-top: 0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 32px;
}

.footer-logo {
  font-family: var(--font-caveat);
  font-size: 32px;
  font-weight: 700;
  color: var(--teal);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.footer-tagline {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.7;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  gap: 12px;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
  cursor: pointer;
  text-decoration: none;
}

.social-btn:hover {
  background: var(--teal);
  transform: translateY(-2px);
}

.footer-col-title {
  font-family: var(--font-caveat);
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
}

.footer-links a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--mint);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
}

.footer-heart {
  font-family: var(--font-caveat);
  font-size: 14px;
  color: var(--pink);
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
  footer {
    padding: 48px 24px 24px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

/* ─── COLLAB ─── */
#collab {
  background: var(--navy);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

#collab::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(91, 188, 184, 0.1) 0%, transparent 70%);
}

.collab-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

.collab-title {
  font-family: var(--font-caveat);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  color: var(--white);
  margin-bottom: 16px;
}

.collab-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 40px;
  font-family: var(--font-batang);
  font-style: italic;
}

.collab-tags {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.collab-tag {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
  padding: 8px 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.collab-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: var(--mint);
  font-family: var(--font-caveat);
  font-size: 20px;
  font-weight: 600;
  padding: 14px 36px;
  border-radius: 50px;
  border: 2px solid var(--mint);
  text-decoration: none;
  transition: all 0.3s;
}

.collab-btn:hover {
  background: var(--mint);
  color: var(--navy);
  transform: translateY(-3px);
}
</style>
