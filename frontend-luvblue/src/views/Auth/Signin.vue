<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/"
              class="inline-flex items-center gap-2 group transition-all"
            >
              <img src="/logo/LUVBLU.png" alt="LUVBLU Logo" class="h-36 w-auto object-contain" loading="lazy" />
            </router-link>
          </div>
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-serif font-bold text-blue-950 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Welcome Back
                </h1>
                <p class="text-sm text-slate-500 dark:text-gray-400">
                  Step back into our blue community.
                </p>
              </div>
              <div>
                <form @submit.prevent="handleSubmit">
                  <div class="space-y-5">
                    <!-- Email -->
                    <div>
                      <label
                        for="email"
                        class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-400"
                      >
                        Email<span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        class="dark:bg-dark-900 h-11 w-full rounded-xl border border-blue-100 bg-blue-50/20 px-4 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                      />
                    </div>
                    <!-- Password -->
                    <div>
                      <label
                        for="password"
                        class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-400"
                      >
                        Password<span class="text-red-500">*</span>
                      </label>
                      <div class="relative">
                        <input
                          v-model="password"
                          :type="showPassword ? 'text' : 'password'"
                          id="password"
                          placeholder="Your password"
                          class="dark:bg-dark-900 h-11 w-full rounded-xl border border-blue-100 bg-blue-50/20 py-2.5 pl-4 pr-11 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        />
                        <span
                          @click="togglePasswordVisibility"
                          class="absolute z-30 text-slate-400 -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:text-blue-600 transition-colors"
                        >
                          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a10.78 10.78 0 0 1-12.022-1.81 1 1 0 0 1 0-.696 10.74 10.74 0 0 1 4.444-5.19"/><path d="m2 2 20 20"/><path d="M8.544 8.544a3 3 0 0 0 4.242 4.242"/><circle cx="12" cy="12" r="3" class="opacity-0"/></svg>
                        </span>
                      </div>
                    </div>
                    <!-- Checkbox -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <input
                          v-model="keepLoggedIn"
                          type="checkbox"
                          id="keepLoggedIn"
                          class="w-4 h-4 rounded border-blue-200 text-blue-600 focus:ring-blue-500/20"
                        />
                        <label
                          for="keepLoggedIn"
                          class="text-sm font-normal text-slate-500 hover:text-slate-700 cursor-pointer select-none dark:text-gray-400"
                        >
                          Keep me signed in
                        </label>
                      </div>
                      <router-link
                        to="/reset-password"
                        class="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >Forgot password?</router-link
                      >
                    </div>
                    <!-- Button -->
                    <div>
                      <button
                        type="submit"
                        class="flex items-center justify-center w-full px-4 py-3.5 text-sm font-semibold text-white transition-all rounded-xl bg-blue-600 shadow-blue-100 shadow-xl hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98]"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
                <div class="mt-8 pt-6 border-t border-slate-100">
                  <p
                    class="text-sm font-normal text-center text-slate-500 dark:text-gray-400"
                  >
                    New to our world?
                    <router-link
                      to="/signup"
                      class="font-semibold text-blue-600 hover:text-blue-700"
                      >Create an account</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right side info section -->
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 bg-blue-950 dark:bg-white/5 lg:flex overflow-hidden"
        >
          <div class="absolute inset-0 opacity-20">
             <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-transparent"></div>
             <common-grid-shape />
          </div>
          
          <div class="relative flex flex-col items-center justify-center w-full p-12 text-center z-10">
            <div class="mb-12">
               <img src="/logo/LUVBLU_Logo_transparend.png" alt="LUVBLU Logo" class="h-42 w-auto object-contain mx-auto mb-6 drop-shadow-2xl" loading="lazy" />
               <h2 class="text-white font-serif text-4xl mb-4 leading-tight">Every blue moment<br/><span class="italic">fills our heart.</span></h2>
               <p class="text-blue-200/80 max-w-sm mx-auto font-light leading-relaxed">
                 Join 5,000+ members in sharing the beauty of our blue world through photos and moments.
               </p>
            </div>
            
            <div class="grid grid-cols-3 gap-4 w-full max-w-md opacity-50">
               <div class="aspect-square bg-blue-400/20 rounded-xl animate-pulse"></div>
               <div class="aspect-square bg-blue-300/20 rounded-xl animate-pulse delay-75"></div>
               <div class="aspect-square bg-blue-500/20 rounded-xl animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import { authService } from '@/services/authService'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(false)
const isLoading = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    toast.error('Please enter both email and password')
    return
  }

  isLoading.value = true
  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    })

    if (response.success) {
      toast.success('Login successful! Welcome back.')
      router.push('/admin')
    } else {
      toast.error(response.message || 'Login failed')
    }
  } catch (error: any) {
    toast.error(error.message || 'An error occurred during login')
  } finally {
    isLoading.value = false
  }
}
</script>
