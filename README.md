# 📚 Fitur Tambahan Sistem Pondok Pesantren

Dokumentasi ini menjelaskan beberapa fitur tambahan yang dikembangkan untuk meningkatkan keamanan, transparansi, dan kemudahan penggunaan dalam sistem pengelolaan pondok pesantren.

---

## 💳 1. Pembayaran dengan Payment Gateway (Wali Santri)

### 📌 Deskripsi

Fitur ini memungkinkan wali santri melakukan pembayaran secara online melalui sistem **Payment Gateway**. Pembayaran dapat dilakukan untuk berbagai kebutuhan seperti SPP, daftar ulang, dan biaya lainnya.

### ⚙️ Fitur Utama

* Pembayaran online (transfer bank, e-wallet, dll)
* Status pembayaran otomatis (pending, success, failed)
* Riwayat transaksi wali santri
* Notifikasi pembayaran berhasil/gagal

### 🔄 Alur Sistem

1. Wali santri memilih tagihan
2. Sistem generate invoice
3. Redirect ke payment gateway
4. Wali santri melakukan pembayaran
5. Sistem menerima callback dari gateway
6. Status pembayaran diperbarui otomatis

### 🧩 Contoh Endpoint (Backend)

```http
POST /api/payment/create
POST /api/payment/callback
GET  /api/payment/status/{id}
```

---

## 🗺️ 2. Sistem Review Map & Bangunan Pondok

### 📌 Deskripsi

Fitur ini memberikan gambaran visual lingkungan pondok pesantren melalui peta dan review bangunan, sehingga wali santri dan calon santri dapat melihat fasilitas yang tersedia.

### ⚙️ Fitur Utama

* Tampilan peta lokasi pondok
* Informasi gedung (asrama, kelas, masjid, dll)
* Review dan rating fasilitas
* Dokumentasi foto bangunan

### 🔄 Alur Sistem

1. Admin menambahkan data bangunan
2. Sistem menampilkan di peta
3. User dapat melihat detail dan review
4. User dapat memberikan rating/review

### 🧩 Contoh Struktur Data

```json
{
  "id": 1,
  "nama_bangunan": "Asrama Putra",
  "lokasi": "Lat, Long",
  "deskripsi": "Asrama untuk santri putra",
  "rating": 4.5
}
```

---

## 📍 3. Absensi Berbasis Lokasi (Hanya di Pondok)

### 📌 Deskripsi

Fitur ini memastikan bahwa absensi hanya dapat dilakukan ketika pengguna berada di area pondok pesantren menggunakan validasi lokasi (GPS).

### ⚙️ Fitur Utama

* Validasi lokasi berbasis GPS
* Radius area pondok (geofencing)
* Mencegah absensi dari luar lokasi
* Integrasi dengan jurnal guru

### 🔄 Alur Sistem

1. User membuka halaman absensi
2. Sistem mengambil lokasi GPS user
3. Sistem membandingkan dengan lokasi pondok
4. Jika dalam radius → absensi berhasil
5. Jika di luar → absensi ditolak

### 🧩 Contoh Logic (Frontend - Vue.js)

```javascript
navigator.geolocation.getCurrentPosition((position) => {
  const userLat = position.coords.latitude;
  const userLng = position.coords.longitude;

  const pondokLat = -7.12345;
  const pondokLng = 111.12345;
  const radius = 100; // meter

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  const distance = getDistance(userLat, userLng, pondokLat, pondokLng);

  if (distance <= radius) {
    console.log("Absensi berhasil");
  } else {
    console.log("Anda berada di luar area pondok");
  }
});
```

---

## 🔐 Keamanan Sistem

* Validasi token (JWT)
* Enkripsi data sensitif
* Validasi callback payment gateway
* Proteksi manipulasi lokasi (opsional: verifikasi IP / device)

---

## 🚀 Teknologi yang Digunakan

* Frontend: Vue.js + Tailwind CSS
* Backend: PHP Native / REST API
* Database: MySQL (phpMyAdmin)
* Integrasi: Payment Gateway API, Google Maps API, Geolocation API

---

## 📌 Catatan

* Pastikan API Payment Gateway sudah terverifikasi (sandbox/production)
* Gunakan HTTPS untuk keamanan transaksi
* Validasi lokasi sebaiknya dikombinasikan dengan metode lain untuk keamanan lebih tinggi

---
