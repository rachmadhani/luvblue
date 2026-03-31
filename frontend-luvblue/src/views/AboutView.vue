<template>
  <main class="pt-32 pb-24 px-4 min-h-screen bg-white">
    <div class="max-w-4xl mx-auto">
      <!-- Hero Section -->
      <section class="text-center mb-20">
        <h1 class="text-5xl md:text-7xl font-serif text-blue-950 mb-8 tracking-tighter leading-tight">
          One Heart,<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">500 Blue Stories.</span>
        </h1>
        <div class="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-12"></div>
      </section>

      <!-- Content Grid -->
      <div class="space-y-24">
        <!-- Our Mission -->
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl font-serif text-blue-900 tracking-tight">Our Mission</h2>
            <p class="text-slate-600 text-lg leading-relaxed">
              LUVBLU was born from a simple idea: that collective moments of peace and beauty can create a powerful visual impact. We've dedicated 500 pixels to 500 stories, all united by the color of calm.
            </p>
            <p class="text-slate-600 text-lg leading-relaxed">
              Every pixel filled represents a moment shared, a memory captured, and a contribution to a larger, living piece of digital art.
            </p>
          </div>
          <div class="relative group">
            <div class="absolute -inset-4 bg-blue-50 rounded-[2rem] transform rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
            <div class="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 flex items-center justify-center p-8">
              <div class="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center transform -rotate-3">
                <span class="text-white font-serif text-8xl">L</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Why Blue? -->
        <div class="bg-blue-50/50 rounded-[3rem] p-8 md:p-16 border border-blue-100/50">
          <div class="max-w-2xl">
            <h2 class="text-3xl font-serif text-blue-900 mb-6 tracking-tight">Why Blue?</h2>
            <p class="text-slate-600 text-lg leading-relaxed mb-8">
              In a world that's often loud and fast, blue is the color of the horizon where the sea meets the sky. It's the color of depth, stability, and trust. 
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-950">Serenity</h4>
                  <p class="text-sm text-slate-500">Promoting a sense of calm and focus in every pixel.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 class="font-bold text-blue-950">Unity</h4>
                  <p class="text-sm text-slate-500">Connecting individual moments into a single heart.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Join the Story -->
        <div class="text-center py-12">
          <h2 class="text-3xl font-serif text-blue-900 mb-6 tracking-tight">Be Part of the Heart</h2>
          <p class="text-slate-600 text-lg mb-10 max-w-xl mx-auto line-clamp-3">
            Your story, your moment, your blue. Help us fill the remaining pixels and complete the message of peace.
          </p>
          <RouterLink to="/signin" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-100 transform hover:scale-105">
            Share Your Moment
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
