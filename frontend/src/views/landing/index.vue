<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  CheckCircle, Users, BookOpen, Calendar, Church,
  Bed, SquareUser, Activity, Stethoscope, GraduationCap, CalendarDays, Moon, ClipboardList
} from 'lucide-vue-next'
import Navbar from "../../components/Navbar.vue";
import Fasilitas1 from "../../assets/img/fasilitas/Fasilitas1.jpeg"
import Fasilitas2 from "../../assets/img/fasilitas/Fasilitas2.jpeg"
import Fasilitas3 from "../../assets/img/fasilitas/Fasilitas3.jpeg"
import Fasilitas4 from "../../assets/img/fasilitas/Fasilitas4.jpeg"
import Fasilitas5 from "../../assets/img/fasilitas/Fasilitas5.jpeg"
import Fasilitas6 from "../../assets/img/fasilitas/Fsilitas6.jpeg"

const isContentReady = ref(false)

const router = useRouter()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeDropdown = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
onMounted(() => {
  setTimeout(() => {
    isContentReady.value = true
  }, 300)
})

const contentClass = (delay) => {
  return isContentReady.value
      ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-[${delay}ms]`
      : 'opacity-0 translate-y-[20px]'
}

const facilities = [
  {
    id: 1,
    name: 'Masjid Agung',
    description: 'Pusat ibadah dan kegiatan keagamaan, mampu menampung ribuan santri.',
    icon: Church,
    image: Fasilitas4,
    bgColor: 'bg-blue-600'
  },
  {
    id: 2,
    name: 'Asrama Santri',
    description: 'Tempat tinggal yang nyaman dan bersih, dilengkapi dengan fasilitas belajar.',
    icon: Bed,
    image: Fasilitas1,
    bgColor: 'bg-primary-600'
  },
  {
    id: 3,
    name: 'Perpustakaan Digital',
    description: 'Koleksi buku-buku Islami dan umum, serta akses ke sumber daya digital.',
    icon: BookOpen,
    image: Fasilitas2,
    bgColor: 'bg-yellow-600'
  },
  {
    id: 4,
    name: 'Ruang Kelas Modern',
    description: 'Kelas yang nyaman dengan proyektor dan papan tulis interaktif.',
    icon: SquareUser,
    image: Fasilitas5,
    bgColor: 'bg-red-600'
  },
  {
    id: 5,
    name: 'Lapangan Olahraga',
    description: 'Fasilitas untuk futsal, basket, dan kegiatan fisik lainnya.',
    icon: Activity,
    image: Fasilitas6,
    bgColor: 'bg-indigo-600'
  },
  {
    id: 6,
    name: 'Klinik Kesehatan',
    description: 'Layanan kesehatan dan P3K untuk menjamin kesehatan para santri.',
    icon: Stethoscope,
    image: Fasilitas3,
    bgColor: 'bg-pink-600'
  },
];


const programs = [
  {
    title: 'Tahfidz Al-Qur’an',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt, esse hic magni ratione sapiente',
    icon: BookOpen,
    color: 'bg-emerald-600'
  },
  {
    title: 'Pendidikan Diniyah',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt, esse hic magni ratione sapiente',
    icon: GraduationCap,
    color: 'bg-blue-600'
  },
  {
    title: 'Kurikulum Formal',
    desc: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt, esse hic magni ratione sapiente',
    icon: ClipboardList,
    color: 'bg-indigo-600'
  },
  {
    title: 'Pembinaan Karakter',
    desc: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt, esse hic magni ratione sapiente.\n',
    icon: Users,
    color: 'bg-orange-600'
  },
  {
    title: 'Kegiatan Keagamaan',
    desc: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt, esse hic magni ratione sapiente.\n',
    icon: Moon,
    color: 'bg-purple-600'
  },
  {
    title: 'Program Ekstrakurikuler',
    desc: 'Pengembangan minat dan bakat santri di bidang seni, olahraga, dan keterampilan.',
    icon: CalendarDays,
    color: 'bg-rose-600'
  }
]

</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />

    <!--  Hero  -->
    <section id="home" class="pt-20 md:pt-30 md:pb-32 px-4 overflow-hidden">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div class="md:w-1/2 text-center md:text-left"
               v-motion
               :initial="{ opacity: 0, x: -50 }"
               :enter="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          >
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Halaman ini berisi tentang Profile <span class="text-primary-600">Pondok Pesantren</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur delectus error, expedita illum minima natus nisi voluptatibus? Animi beatae debitis dolores et eum impedit magnam nam officiis possimus voluptatibus?
            </p>
            <div class="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <router-link to="/form" class="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30 flex items-center gap-2 group">
                Daftar Sekarang
              </router-link>
              <button class="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                Hubungi Kami
              </button>
            </div>
          </div>

          <div class="md:w-1/2 relative"
               v-motion
               :initial="{ opacity: 0, x: 50 }"
               :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
          >
            <div class="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div class="bg-gray-50 rounded-xl overflow-hidden aspect-video flex items-center justify-center relative">
                <!-- Abstract UI Representation -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-white p-6 flex flex-col gap-4">
                  <div class="flex gap-4">
                    <div class="w-1/3 h-32 bg-white rounded-lg shadow-sm p-3 space-y-2">
                      <div class="w-8 h-8 bg-primary-100 rounded-full"></div>
                      <div class="w-full h-2 bg-gray-100 rounded"></div>
                      <div class="w-2/3 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div class="w-1/3 h-32 bg-white rounded-lg shadow-sm p-3 space-y-2">
                      <div class="w-8 h-8 bg-blue-100 rounded-full"></div>
                      <div class="w-full h-2 bg-gray-100 rounded"></div>
                      <div class="w-2/3 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div class="w-1/3 h-32 bg-white rounded-lg shadow-sm p-3 space-y-2">
                      <div class="w-8 h-8 bg-purple-100 rounded-full"></div>
                      <div class="w-full h-2 bg-gray-100 rounded"></div>
                      <div class="w-2/3 h-2 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div class="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div class="flex justify-between">
                      <div class="w-1/3 h-4 bg-gray-100 rounded"></div>
                      <div class="w-1/4 h-4 bg-gray-100 rounded"></div>
                    </div>
                    <div class="w-full h-px bg-gray-100"></div>
                    <div class="space-y-2">
                      <div class="w-full h-8 bg-gray-50 rounded flex items-center px-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div class="w-1/2 h-2 bg-gray-200 rounded"></div>
                      </div>
                      <div class="w-full h-8 bg-gray-50 rounded flex items-center px-3">
                        <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div class="w-1/2 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Decorative blobs -->
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-primary-200/40 rounded-full blur-3xl -z-10"></div>
            <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tentang Kami -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">

        <!-- Header -->
        <div
            class="text-center max-w-2xl mx-auto mb-20"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Profil Pesantren
          </h2>
          <p class="text-gray-600 text-lg">
            Mengenal lebih dekat lingkungan, visi, dan aktivitas pondok pesantren
          </p>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">

          <!-- Image -->
          <div
              class="relative"
              v-motion
              :initial="{ opacity: 0, x: 40 }"
              :visible="{ opacity: 1, x: 0 }"
          >
            <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                alt="Pondok Pesantren"
                class="rounded-2xl shadow-lg w-full h-[350px] object-cover"
            />
          </div>

          <!-- Text -->
          <div
              v-motion
              :initial="{ opacity: 0, x: -40 }"
              :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-2xl sm:text-3xl font-bold text-primary-800 mb-6 border-b-2 border-primary-200 pb-2">
              Sejarah & Visi Misi
            </h3>

            <p class="text-gray-700 leading-relaxed mb-8 text-base sm:text-lg">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci est et facere illo, ipsa sapiente. Aliquid minima numquam quaerat quasi!
            </p>

            <!-- Visi & Misi -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <!-- Visi -->
              <div
                  :class="contentClass(700)"
                  class="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600 shadow"
              >
                <h4 class="font-extrabold text-xl text-primary-800 mb-2 flex items-center">
                  <font-awesome-icon icon="eye" class="mr-3 text-primary-600" />
                  Visi
                </h4>
                <p class="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae facere itaque minus odio quaerat qui.
                </p>
              </div>

              <!-- Misi -->
              <div
                  :class="contentClass(900)"
                  class="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600 shadow"
              >
                <h4 class="font-extrabold text-xl text-primary-800 mb-2 flex items-center">
                  <font-awesome-icon icon="bullseye" class="mr-3 text-primary-600" />
                  Misi
                </h4>
                <p class="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur error provident quisquam suscipit, ullam voluptatem.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fasilitas   -->
    <section id="fasilitas" class="py-10 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16"
             v-motion
             :initial="{ opacity: 0, y: 30 }"
             :visible="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fasilitas Pesantren</h2>
          <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, rerum.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="facility in facilities"
              :key="facility.id"
              class="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-xl"
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible="{ opacity: 1, scale: 1 }"
              :delay="facility.id * 100"
          >
            <div class="h-52 overflow-hidden">
              <img
                  :src="facility.image"
                  :alt="'Gambar ' + facility.name"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
              >
            </div>

            <div class="p-6">
              <div class="flex items-start mb-4">
                <div
                    class="w-12 h-12 min-w-[48px] rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110"
                    :class="facility.bgColor"
                >
                  <!-- Menggunakan Lucide ikon -->
                  <component
                      :is="facility.icon"
                      class="w-6 h-6 text-white"
                  />
                </div>
                <h3 class="text-xl font-bold text-primary-800 ml-4 leading-snug">{{ facility.name }}</h3>
              </div>
              <p class="text-gray-700 text-base border-t pt-4 mt-2">{{ facility.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Program   -->
    <section id="program" class="py-14 bg-gray-100">
      <div class="container mx-auto px-4">

        <!-- Header -->
        <div
            class="text-center max-w-2xl mx-auto mb-16"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Program Unggulan Pesantren
          </h2>
          <p class="text-gray-600 text-lg">
            Program pendidikan terpadu untuk membentuk santri berakhlak, berilmu, dan mandiri
          </p>
        </div>

        <!-- Program Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <div
              v-for="(program, index) in programs"
              :key="index"
              class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100
               hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { delay: index * 120 } }"
          >
            <!-- Icon -->
            <div
                :class="[
            'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
            'transition-transform group-hover:scale-110',
            program.color
          ]"
            >
              <component :is="program.icon" class="w-7 h-7 text-white" />
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ program.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ program.desc }}
            </p>
          </div>
        </div>

      </div>
    </section>

    <!--  Kontak  -->
    <section id="contact" class="py-20 bg-gray-50 overflow-hidden">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16"
             v-motion
             :initial="{ opacity: 0, y: 30 }"
             :visible="{ opacity: 1, y: 0 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p class="text-lg text-gray-600">
            Silakan hubungi kami untuk informasi pendaftaran, program pendidikan, atau pertanyaan lainnya.
          </p>
        </div>

        <!-- Grid Container -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Kolom 1: Informasi Kontak -->
          <div
              class="lg:col-span-1"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visible="{ opacity: 1, x: 0 }"
              :delay="100"
          >
            <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>

              <div class="space-y-6">
                <!-- Alamat -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition">
                  <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin class="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Alamat</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      Jl. Pendidikan No. 12, Kecamatan Contoh, Kabupaten Contoh, Indonesia
                    </p>
                  </div>
                </div>

                <!-- Telepon/WhatsApp -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Telepon / WhatsApp</h4>
                    <p class="text-gray-600 text-sm">+62 812-3456-7890</p>
                    <a href="https://wa.me/6281234567890"
                       target="_blank"
                       class="inline-block mt-1 text-green-600 text-sm font-medium hover:underline">
                      Chat via WhatsApp →
                    </a>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                    <p class="text-gray-600 text-sm">info@pondokpesantren.ac.id</p>
                    <a href="mailto:info@pondokpesantren.ac.id"
                       class="inline-block mt-1 text-blue-600 text-sm font-medium hover:underline">
                      Kirim Email →
                    </a>
                  </div>
                </div>

                <!-- Jam Operasional -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition">
                  <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock class="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Jam Operasional</h4>
                    <p class="text-gray-600 text-sm">
                      Senin – Jumat: 08.00 – 16.00 WIB<br>
                      Sabtu: 08.00 – 12.00 WIB
                    </p>
                  </div>
                </div>
              </div>

              <!-- Sosial Media -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h4 class="font-semibold text-gray-900 mb-4">Ikuti Kami</h4>
                <div class="grid grid-cols-2 gap-3">
                  <a href="#" class="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-primary-50 transition group">
                    <Facebook class="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
                    <span class="text-sm font-medium text-gray-700 group-hover:text-primary-700">Facebook</span>
                  </a>
                  <a href="#" class="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-pink-50 transition group">
                    <Instagram class="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
                    <span class="text-sm font-medium text-gray-700 group-hover:text-pink-700">Instagram</span>
                  </a>
                  <a href="#" class="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-green-50 transition group">
                    <MessageCircle class="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                    <span class="text-sm font-medium text-gray-700 group-hover:text-green-700">Telegram</span>
                  </a>
                  <a href="#" class="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-red-50 transition group">
                    <Youtube class="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                    <span class="text-sm font-medium text-gray-700 group-hover:text-red-700">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Kolom 2 & 3: Maps & Form -->
          <div
              class="lg:col-span-2"
              v-motion
              :initial="{ opacity: 0, x: 30 }"
              :visible="{ opacity: 1, x: 0 }"
              :delay="200"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

              <!-- Maps -->
              <div class="h-full">
                <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full">
                  <div class="p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Lokasi Kami</h3>
                    <p class="text-gray-600 mb-4 text-sm">
                      Kunjungi langsung pondok pesantren kami untuk informasi lebih lanjut.
                    </p>
                  </div>

                  <!-- Google Maps Embed -->
                  <div class="h-64 lg:h-80 relative">
                    <!-- Placeholder Maps (Ganti dengan Google Maps embed) -->
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div class="text-center">
                        <MapPin class="w-12 h-12 text-primary-600 mx-auto mb-3" />
                        <p class="text-gray-700 font-medium">Pondok Pesantren Islam</p>
                        <p class="text-gray-500 text-sm mt-1">Jl. Pendidikan No. 12</p>
                      </div>
                    </div>

                    <!-- Tombol Arah -->
                    <a href="https://maps.app.goo.gl/SiNCBBMCjJQ47p3MA"
                       target="_blank"
                       class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition">
                      <Navigation class="w-4 h-4 text-primary-600" />
                      <span class="text-sm font-medium text-gray-700">Dapatkan Arah</span>
                    </a>
                  </div>

                  <div class="p-6 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-semibold text-gray-900 text-sm">Akses Mudah</h4>
                        <p class="text-gray-500 text-xs">15 menit dari pusat kota</p>
                      </div>
                      <div class="text-right">
                        <h4 class="font-semibold text-gray-900 text-sm">Parkir Luas</h4>
                        <p class="text-gray-500 text-xs">Kapasitas 100+ kendaraan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Kontak -->
              <div class="h-full">
                <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
                  <h3 class="text-2xl font-bold text-gray-900 mb-4">Kirim Pesan</h3>
                  <p class="text-gray-600 mb-6 text-sm">
                    Isi formulir di bawah ini dan kami akan menghubungi Anda dalam 1x24 jam.
                  </p>

                  <form class="space-y-4">
                    <!-- Nama -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap <span class="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          required
                          placeholder="Masukkan nama lengkap"
                          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                      />
                    </div>

                    <!-- Email & Telepon Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          Email <span class="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="nama@email.com"
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                          WhatsApp <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">+62</div>
                          <input
                              type="tel"
                              required
                              placeholder="812-3456-7890"
                              class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Subjek -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Subjek
                      </label>
                      <select class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm bg-white">
                        <option value="">Pilih subjek pesan</option>
                        <option value="pendaftaran">Pendaftaran Santri Baru</option>
                        <option value="informasi">Informasi Program</option>
                        <option value="kerja-sama">Kerja Sama</option>
                        <option value="kunjungan">Permohonan Kunjungan</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>

                    <!-- Pesan -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Pesan <span class="text-red-500">*</span>
                      </label>
                      <textarea
                          rows="4"
                          required
                          placeholder="Tuliskan pesan Anda secara detail..."
                          class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm resize-none"
                      ></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="w-full py-3.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition duration-300 mt-2"
                    >
                      Kirim Pesan Sekarang
                    </button>

                    <p class="text-xs text-gray-500 text-center mt-4">
                      Dengan mengirimkan formulir, Anda menyetujui
                      <a href="#" class="text-primary-600 hover:underline">kebijakan privasi</a> kami.
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 font-bold text-xl mb-4">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              SantriConnect
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Platform manajemen pesantren terintegrasi untuk era digital.
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-4">Fitur</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-primary-400 transition-colors">PSB Online</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Absensi Digital</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Keuangan</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">Perusahaan</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-primary-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Karir</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">Hubungi Kami</h4>
            <p class="text-sm text-gray-400 mb-2">support@santriconnect.id</p>
            <p class="text-sm text-gray-400">+62 812 3456 7890</p>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; 2025 SantriConnect. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
