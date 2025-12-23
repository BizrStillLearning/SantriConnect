<script setup>
import { onMounted, computed } from 'vue'
import { UserPlus, Download, Filter, Eye, CheckCircle2, Clock } from 'lucide-vue-next'
import Layout from "../../../components/Layout.vue"
import { useFormStore } from "../../../stores/FormStore.js"
import { useRouter } from "vue-router"

const formStore = useFormStore()
const router = useRouter()

onMounted(async () => {
  await formStore.fetchPendingList()
})

const stats = computed(() => [
  { label: 'Total Pendaftar', val: formStore.pendaftarList.length, col: 'text-blue-600' },
  { label: 'Verified', val: '0', col: 'text-green-600' }, // Ini akan diupdate setelah fitur verifikasi jalan
  { label: 'Pending', val: formStore.pendaftarList.length, col: 'text-yellow-600' },
  { label: 'Gagal', val: '0', col: 'text-red-600' }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleVerify = async (id) => {
  if (confirm("Verifikasi santri ini? Data akan dipindahkan ke database santri aktif.")) {
    const success = await formStore.verifyPendaftar(id);
    if (success) {
      alert("Berhasil! Santri kini sudah bisa login menggunakan akunnya.");
    }
  }
}

</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="text-xl font-bold text-gray-900">Rekap Pendaftar Santri Baru</h3>
          <p class="text-sm text-gray-500">Manajemen verifikasi calon santri tahun ajaran 2025/2026</p>
        </div>
        <div class="flex gap-2">
          <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
            <Download class="w-4 h-4" /> Export Excel
          </button>
          <button @click="router.push('/form')" class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <UserPlus class="w-4 h-4" /> Tambah Pendaftar
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in stats" :key="stat.label" class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">{{ stat.label }}</p>
          <p :class="['text-2xl font-black', stat.col]">{{ stat.val }}</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h4 class="font-bold text-gray-800">Daftar Calon Santri Pending</h4>
          <button class="text-gray-400 hover:text-primary-600"><Filter class="w-5 h-5" /></button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50/80">
            <tr>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">No. Reg</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Orang Tua</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Tgl Daftar</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">
            <tr v-if="formStore.isLoading">
              <td colspan="6" class="px-6 py-10 text-center">
                <div class="flex justify-center items-center gap-2 text-gray-500">
                  <div class="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  Memuat data...
                </div>
              </td>
            </tr>

            <tr v-else-if="formStore.pendaftarList.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-400 italic">
                Belum ada data pendaftar yang masuk.
              </td>
            </tr>

            <tr v-for="p in formStore.pendaftarList" :key="p.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-xs font-mono text-gray-400">#REG-{{ p.id.toString().padStart(4, '0') }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-900 capitalize">{{ p.nama_lengkap }}</span>
                  <span class="text-xs text-gray-500">{{ p.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col text-sm text-gray-600">
                  <span>{{ p.nama_orang_tua }}</span>
                  <span class="text-[10px] text-gray-400">{{ p.nomor_orang_tua }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-xs text-gray-600">
                {{ formatDate(p.tanggal_daftar) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 text-yellow-600 rounded-md border border-yellow-100 w-fit">
                  <Clock class="w-3 h-3" />
                  <span class="text-[10px] font-bold uppercase">Pending</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button class="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Detail">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                      @click="handleVerify(p.id)"
                      class="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-lg hover:bg-green-600 hover:text-white transition-all text-xs font-bold"
                  >
                    <CheckCircle2 class="w-3.5 h-3.5" /> Verifikasi
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 border-t border-gray-100 bg-gray-50/30">
          <p class="text-xs text-gray-500 font-medium">Menampilkan {{ formStore.pendaftarList.length }} data calon santri.</p>
        </div>
      </div>
    </div>
  </Layout>
</template>