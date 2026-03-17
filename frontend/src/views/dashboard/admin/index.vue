<script setup>
import { ref, onMounted } from 'vue'
import { Users, Calendar, FileText, Clock } from 'lucide-vue-next'
import Layout from "../../../components/Layout.vue";
import axios from 'axios';

const statsData = ref({
  total_santri: '0',
  hadir_hari_ini: '0',
  jurnal_hari_ini: '0'
})
const recentActivities = ref([])
const isLoading = ref(true)

const fetchDashboardData = async () => {
  try {
    const res = await axios.get('http://localhost/SantriConnect/backend/app/admin/get_dashboard_stats.php')
    if (res.data.status === 'success') {
      statsData.value = res.data.stats
      recentActivities.value = res.data.activities
    }
  } catch (error) {
    console.error("Gagal memuat data dashboard")
  } finally {
    isLoading.value = false
  }
}

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

onMounted(fetchDashboardData)
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Santri</p>
            <p class="text-2xl font-bold text-gray-900">{{ statsData.total_santri }}</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <Calendar class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Hadir Hari Ini</p>
            <p class="text-2xl font-bold text-gray-900">{{ statsData.hadir_hari_ini }}</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <FileText class="w-6 h-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Jurnal Masuk</p>
            <p class="text-2xl font-bold text-gray-900">{{ statsData.jurnal_hari_ini }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900">Aktivitas Guru Terbaru</h3>
          <span class="text-xs text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full uppercase">Real-time</span>
        </div>
        <div class="p-6">
          <div v-if="recentActivities.length === 0" class="text-center py-10 text-gray-400 italic text-sm">
            Belum ada aktivitas jurnal tercatat.
          </div>
          <div class="space-y-6">
            <div v-for="(act, index) in recentActivities" :key="index" class="flex items-start gap-4 relative">
              <div v-if="index !== recentActivities.length - 1" class="absolute left-5 top-10 w-0.5 h-10 bg-gray-50"></div>

              <div class="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 z-10">
                <span class="text-xs font-bold text-gray-600">{{ act.username.substring(0, 2).toUpperCase() }}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-bold text-gray-900">
                    {{ act.username }}
                    <span class="font-normal text-gray-500">mengisi jurnal</span>
                    Kelas {{ act.kelas }}
                  </p>
                  <span class="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <Clock class="w-3 h-3" /> {{ formatTime(act.created_at) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  Materi: {{ act.materi }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>