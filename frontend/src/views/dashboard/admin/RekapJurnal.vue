<script setup>
import { ref, onMounted, computed } from 'vue'
import Layout from "../../../components/Layout.vue"
import {
  Search,
  Calendar,
  UserCheck,
  AlertCircle,
  Download,
  Filter,
  FileSpreadsheet, AlertTriangle, CheckCircle, Users, XCircle
} from 'lucide-vue-next'
import axios from 'axios'

const listJurnal = ref([])
const searchQuery = ref('')
const filterKelas = ref('')
const isLoading = ref(false)

const stats = ref({
  total_pertemuan: 0,
  rata_kehadiran: '0%',
  total_izin_sakit: 0,
  total_alpha: 0
})

const fetchAllJurnal = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('http://localhost/SantriConnect/backend/app/admin/get_all_jurnal.php')
    listJurnal.value = res.data.data
    if (res.data.stats) {
      stats.value = res.data.stats
    }
  } catch (error) {
    console.error("Gagal mengambil data jurnal")
  } finally {
    isLoading.value = false
  }
}

// Fungsi Export CSV yang Rapi
const exportJurnal = () => {
  if (filteredJurnal.value.length === 0) return alert("Tidak ada data untuk diexport");

  const headers = ['Tanggal', 'Guru', 'Mata Pelajaran', 'Kelas', 'Materi', 'Hadir', 'Izin/Sakit', 'Alpha'];
  const rows = filteredJurnal.value.map(j => [
    j.tanggal,
    j.nama_guru,
    j.nama_mapel,
    j.kelas,
    `"${j.materi.replace(/"/g, '""')}"`, // Bungkus materi dengan kutip agar koma tidak merusak kolom
    j.hadir,
    parseInt(j.izin) + parseInt(j.sakit),
    j.alpha
  ]);

  const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Jurnal_KBM_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(() => {
  fetchAllJurnal()
})

const filteredJurnal = computed(() => {
  return listJurnal.value.filter(item => {
    const materi = item.materi ? item.materi.toLowerCase() : '';
    const guru = item.nama_guru ? item.nama_guru.toLowerCase() : '';
    const query = searchQuery.value.toLowerCase();

    const matchSearch = materi.includes(query) || guru.includes(query);
    const matchKelas = filterKelas.value ? item.kelas === filterKelas.value : true;

    return matchSearch && matchKelas;
  });
});
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="text-2xl font-bold text-gray-900">Rekapitulasi Jurnal & Absensi</h3>
          <p class="text-sm text-gray-500">Monitoring aktivitas KBM dan kehadiran santri seluruh kelas</p>
        </div>
        <button
            @click="exportJurnal"
            class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-100 font-bold text-sm"
        >
          <FileSpreadsheet class="w-4 h-4" /> Export Excel (.csv)
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Calendar class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Tatap Muka</p><p class="text-lg font-bold">{{ stats.total_pertemuan }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Hadir</p><p class="text-lg font-bold">{{ stats.rata_kehadiran }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center"><AlertTriangle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Izin/Sakit</p><p class="text-lg font-bold">{{ stats.total_izin_sakit }}</p></div>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div class="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><XCircle class="w-5 h-5"/></div>
          <div><p class="text-xs text-gray-500">Total Alpha</p><p class="text-lg font-bold">{{ stats.total_alpha }}</p></div>
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
            <select v-model="filterKelas" class="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 bg-white">
              <option value="">Semua Kelas</option>
              <option value="A">Kelas A</option>
              <option value="B">Kelas B</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 text-gray-600 text-[10px] uppercase tracking-widest font-black">
            <tr>
              <th class="px-6 py-4">Tanggal</th>
              <th class="px-6 py-4">Guru / Mapel</th>
              <th class="px-6 py-4">Materi KBM</th>
              <th class="px-6 py-4 text-center">Statistik Kehadiran</th>
              <th class="px-6 py-4 text-right">Opsi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            <tr v-for="jurnal in filteredJurnal" :key="jurnal.id" class="hover:bg-blue-50/30 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600 whitespace-nowrap font-mono">
                {{ jurnal.tanggal }}
              </td>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900 uppercase text-xs">{{ jurnal.nama_guru }}</div>
                <div class="text-[10px] font-bold text-primary-600 tracking-tighter">{{ jurnal.nama_mapel }} • KELAS {{ jurnal.kelas }}</div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600 line-clamp-1 italic">"{{ jurnal.materi }}"</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-1.5">
                  <div class="flex flex-col items-center px-2 py-1 bg-green-50 rounded-lg border border-green-100 min-w-[40px]">
                    <span class="text-[8px] text-green-600 font-bold uppercase">Hadir</span>
                    <span class="text-xs font-bold text-green-700">{{ jurnal.hadir }}</span>
                  </div>
                  <div class="flex flex-col items-center px-2 py-1 bg-orange-50 rounded-lg border border-orange-100 min-w-[40px]">
                    <span class="text-[8px] text-orange-600 font-bold uppercase">I/S</span>
                    <span class="text-xs font-bold text-orange-700">{{ parseInt(jurnal.izin) + parseInt(jurnal.sakit) }}</span>
                  </div>
                  <div class="flex flex-col items-center px-2 py-1 bg-red-50 rounded-lg border border-red-100 min-w-[40px]">
                    <span class="text-[8px] text-red-600 font-bold uppercase">Alpha</span>
                    <span class="text-xs font-bold text-red-700">{{ jurnal.alpha }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-primary-600 hover:text-primary-800 text-xs font-black uppercase tracking-tighter bg-primary-50 px-3 py-1.5 rounded-lg transition-all">Detail</button>
              </td>
            </tr>
            <tr v-if="filteredJurnal.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-400 italic text-sm">
                Data jurnal tidak ditemukan...
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>