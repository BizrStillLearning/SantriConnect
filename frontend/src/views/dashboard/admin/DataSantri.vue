<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search, Edit, Trash2, X, Save, Eye, User, MapPin, Phone, GraduationCap } from 'lucide-vue-next'
import Layout from "../../../components/Layout.vue"
import axios from 'axios'

const santriList = ref([])
const searchQuery = ref('')
const showEditModal = ref(false)
const showDetailModal = ref(false) // State untuk Modal Mata (Detail)
const selectedSantri = ref({})

// List Kelas Dinamis
const listKelas = computed(() => {
  const kelasUnik = [...new Set(santriList.value.map(s => s.kelas))]
  const defaultKelas = ['A', 'B']
  return [...new Set([...defaultKelas, ...kelasUnik])].filter(k => k !== 'Belum Diatur' && k !== null)
})

const fetchSantri = async () => {
  try {
    const res = await axios.get('http://localhost/SantriConnect/backend/app/santri/manage.php')
    santriList.value = res.data.data
  } catch (e) { console.error("Gagal ambil data", e) }
}

const openEdit = (item) => {
  selectedSantri.value = { ...item }
  showEditModal.value = true
}

const openDetail = (item) => {
  selectedSantri.value = { ...item }
  showDetailModal.value = true
}

const handleUpdate = async () => {
  try {
    // Mengirim objek lengkap (id, nis, nama_santri, nama_orang_tua, nomor_orang_tua, alamat, kelas)
    await axios.post('http://localhost/SantriConnect/backend/app/santri/manage.php', selectedSantri.value)
    alert("Semua perubahan berhasil disimpan!")
    showEditModal.value = false
    fetchSantri()
  } catch (e) { alert("Gagal update data") }
}

const confirmDelete = async (id) => {
  if (confirm("Hapus permanen data santri ini?")) {
    await axios.delete(`http://localhost/SantriConnect/backend/app/santri/manage.php?id=${id}`)
    fetchSantri()
  }
}

const filteredSantri = computed(() => {
  if (!santriList.value) return [];
  return santriList.value.filter(s => {
    const query = searchQuery.value.toLowerCase();
    const nama = s.nama_santri ? s.nama_santri.toLowerCase() : '';
    const nis = s.nis ? s.nis.toString() : '';
    return nama.includes(query) || nis.includes(query);
  });
})

onMounted(fetchSantri)
</script>

<template>
  <Layout>
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 class="text-2xl font-bold text-gray-900">Database Santri Aktif</h3>
          <p class="text-sm text-gray-500">Total: {{ santriList.length }} Santri terdaftar</p>
        </div>
        <div class="relative w-full md:w-72">
          <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input v-model="searchQuery" type="text" placeholder="Cari Nama atau NIS..." class="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
          <tr>
            <th class="px-6 py-4">NIS</th>
            <th class="px-6 py-4">Nama Santri</th>
            <th class="px-6 py-4 text-center">Kelas</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
          <tr v-for="s in filteredSantri" :key="s.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-mono text-gray-500">{{ s.nis }}</td>
            <td class="px-6 py-4 font-bold text-gray-900 uppercase">{{ s.nama_santri }}</td>
            <td class="px-6 py-4 text-center">
                <span :class="s.kelas === 'Belum Diatur' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'"
                      class="px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-current">
                  {{ s.kelas }}
                </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openDetail(s)" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Lihat Detail">
                <Eye class="w-4 h-4" />
              </button>
              <button @click="openEdit(s)" class="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100" title="Edit Semua Data">
                <Edit class="w-4 h-4" />
              </button>
              <button @click="confirmDelete(s.id)" class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showDetailModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div class="p-4 border-b flex justify-between items-center bg-primary-600 text-white">
          <h4 class="font-bold flex items-center gap-2"><Eye class="w-5 h-5"/> Detail Lengkap Santri</h4>
          <button @click="showDetailModal = false"><X class="w-5 h-5" /></button>
        </div>
        <div class="p-6 space-y-4 text-sm">
          <div class="grid grid-cols-3 border-b pb-2"><span class="text-gray-500">NIS</span><span class="col-span-2 font-mono font-bold">: {{ selectedSantri.nis }}</span></div>
          <div class="grid grid-cols-3 border-b pb-2"><span class="text-gray-500">Nama</span><span class="col-span-2 font-bold uppercase">: {{ selectedSantri.nama_santri }}</span></div>
          <div class="grid grid-cols-3 border-b pb-2"><span class="text-gray-500">Kelas</span><span class="col-span-2 font-bold">: {{ selectedSantri.kelas }}</span></div>
          <div class="grid grid-cols-3 border-b pb-2"><span class="text-gray-500">Wali</span><span class="col-span-2">: {{ selectedSantri.nama_orang_tua }}</span></div>
          <div class="grid grid-cols-3 border-b pb-2"><span class="text-gray-500">WhatsApp</span><span class="col-span-2">: {{ selectedSantri.nomor_orang_tua }}</span></div>
          <div class="grid grid-cols-3"><span class="text-gray-500">Alamat</span><span class="col-span-2">: {{ selectedSantri.alamat }}</span></div>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h4 class="font-bold">Formulir Edit Data Santri</h4>
          <button @click="showEditModal = false"><X class="w-5 h-5 text-gray-400" /></button>
        </div>

        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-500 uppercase">Nama Lengkap</label>
            <input v-model="selectedSantri.nama_santri" type="text" class="w-full border p-2 rounded-lg text-sm" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-500 uppercase">NIS (Nomor Induk)</label>
            <input v-model="selectedSantri.nis" type="text" class="w-full border p-2 rounded-lg text-sm bg-gray-50" readonly />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-500 uppercase">Nama Orang Tua / Wali</label>
            <input v-model="selectedSantri.nama_orang_tua" type="text" class="w-full border p-2 rounded-lg text-sm" />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-gray-500 uppercase">WhatsApp</label>
            <input v-model="selectedSantri.nomor_orang_tua" type="text" class="w-full border p-2 rounded-lg text-sm" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase">Kelas</label>
            <select v-model="selectedSantri.kelas" class="w-full border p-2 rounded-lg text-sm bg-white">
              <option value="Belum Diatur">-- Pilih Kelas --</option>
              <option v-for="k in listKelas" :key="k" :value="k">Kelas {{ k }}</option>
            </select>
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase">Alamat Lengkap</label>
            <textarea v-model="selectedSantri.alamat" class="w-full border p-2 rounded-lg text-sm" rows="3"></textarea>
          </div>
        </div>

        <div class="p-4 border-t bg-gray-50 flex gap-2">
          <button @click="showEditModal = false" class="flex-1 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Batal</button>
          <button @click="handleUpdate" class="flex-1 py-2 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700">
            <Save class="w-4 h-4" /> Simpan Permanen
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>