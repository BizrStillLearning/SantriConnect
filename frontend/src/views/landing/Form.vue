<script setup>
import { ref, reactive, computed } from 'vue'
import {
  User, MapPin, Phone, Mail, Lock, CheckCircle,
  ChevronRight, ChevronLeft, Send, Users as UsersIcon,
  Camera, CreditCard, Info
} from 'lucide-vue-next'
import Navbar from "../../components/Navbar.vue";
import { useFormStore } from "../../stores/FormStore.js";
import { useRouter } from 'vue-router';

const formStore = useFormStore();
const router = useRouter();

const currentStep = ref(1)
const steps = [
  { id: 1, title: 'Biodata', desc: 'Nama & Alamat' },
  { id: 2, title: 'Wali', desc: 'Orang Tua' },
  { id: 3, title: 'Akun', desc: 'Email & Password' },
  { id: 4, title: 'Berkas', desc: 'Upload Dokumen' },
  { id: 5, title: 'Final', desc: 'Konfirmasi' }
]

const formData = reactive({
  nama_lengkap: '',
  alamat: '',
  nama_orang_tua: '',
  nomor_orang_tua: '',
  username: '',
  email: '',
  password: '',
  file_kk: null,
  file_bukti_bayar: null
})

const handleFileUpload = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    formData[field] = file;
  }
};

const nextStep = () => {
  if (currentStep.value < 5) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const handleSubmit = async () => {
  console.log("Data siap kirim:", formData);

  const success = await formStore.submitPendaftaran(formData);

  if (success) {
    alert("Pendaftaran berhasil terkirim!");
    router.push('/success-page');
  } else {
    alert(formStore.errorMessage || "Gagal mengirim data");
  }
}

const progressWidth = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100 + '%'
})
</script>

