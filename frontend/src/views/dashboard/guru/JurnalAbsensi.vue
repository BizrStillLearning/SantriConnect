<script setup>
import { reactive, ref, onMounted } from 'vue';
import Layout from "../../../components/Layout.vue";
import { useGuruStore } from "../../../stores/GuruStore.js";
import { BookOpen, Users, ClipboardCheck, Save } from 'lucide-vue-next';

const guruStore = useGuruStore();

// Form Utama Jurnal
const form = reactive({
  tanggal: new Date().toISOString().substr(0, 10),
  mapel_id: '',
  kelas: '',
  materi: '',
  keterangan: '',
  guru_id: 1 // Sesuai ID Guru yang login (sementara hardcode)
});

// Data Dummy Mapel (Nanti bisa fetch dari backend)
const listMapel = ref([
  { id: 1, nama: 'Fiqih' },
  { id: 2, nama: 'Nahwu' },
  { id: 3, nama: 'Tahfidz' }
]);

const showAbsensi = ref(false);

const handleTampilkanAbsensi = async () => {
  if (!form.kelas) {
    alert("Silakan pilih kelas terlebih dahulu");
    return;
  }
  await guruStore.fetchSantriByKelas(form.kelas);
  showAbsensi.value = true;
};

const handleSimpanSemua = async () => {
  if (!form.mapel_id) {
    alert("Silakan pilih Mata Pelajaran terlebih dahulu");
    return;
  }
  if (!form.materi) {
    alert("Materi pembelajaran harus diisi");
    return;
  }
  if (guruStore.listSantri.length === 0) {
    alert("Daftar absensi kosong. Klik 'Tampilkan' terlebih dahulu");
    return;
  }

  const payload = {
    tanggal: form.tanggal,
    mapel_id: parseInt(form.mapel_id),
    kelas: form.kelas,
    materi: form.materi,
    keterangan: form.keterangan || '-',
    guru_id: parseInt(form.guru_id),
    absensi: guruStore.listSantri.map(s => ({
      santri_id: s.santri_id,
      status: s.status
    }))
  };

  const success = await guruStore.simpanJurnalDanAbsensi(payload);
  if (success) {
    alert("Jurnal dan Absensi berhasil disimpan!");
    // Reset form atau redirect
    showAbsensi.value = false;
    form.materi = '';
    form.keterangan = '';
  }
};
</script>

<template>
  <Layout>
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary-600 rounded-lg text-white">
          <BookOpen class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900">Input Jurnal & Absensi</h3>
          <p class="text-sm text-gray-500">Catat aktivitas belajar mengajar harian</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Tanggal</label>
            <input v-model="form.tanggal" type="date" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Mata Pelajaran</label>
            <select v-model="form.mapel_id" class="w-full px-4 py-2 border rounded-lg outline-none">
              <option value="">Pilih Mapel</option>
              <option v-for="m in listMapel" :key="m.id" :value="m.id">{{ m.nama }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Kelas</label>
            <div class="flex gap-2">
              <select v-model="form.kelas" class="w-full px-4 py-2 border rounded-lg outline-none">
                <option value="">Pilih Kelas</option>
                <option value="A">Kelas A</option>
                <option value="B">Kelas B</option>
              </select>
              <button @click="handleTampilkanAbsensi" class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors flex items-center gap-2">
                <Users class="w-4 h-4" /> Tampilkan
              </button>
            </div>
          </div>
          <div class="md:col-span-2 space-y-2">
            <label class="text-sm font-semibold text-gray-700">Materi Pembelajaran</label>
            <input v-model="form.materi" type="text" placeholder="Contoh: Bab Thoharoh - Wudhu" class="w-full px-4 py-2 border rounded-lg outline-none" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700">Keterangan (Opsional)</label>
            <input v-model="form.keterangan" type="text" placeholder="Catatan tambahan..." class="w-full px-4 py-2 border rounded-lg outline-none" />
          </div>
        </div>
      </div>

      <div v-if="showAbsensi" class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h4 class="font-bold text-gray-800 flex items-center gap-2">
            <ClipboardCheck class="w-5 h-5 text-green-600" /> Presensi Santri Kelas {{ form.kelas }}
          </h4>
          <span class="text-xs font-medium px-2 py-1 bg-white border rounded text-gray-500">Total: {{ guruStore.listSantri.length }} Santri</span>
        </div>

        <table class="w-full text-left">
          <thead class="bg-gray-50 text-xs uppercase font-bold text-gray-500">
          <tr>
            <th class="px-6 py-3">No</th>
            <th class="px-6 py-3">Nama Santri</th>
            <th class="px-6 py-3 text-center">Status Kehadiran</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
          <tr v-for="(s, index) in guruStore.listSantri" :key="s.santri_id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-500">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ s.nama_santri }}</td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-4">
                <label v-for="status in ['hadir', 'izin', 'sakit', 'alpha']" :key="status" class="flex items-center gap-1 cursor-pointer group">
                  <input type="radio" :name="'status-' + s.santri_id" :value="status" v-model="s.status" class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500">
                  <span class="text-xs capitalize font-medium text-gray-600 group-hover:text-primary-600">{{ status }}</span>
                </label>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="p-6 bg-gray-50 border-t border-gray-200">
          <button @click="handleSimpanSemua" :disabled="guruStore.isLoading" class="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100">
            <Save v-if="!guruStore.isLoading" class="w-5 h-5" />
            <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Simpan Jurnal & Absensi
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
/* Transisi halus */
.animate-in {
  animation-duration: 0.3s;
}
</style>