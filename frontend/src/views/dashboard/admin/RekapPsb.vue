<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  UserPlus, Download, Filter, Eye, CheckCircle2,
  Clock, XCircle, FileText, CreditCard, X
} from 'lucide-vue-next'
import Layout from "../../../components/Layout.vue"
import { useFormStore } from "../../../stores/FormStore.js"
import { useRouter } from "vue-router"

const formStore = useFormStore()
const router = useRouter()

// State untuk Modal Detail
const showModal = ref(false)
const selectedPendaftar = ref(null)

onMounted(async () => {
  await formStore.fetchPendingList()
})

const stats = computed(() => [
  { label: 'Total Pendaftar', val: formStore.pendaftarList.length, col: 'text-blue-600' },
  { label: 'Pending', val: formStore.pendaftarList.length, col: 'text-yellow-600' },
  { label: 'Verified', val: '0', col: 'text-green-600' },
  { label: 'Rejected', val: '0', col: 'text-red-600' }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

const openDetail = (pendaftar) => {
  selectedPendaftar.value = pendaftar
  showModal.ref = true
  // Catatan: Pastikan URL gambar di pendaftar list sudah lengkap dari backend
}

const handleVerify = async (id) => {
  if (confirm("Verifikasi santri ini? Data akan dipindahkan ke database santri aktif dan NIS akan diterbitkan.")) {
    const success = await formStore.verifyPendaftar(id);
    if (success) {
      alert("Berhasil! Santri telah diverifikasi dan notifikasi WA telah terkirim.");
      showModal.value = false
    }
  }
}

const handleReject = async (id) => {
  const alasan = prompt("Masukkan alasan penolakan (akan dikirim ke pendaftar via WhatsApp):");
  if (alasan) {
    if (confirm("Tolak pendaftaran ini? Data pendaftar akan dihapus permanen setelah notifikasi dikirim.")) {
      // Kita asumsikan ada action rejectPendaftar di formStore
      try {
        const response = await fetch(`http://localhost/SantriConnect/backend/app/psb/tolak.php`, {
          method: 'POST',
          body: JSON.stringify({ id, alasan })
        });
        const res = await response.json();
        if (res.status === 'success') {
          alert("Pendaftaran ditolak dan data telah dihapus.");
          await formStore.fetchPendingList(); // Refresh list
          showModal.value = false;
        }
      } catch (e) {
        alert("Gagal menolak pendaftaran");
      }
    }
  }
}
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 class="text-xl font-bold text-gray-900">Manajemen Pendaftaran</h3>
          <p class="text-sm text-gray-500">Verifikasi berkas dan pembayaran calon santri</p>
        </div>
        <div class="flex gap-2">
          <button @click="router.push('/form')" class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 shadow-sm">
            <UserPlus class="w-4 h-4" /> Tambah Manual
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
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Nama Lengkap</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Berkas</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
            <tr v-for="p in formStore.pendaftarList" :key="p.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-900 capitalize">{{ p.nama_lengkap }}</span>
                  <span class="text-xs text-gray-500">WA: {{ p.nomor_orang_tua }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <span v-if="p.file_kk" class="p-1 bg-blue-50 text-blue-600 rounded" title="KK Tersedia"><FileText class="w-4 h-4" /></span>
                  <span v-if="p.file_bukti_bayar" class="p-1 bg-green-50 text-green-600 rounded" title="Bukti Bayar Tersedia"><CreditCard class="w-4 h-4" /></span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button @click="selectedPendaftar = p; showModal = true" class="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-bold">
                    <Eye class="w-3.5 h-3.5" /> Lihat Detail
                  </button>
                  <button @click="handleVerify(p.id)" class="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-bold">
                    <CheckCircle2 class="w-3.5 h-3.5" /> Verifikasi
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div class="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 class="font-bold text-gray-800">Review Pendaftar: {{ selectedPendaftar.nama_lengkap }}</h3>
          <button @click="showModal = false" class="p-1 hover:bg-gray-200 rounded-full transition-colors"><X class="w-5 h-5" /></button>
        </div>

        <div class="p-6 overflow-y-auto flex-1 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <p class="text-sm font-bold text-gray-600 flex items-center gap-2"><FileText class="w-4 h-4" /> Kartu Keluarga</p>
              <div class="border rounded-xl bg-gray-100 min-h-[200px] flex items-center justify-center overflow-hidden">
                <img v-if="selectedPendaftar.url_kk" :src="selectedPendaftar.url_kk" class="max-w-full hover:scale-110 transition-transform cursor-zoom-in" />
                <span v-else class="text-gray-400 italic text-xs">Berkas tidak diunggah</span>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm font-bold text-gray-600 flex items-center gap-2"><CreditCard class="w-4 h-4" /> Bukti Pembayaran</p>
              <div class="border rounded-xl bg-gray-100 min-h-[200px] flex items-center justify-center overflow-hidden">
                <img v-if="selectedPendaftar.url_bukti" :src="selectedPendaftar.url_bukti" class="max-w-full hover:scale-110 transition-transform cursor-zoom-in" />
                <span v-else class="text-gray-400 italic text-xs">Bukti transfer tidak diunggah</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-700">
            <p>Pastikan data di KK sesuai dengan nama yang diinput, dan nominal pada struk transfer adalah <strong>Rp 50.000</strong>.</p>
          </div>
        </div>

        <div class="p-4 border-t bg-gray-50 flex justify-between gap-3">
          <button @click="handleReject(selectedPendaftar.id)" class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold text-sm">
            <XCircle class="w-4 h-4" /> Tolak Pendaftaran
          </button>
          <div class="flex gap-3">
            <button @click="showModal = false" class="px-4 py-2 text-gray-500 font-bold">Batal</button>
            <button @click="handleVerify(selectedPendaftar.id)" class="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-lg">
              <CheckCircle2 class="w-4 h-4" /> Verifikasi & Terbitkan NIS
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>