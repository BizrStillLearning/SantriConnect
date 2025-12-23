<script setup>
import { useRoute } from 'vue-router'
import { Bell, Menu, UserIcon, ChevronDown } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref} from 'vue'
import {useAuthStore} from "../stores/AuthStore.js";

const auth = useAuthStore();

const emit = defineEmits(['open-menu'])
const route = useRoute()

const isProfileOpen = ref(false)

// Menutup dropdown jika klik di luar area profil
const closeDropdown = (e) => {
  if (!e.target.closest('#user-menu')) {
    isProfileOpen.value = false
  }
}

const activePageTitle = computed(() => {
  if (route.path === '/dashboard') return 'Dashboard'
  const pathName = route.path.split('/').pop().replace(/-/g, ' ')
  return pathName || 'Dashboard'
})

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  })
})

onMounted(() => window.addEventListener('click', closeDropdown))
onUnmounted(() => window.removeEventListener('click', closeDropdown))
</script>

<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
    <div class="flex items-center gap-3">
      <button
          @click="emit('open-menu')"
          class="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu class="w-6 h-6" />
      </button>

      <h2 class="text-lg lg:text-xl font-bold text-gray-800 capitalize truncate max-w-[150px] md:max-w-none">
        {{ activePageTitle }}
      </h2>
    </div>

    <div class="flex items-center gap-2 lg:gap-4">
      <div class="hidden sm:block text-[10px] lg:text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
        {{ formattedDate }}
      </div>

      <button class="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full">
        <Bell class="w-5 h-5" />
        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div class="relative" id="user-menu">
        <button
            @click.stop="isProfileOpen = !isProfileOpen"
            class="flex items-center gap-3 pl-4 border-l border-gray-100 hover:bg-gray-50 transition-all rounded-lg py-1 group"
        >
          <div class="text-center hidden sm:block">
            <p class="text-sm font-bold text-gray-900 leading-none mb-1">
              {{ auth.user?.username || auth.user?.nama }}
            </p>
            <p class="text-xs text-primary-600 font-medium capitalize">
              {{ auth.user?.role }}
            </p>
          </div>

          <div class="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 border border-gray-200 group-hover:border-primary-500 transition-all">
            <UserIcon class="w-5 h-5" />
          </div>

          <ChevronDown class="w-4 md:hidden h-4 text-gray-400 transition-transform duration-200" :class="{'rotate-180': isProfileOpen}" />
        </button>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
          <div
              v-if="isProfileOpen"
              class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div class="p-4 border-b border-gray-50 bg-gray-50 sm:hidden">
              <p class="text-sm font-bold text-gray-900">{{ auth.user?.username || auth.user?.nama }}</p>
              <p class="text-xs text-primary-600 font-medium capitalize">{{ auth.user?.role }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>