<script setup>
import { ref, onMounted, computed } from 'vue'
import Layout from "../../../components/Layout.vue"
import { Search, Filter, FileSpreadsheet, User } from 'lucide-vue-next'
import axios from 'axios'

const listRekap = ref([])
const searchQuery = ref('')
const filterKelas = ref('')
const loading = ref(false)

const fetchRekapAbsensi = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost/SantriConnect/backend/app/admin/get_rekap_absensi.php')
    listRekap.value = res.data.data
  } catch (error) {
    console.error("Gagal mengambil rekap")
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchRekapAbsensi())

const filteredData = computed(() => {
  return listRekap.value.filter(s => {
    return s.nama_santri.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterKelas.value ? s.kelas === filterKelas.value : true)
  })
})
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="text-2xl font-bold text-gray-900">Rekap Kehadiran Santri</h3>
          <p class="text-sm text-gray-500">Statistik kehadiran akumulatif seluruh santri</p>
        </div>
        <button class="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-sm">
          <FileSpreadsheet class="w-4 h-4" /> Export Laporan
        </button>
      </div>

      <div class="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center">
        <div class="relative flex-1 min-w-[250px]">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="searchQuery" type="text" placeholder="Cari nama santri..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select v-model="filterKelas" class="p-2 border border-gray-200 rounded-lg outline-none">
          <option value="">Semua Kelas</option>
          <option value="A">Kelas A</option>
          <option value="B">Kelas B</option>
        </select>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
          <tr>
            <th class="px-6 py-4">Santri</th>
            <th class="px-6 py-4 text-center">Kelas</th>
            <th class="px-6 py-4 text-center text-green-600">Hadir</th>
            <th class="px-6 py-4 text-center text-yellow-600">Izin</th>
            <th class="px-6 py-4 text-center text-blue-600">Sakit</th>
            <th class="px-6 py-4 text-center text-red-600">Alpha</th>
            <th class="px-6 py-4 text-center">Persentase</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
          <tr v-for="s in filteredData" :key="s.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User class="w-4 h-4 text-gray-400" />
                </div>
                <span class="font-semibold text-gray-800">{{ s.nama_santri }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-center text-gray-600">{{ s.kelas }}</td>
            <td class="px-6 py-4 text-center font-bold">{{ s.total_hadir }}</td>
            <td class="px-6 py-4 text-center font-bold">{{ s.total_izin }}</td>
            <td class="px-6 py-4 text-center font-bold">{{ s.total_sakit }}</td>
            <td class="px-6 py-4 text-center font-bold text-red-600">{{ s.total_alpha }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 justify-center">
                <div class="w-16 bg-gray-200 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full" :style="{ width: s.persentase + '%' }"></div>
                </div>
                <span class="text-xs font-bold">{{ s.persentase }}%</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>