<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Home, User, Lock, ArrowRight } from 'lucide-vue-next'
import {useAuthStore} from "../stores/AuthStore.js";

const router = useRouter()
const auth = useAuthStore();

const form = ref({ identifier: '', password: '' });
const errorMsg = ref('');
const error = ref('');
const isLoading = ref(false)

const handleLogin = async () => {
  if (!form.value.identifier || !form.value.password) {
    error.value = "Username dan password wajib diisi";
    return;
  }

  isLoading.value = true;
  error.value = '';
  errorMsg.value = '';

  try {
    const user = await auth.login(form.value);

    // Redirect berdasarkan role yang datang dari backend
    if (user.role === 'admin') {
      router.push('/admin');
    } else if (user.role === 'guru') {
      router.push('/guru');
    } else {
      router.push('/santri');
    }
  } catch (err) {
    // Menangkap pesan error dari backend (PHP)
    error.value = err;
    console.error("Login Error:", err);
  } finally {
    isLoading.value = false;
  }
};

const goToLanding = () => {
  router.push('/landing')
}
</script>

<template>
  <div
      class="min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-[url(./bg.jpeg)] bg-cover">

    <!-- Background Decoration -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-200/30 blur-3xl"></div>
      <div class="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary-300/20 blur-3xl"></div>
    </div>

    <!-- Home Button -->
    <button
        @click="goToLanding"
        class="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-primary-700 rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 font-medium"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
    >
      <Home class="w-4 h-4" />
      <span>Home</span>
    </button>

    <!-- Login Card -->
    <div
        class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl z-10 mx-4 border border-gray-100"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <div class="text-center mb-8">
        <div
            class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="w-8 h-8">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900">SantriConnect</h1>
        <p class="text-gray-500 mt-2 text-sm">Masuk untuk mengelola pesantren</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 ml-1">Username</label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                v-model="form.identifier"
                type="text"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                placeholder="Masukkan username"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 ml-1">Password</label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                v-model="form.password"
                type="password"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                placeholder="Masukkan password"
            />
          </div>
        </div>

        <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          {{ error }}
        </div>

        <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          <span v-if="!isLoading">Masuk Dashboard</span>
          <ArrowRight v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>

        <div v-if="errorMsg" class="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
          {{ errorMsg }}
        </div>
      </form>

      <div class="mt-8 text-center">
        <p class="text-xs text-gray-400">© 2025 SantriConnect Platform</p>
      </div>
    </div>
  </div>
</template>
