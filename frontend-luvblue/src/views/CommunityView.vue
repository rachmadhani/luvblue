<template>
  <main class="pt-32 pb-24 px-4 min-h-screen bg-slate-50/50">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-20">
        <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6 transform hover:scale-105 transition-transform">
          <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Community
        </div>
        <h1 class="text-5xl md:text-6xl font-serif text-blue-950 mb-6 tracking-tight">
          United by Blue
        </h1>
        <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed line-clamp-3">
          LUVBLU is more than just a heart. It's a collection of unique stories and individuals who find beauty in the calmest of colors.
        </p>
      </header>

      <!-- Contributors Section -->
      <section class="mb-24">
        <h2 class="text-2xl font-serif text-blue-900 mb-10 text-center tracking-tight">Featured Contributors</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="i in 4" :key="i" class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group text-center">
            <div class="w-24 h-24 bg-blue-50 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-blue-50">
               <div class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                 <span class="text-white text-3xl font-bold opacity-20">B{{ i }}</span>
               </div>
            </div>
            <h4 class="text-lg font-bold text-blue-950 mb-1 line-clamp-1">Blue Friend #{{ i }}</h4>
            <p class="text-sm text-slate-500 mb-4 line-clamp-1">3 Moments Shared</p>
            <div class="flex justify-center gap-2">
              <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div class="w-2 h-2 bg-blue-200 rounded-full"></div>
              <div class="w-2 h-2 bg-blue-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Join Section -->
      <section class="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
        <!-- Decor -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-serif mb-6 tracking-tight leading-tight">Ready to join the movement?</h2>
          <p class="text-blue-100 mb-10 text-lg max-w-xl mx-auto line-clamp-3">
            Every blue moment counts. Create your account and start contributing to the 500 Blue Hearts today.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/signup" class="bg-white text-blue-600 px-10 py-4 rounded-full font-bold transition-all hover:bg-blue-50 shadow-lg">
              Get Started
            </RouterLink>
            <RouterLink to="/about" class="bg-blue-500 text-white border border-blue-400 px-10 py-4 rounded-full font-bold transition-all hover:bg-blue-500/80">
              Learn More
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
