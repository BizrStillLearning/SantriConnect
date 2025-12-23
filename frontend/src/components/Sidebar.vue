<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronLeft, X, LogOut
} from 'lucide-vue-next'
import { menuAside } from "../menuAside.js"
import { useAuthStore } from "../stores/AuthStore.js"

const auth = useAuthStore()
const route = useRoute()

const props = defineProps({
  isCollapsed: Boolean,
  isOpen: Boolean
})

const emit = defineEmits(['toggle', 'logout', 'close'])

const filteredMenu = computed(() => {
  return menuAside.filter(item => {
    if (!auth.user?.role) return false
    return item.roles.includes(auth.user.role)
  })
})

const handleLogout = () => {
  if (confirm("Apakah anda yakin ingin keluar?")) {
    auth.logout()
  }
}

const isActive = (path) => route.path === path
</script>

<template>
  <transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-if="isOpen"
        @click="emit('close')"
        class="fixed inset-0 bg-gray-900/60 z-40 lg:hidden"
    ></div>
  </transition>

  <aside
      class="bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out flex flex-col"
      :class="[
        isCollapsed ? 'w-20' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
  >
    <div class="h-16 flex items-center border-b border-gray-100 relative px-4 flex-shrink-0">
      <div class="flex items-center gap-2 font-bold text-primary-700 overflow-hidden w-full" :class="{ 'justify-center': isCollapsed }">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <span v-if="!isCollapsed" class="text-lg truncate tracking-tight">SantriConnect</span>
      </div>

      <button
          @click="emit('toggle')"
          class="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:text-primary-600 shadow-sm z-50 hover:scale-110 transition-transform"
      >
        <ChevronLeft class="w-3 h-3 transition-transform duration-300" :class="{ 'rotate-180': isCollapsed }" />
      </button>

      <button @click="emit('close')" class="lg:hidden p-1 text-gray-400 hover:text-gray-600">
        <X class="w-6 h-6" />
      </button>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
      <router-link
          v-for="item in filteredMenu"
          :key="item.label"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative mb-1"
          :class="[
            isActive(item.to)
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-500 hover:bg-primary-50 hover:text-primary-600'
          ]"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-semibold text-sm whitespace-nowrap">{{ item.label }}</span>

        <div v-if="isCollapsed" class="hidden lg:block absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl">
          {{ item.label }}
          <div class="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </router-link>
    </nav>

    <div class="p-3 border-t border-gray-100 flex-shrink-0">
      <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold text-sm group">
        <LogOut class="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
        <span v-if="!isCollapsed">Keluar</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #e5e7eb;
}
</style>