<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, X, ChevronDown } from 'lucide-vue-next'

const router = useRouter()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeDropdown = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const goToSection = async (id) => {
  isMenuOpen.value = false
  activeDropdown.value = null
  await router.push({ path: '/landing', hash: `#${id}` })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
      class="fixed w-full z-50 transition-all duration-300"
      :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'"
  >
    <div class="container mx-auto px-4 md:px-8 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center gap-2 font-bold text-2xl text-primary-700">
        <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" class="w-6 h-6">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        SantriConnect
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <button @click="goToSection('home')" class="nav-link">
          Home
        </button>
        <button @click="goToSection('about')" class="nav-link">
          Tentang Kami
        </button>
        <button @click="goToSection('fasilitas')" class="nav-link">
          Fasilitas
        </button>
        <button @click="goToSection('program')" class="nav-link">
          Program
        </button>
        <button @click="goToSection('contact')" class="nav-link">
          Kontak
        </button>
      </div>

      <!-- CTA -->
      <div class="hidden md:block">
        <button
            @click="router.push('/')"
            class="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium
                 hover:bg-primary-700 shadow-lg shadow-primary-600/20"
        >
          Masuk Akun
        </button>
      </div>

      <!-- Mobile Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-700">
        <Menu v-if="!isMenuOpen" class="w-7 h-7" />
        <X v-else class="w-7 h-7" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
        v-if="isMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white
             border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4"
    >
      <button @click="goToSection('home')" class="nav-link">
        Home
      </button>
      <button @click="goToSection('about')" class="nav-link">
        Tentang Kami
      </button>
      <button @click="goToSection('fasilitas')" class="nav-link">
        Fasilitas
      </button>
      <button @click="goToSection('program')" class="nav-link">
        Program
      </button>
      <button @click="goToSection('contact')" class="nav-link">
        Kontak
      </button>

      <button
          @click="router.push('/')"
          class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium"
      >
        Masuk Akun
      </button>
    </div>
  </nav>
</template>

<style scoped>

</style>
