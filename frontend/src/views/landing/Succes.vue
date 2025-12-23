<script setup>
import { CheckCircle, Home, ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
        <CheckCircle class="w-12 h-12" />
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Terkirim!</h1>
      <p class="text-gray-500 mb-8">
        Terima kasih telah mendaftar di SantriConnect. Data Anda sedang ditinjau oleh tim administrasi kami.
      </p>

      <div class="space-y-3">
        <button
            @click="router.push('/landing')"
            class="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2"
        >
          <Home class="w-4 h-4" /> Kembali ke Beranda
        </button>
        <p class="text-xs text-gray-400">Hubungi kami via WhatsApp jika ada pertanyaan.</p>
      </div>
    </div>
  </div>
</template>