<template>
  <Navbar />
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-40">
    <div class="max-w-3xl mx-auto">

      <div class="relative mb-12 px-4">
        <div class="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
          <div class="h-full bg-primary-600 transition-all duration-500" :style="{ width: progressWidth }"></div>
        </div>

        <div class="relative flex justify-between">
          <div v-for="step in steps" :key="step.id" class="flex flex-col items-center">
            <div
                class="w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 border-4"
                :class="[
                currentStep >= step.id
                ? 'bg-primary-600 border-primary-100 text-white'
                : 'bg-white border-gray-100 text-gray-400'
              ]"
            >
              <CheckCircle v-if="currentStep > step.id" class="w-6 h-6" />
              <span v-else class="font-bold text-sm">{{ step.id }}</span>
            </div>
            <div class="mt-2 text-center">
              <p class="text-[10px] font-bold text-gray-900 hidden sm:block uppercase tracking-wider">{{ step.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-xl shadow-primary-900/5 overflow-hidden border border-gray-100">
        <div class="p-8">

          <div v-if="currentStep === 1" class="space-y-6">
            <div class="border-b border-gray-100 pb-4">
              <h3 class="text-xl font-bold text-gray-900">Data Calon Santri</h3>
              <p class="text-sm text-gray-500">Silahkan lengkapi data identitas pendaftar.</p>
            </div>
            <div class="space-y-4">
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                <div class="relative">
                  <User class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input v-model="formData.nama_lengkap" type="text" placeholder="Masukkan nama sesuai ijazah" class="form-input pl-10 w-full p-2.5 border rounded-lg" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Alamat Lengkap</label>
                <div class="relative">
                  <MapPin class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea v-model="formData.alamat" rows="3" placeholder="Jl. Contoh No. 123, Kota..." class="form-input pl-10 w-full p-2.5 border rounded-lg"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-6">
            <div class="border-b border-gray-100 pb-4">
              <h3 class="text-xl font-bold text-gray-900">Data Orang Tua / Wali</h3>
              <p class="text-sm text-gray-500">Informasi untuk kontak darurat.</p>
            </div>
            <div class="space-y-4">
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Nama Ayah / Ibu</label>
                <div class="relative">
                  <UsersIcon class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input v-model="formData.nama_orang_tua" type="text" placeholder="Nama wali murid" class="form-input pl-10 w-full p-2.5 border rounded-lg" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Nomor WhatsApp Orang Tua</label>
                <div class="relative">
                  <Phone class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input v-model="formData.nomor_orang_tua" type="tel" placeholder="08123456789" class="form-input pl-10 w-full p-2.5 border rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3" class="space-y-6">
            <div class="border-b border-gray-100 pb-4">
              <h3 class="text-xl font-bold text-gray-900">Kredensial Akun</h3>
              <p class="text-sm text-gray-500">Digunakan untuk login ke area santri setelah aktif.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2 space-y-1">
                <label class="text-sm font-semibold text-gray-700">Email</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input v-model="formData.email" type="email" placeholder="contoh@mail.com" class="form-input pl-10 w-full p-2.5 border rounded-lg" />
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Username</label>
                <input v-model="formData.username" type="text" placeholder="santri_2025" class="form-input w-full p-2.5 border rounded-lg" />
              </div>
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700">Password</label>
                <div class="relative">
                  <Lock class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input v-model="formData.password" type="password" placeholder="••••••••" class="form-input pl-10 w-full p-2.5 border rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 4" class="space-y-6">
            <div class="border-b border-gray-100 pb-4">
              <h3 class="text-xl font-bold text-gray-900">Upload Berkas & Pembayaran</h3>
              <p class="text-sm text-gray-500">Silahkan unggah berkas KK dan bukti transfer pendaftaran.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Kartu Keluarga (Foto/PDF)</label>
                <div class="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-500 transition cursor-pointer">
                  <input
                      type="file"
                      @change="e => handleFileUpload(e, 'file_kk')"
                      accept="image/*"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <Camera class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p class="text-xs text-gray-500">{{ formData.file_kk ? formData.file_kk.name : 'Pilih File KK' }}</p>                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Bukti Transfer (Rp 50.000)</label>
                <div class="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-500 transition cursor-pointer">
                  <input
                      type="file"
                      @change="e => handleFileUpload(e, 'file_bukti_bayar')"
                      accept="image/*"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <CreditCard class="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p class="text-xs text-gray-500">{{ formData.file_bukti_bayar ? formData.file_bukti_bayar.name : 'Pilih Foto Struk' }}</p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
              <Info class="w-5 h-5 text-blue-600 mt-0.5" />
              <div class="text-xs text-blue-800 space-y-1">
                <p class="font-bold">Informasi Rekening Pesantren:</p>
                <p>Transfer biaya pendaftaran sebesar <span class="font-bold">Rp 50.000</span> ke:</p>
                <p class="font-mono text-sm bg-white/50 px-2 py-1 rounded inline-block">BSI: 7123456789 a.n Pesantren Modern</p>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 5" class="space-y-6">
            <div class="text-center">
              <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-2" />
              <h3 class="text-xl font-bold text-gray-900">Konfirmasi Data</h3>
              <p class="text-sm text-gray-500">Periksa kembali data Anda sebelum mengirim.</p>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 space-y-4 text-sm border border-gray-200">
              <div class="grid grid-cols-2 border-b border-gray-100 pb-2">
                <span class="text-gray-500">Nama Santri</span>
                <span class="font-bold text-gray-900 uppercase text-right">{{ formData.nama_lengkap }}</span>
              </div>
              <div class="grid grid-cols-2 border-b border-gray-100 pb-2">
                <span class="text-gray-500">Username Akun</span>
                <span class="font-bold text-primary-600 text-right">{{ formData.username }}</span>
              </div>
              <div class="grid grid-cols-2 border-b border-gray-100 pb-2">
                <span class="text-gray-500">Berkas KK</span>
                <span class="text-green-600 font-bold text-right">{{ formData.file_kk ? 'Sudah Ada' : 'Belum Ada' }}</span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-500">Bukti Bayar</span>
                <span class="text-green-600 font-bold text-right">{{ formData.file_bukti_bayar ? 'Sudah Ada' : 'Belum Ada' }}</span>
              </div>
            </div>
          </div>

          <div class="mt-10 flex justify-between items-center border-t border-gray-100 pt-6">
            <button
                @click="prevStep"
                v-if="currentStep > 1"
                class="flex items-center gap-2 px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-50 rounded-xl transition"
            >
              <ChevronLeft class="w-5 h-5" /> Kembali
            </button>
            <div v-else></div>

            <button
                @click="nextStep"
                v-if="currentStep < 5"
                class="flex items-center gap-2 px-8 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-200 transition"
            >
              Lanjut <ChevronRight class="w-5 h-5" />
            </button>

            <button
                @click="handleSubmit"
                v-if="currentStep === 5"
                :disabled="formStore.isLoading"
                class="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 transition shadow-lg shadow-green-200"
            >
              <span v-if="!formStore.isLoading">Kirim Pendaftaran</span>
              <span v-else>Mengirim...</span>
              <Send v-if="!formStore.isLoading" class="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs text-gray-400">© 2025 SantriConnect Platform - PSB Modern</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>