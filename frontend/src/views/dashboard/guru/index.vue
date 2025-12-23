<script setup>
import { Users, Calendar, FileText } from 'lucide-vue-next'
import Layout from "../../../components/Layout.vue";
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="stat in [
        { label: 'Total Santri', value: '1,240', icon: Users, color: 'blue' },
        { label: 'Hadir Hari Ini', value: '1,185', icon: Calendar, color: 'green' },
        { label: 'Jurnal Guru', value: '45', icon: FileText, color: 'purple' }
      ]" :key="stat.label" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div :class="`w-12 h-12 bg-${stat.color}-100 text-${stat.color}-600`" class="rounded-lg flex items-center justify-center">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span class="text-xs font-bold text-gray-600">US</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">Ustadz Ahmad mengisi Jurnal Kelas 7A</p>
              <p class="text-xs text-gray-500 mt-1">2 menit yang lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>