<script setup>
import { ref, onMounted, computed } from 'vue'
import Layout from "../../../components/Layout.vue"
import {
  Search,
  Calendar,
  UserCheck,
  AlertCircle,
  Download,
  Filter
} from 'lucide-vue-next'
import axios from 'axios'

const listJurnal = ref([])
const searchQuery = ref('')
const filterKelas = ref('')
const isLoading = ref(false)

// Fetch data jurnal untuk admin
const fetchAllJurnal = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('http://localhost/SantriConnect/backend/app/admin/get_all_jurnal.php')
    listJurnal.value = res.data.data
  } catch (error) {
    console.error("Gagal mengambil data jurnal")
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAllJurnal()
})

// Logika Search & Filter
const filteredJurnal = computed(() => {
  return listJurnal.value.filter(item => {
    const matchSearch = item.materi.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.nama_guru.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchKelas = filterKelas.value ? item.kelas === filterKelas.value : true
    return matchSearch && matchKelas
  })
})
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="text-2xl font-bold text-gray-900">Rekapitulasi Jurnal & Absensi</h3>
          <p class="text-gray-500">Monitoring aktivitas KBM dan kehadiran santri seluruh kelas</p>
        </div>
        <button class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
          <Download class="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar class="w-5 h-5" /></div>
            <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p class="text-gray-500 text-sm font-medium">Total Tatap Muka</p>
          <p class="text-2xl font-bold text-gray-900">148</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="p-2 bg-green-50 text-green-600 rounded-lg"><UserCheck class="w-5 h-5" /></div>
          </div>
          <p class="text-gray-500 text-sm font-medium">Rata-rata Kehadiran</p>
          <p class="text-2xl font-bold text-gray-900">94.2%</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertCircle class="w-5 h-5" /></div>
          </div>
          <p class="text-gray-500 text-sm font-medium">Santri Izin/Sakit</p>
          <p class="text-2xl font-bold text-gray-900">12</p>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="p-2 bg-red-50 text-red-600 rounded-lg"><AlertCircle class="w-5 h-5" /></div>
          </div>
          <p class="text-gray-500 text-sm font-medium">Santri Alpha</p>
          <p class="text-2xl font-bold text-gray-900">3</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4">
          <div class="relative flex-1">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari Guru atau Materi..."
                class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="filterKelas" class="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Semua Kelas</option>
              <option value="A">Kelas A</option>
              <option value="B">Kelas B</option>
            </select>
            <button class="p-2 border border-gray-200 rounded-xl hover:bg-white transition-colors">
              <Filter class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-bold">Tanggal</th>
              <th class="px-6 py-4 font-bold">Guru</th>
              <th class="px-6 py-4 font-bold">Mapel / Kelas</th>
              <th class="px-6 py-4 font-bold">Materi</th>
              <th class="px-6 py-4 font-bold">Kehadiran</th>
              <th class="px-6 py-4 font-bold">Aksi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            <tr v-for="jurnal in filteredJurnal" :key="jurnal.id" class="hover:bg-blue-50/30 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                {{ jurnal.tanggal }}
              </td>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900">{{ jurnal.nama_guru }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ jurnal.nama_mapel }}</div>
                <div class="text-xs text-gray-500">Kelas {{ jurnal.kelas }}</div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600 line-clamp-1">{{ jurnal.materi }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-green-600">{{ jurnal.hadir }}H</span>
                  <span class="text-xs font-bold text-orange-500">{{ jurnal.izin + jurnal.sakit }}I</span>
                  <span class="text-xs font-bold text-red-500">{{ jurnal.alpha }}A</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <button class="text-primary-600 hover:text-primary-800 text-sm font-bold">Detail</button>
              </td>
            </tr>
            <tr v-if="filteredJurnal.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500 italic">
                Tidak ada data ditemukan...
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>