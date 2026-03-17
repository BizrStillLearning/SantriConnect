<script setup>
import { ref, onMounted, computed } from 'vue'
import Layout from "../../../components/Layout.vue"
import { Search, Filter, FileSpreadsheet, User, Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-vue-next'
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

// Fungsi Export CSV (Bisa dibuka di Excel)
const exportToExcel = () => {
  if (listRekap.value.length === 0) return;

  const headers = ['Nama Santri', 'Kelas', 'Hadir', 'Izin', 'Sakit', 'Alpha', 'Persentase'];
  const rows = filteredData.value.map(s => [
    s.nama_santri,
    s.kelas,
    s.total_hadir,
    s.total_izin,
    s.total_sakit,
    s.total_alpha,
    s.persentase + '%'
  ]);

  let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Absensi_${new Date().toLocaleDateString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Statistik Akumulatif untuk Stats Cards
const globalStats = computed(() => {
  const stats = { hadir: 0, izin: 0, sakit: 0, alpha: 0 };
  listRekap.value.forEach(s => {
    stats.hadir += parseInt(s.total_hadir || 0);
    stats.izin += parseInt(s.total_izin || 0);
    stats.sakit += parseInt(s.total_sakit || 0);
    stats.alpha += parseInt(s.total_alpha || 0);
  });
  return stats;
});

onMounted(() => fetchRekapAbsensi())

const filteredData = computed(() => {
  return listRekap.value.filter(s => {
    const nama = s.nama_santri ? s.nama_santri.toLowerCase() : '';
    return nama.includes(searchQuery.value.toLowerCase()) &&
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
          <p class="text-sm text-gray-500">Monitoring absensi jangka panjang per santri</p>
        </div>
        <button
            @click="exportToExcel"
            class="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
        >
          <FileSpreadsheet class="w-4 h-4" /> Export Laporan (.csv)
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Santri</p><p class="text-lg font-bold">{{ listRekap.length }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Hadir</p><p class="text-lg font-bold">{{ globalStats.hadir }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center"><AlertTriangle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Izin/Sakit</p><p class="text-lg font-bold">{{ globalStats.izin + globalStats.sakit }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><XCircle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Alpha</p><p class="text-lg font-bold">{{ globalStats.alpha }}</p></div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center">
        <div class="relative flex-1 min-w-[250px]">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="searchQuery" type="text" placeholder="Cari nama santri..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <select v-model="filterKelas" class="p-2 border border-gray-200 rounded-lg outline-none bg-white">
          <option value="">Semua Kelas</option>
          <option value="A">Kelas A</option>
          <option value="B">Kelas B</option>
        </select>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-600 text-[10px] uppercase font-bold tracking-wider">
          <tr>
            <th class="px-6 py-4">Santri</th>
            <th class="px-6 py-4 text-center">Kelas</th>
            <th class="px-6 py-4 text-center text-green-600">Hadir</th>
            <th class="px-6 py-4 text-center text-yellow-600">Izin</th>
            <th class="px-6 py-4 text-center text-blue-600">Sakit</th>
            <th class="px-6 py-4 text-center text-red-600">Alpha</th>
            <th class="px-6 py-4 text-center">Persentase Kehadiran</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
          <tr v-for="s in filteredData" :key="s.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-semibold text-gray-800">{{ s.nama_santri }}</td>
            <td class="px-6 py-4 text-center"><span class="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{{ s.kelas }}</span></td>
            <td class="px-6 py-4 text-center font-bold text-gray-700">{{ s.total_hadir }}</td>
            <td class="px-6 py-4 text-center font-bold text-gray-700">{{ s.total_izin }}</td>
            <td class="px-6 py-4 text-center font-bold text-gray-700">{{ s.total_sakit }}</td>
            <td class="px-6 py-4 text-center font-bold text-red-600">{{ s.total_alpha }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3 justify-center">
                <div class="w-24 bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                  <div
                      class="h-full transition-all duration-500"
                      :class="s.persentase > 80 ? 'bg-green-500' : s.persentase > 50 ? 'bg-yellow-500' : 'bg-red-500'"
                      :style="{ width: s.persentase + '%' }"
                  ></div>
                </div>
                <span class="text-xs font-black w-8">{{ s.persentase }}%</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>