<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from "./Sidebar.vue"
import Header from './Header.vue'

const route = useRoute()
const isCollapsed = ref(false)
const isMobileOpen = ref(false)

// Tutup sidebar mobile otomatis saat pindah halaman
watch(() => route.path, () => {
  isMobileOpen.ref = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar
        :is-collapsed="isCollapsed"
        :is-open="isMobileOpen"
        @toggle="isCollapsed = !isCollapsed"
        @close="isMobileOpen = false"
        @logout="$emit('logout')"
    />

    <main
        class="flex-1 transition-all duration-300 flex flex-col min-h-screen w-full"
        :class="[
          // Di desktop (lg), margin mengikuti lebar sidebar
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64',
          // Di mobile, konten selalu full width
          'ml-0'
        ]"
    >
      <Header @open-menu="isMobileOpen = true" />

      <div class="p-4 lg:p-6 flex-1 w-full overflow-x-hidden">
        <slot />
      </div>

      <footer class="p-4 text-center text-xs lg:text-sm text-gray-500 border-t border-t-gray-300 shadow-md bg-white">
        &copy; 2025 SantriConnect. All rights reserved.
      </footer>
    </main>
  </div>
</template>