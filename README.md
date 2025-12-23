Install dengan npm install

lalu run dengan npm run dev

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 23 Des 2025 pada 16.54
-- Versi server: 8.4.3
-- Versi PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `santri_connect`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensi`
--

CREATE TABLE `absensi` (
  `id` int NOT NULL,
  `jurnal_id` int NOT NULL,
  `santri_id` int NOT NULL,
  `status` enum('hadir','izin','sakit','alpha') NOT NULL DEFAULT 'hadir',
  `keterangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `absensi`
--

INSERT INTO `absensi` (`id`, `jurnal_id`, `santri_id`, `status`, `keterangan`) VALUES
(1, 1, 2, 'hadir', NULL),
(2, 1, 1, 'hadir', NULL),
(3, 2, 2, 'hadir', NULL),
(4, 2, 1, 'hadir', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `guru`
--

CREATE TABLE `guru` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `nip` varchar(20) DEFAULT NULL,
  `nama_guru` varchar(100) NOT NULL,
  `spesialisasi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `guru`
--

INSERT INTO `guru` (`id`, `user_id`, `nip`, `nama_guru`, `spesialisasi`) VALUES
(1, 2, '123456', 'Ustadz Zakky', 'Fiqih');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurnal`
--

CREATE TABLE `jurnal` (
  `id` int NOT NULL,
  `tanggal` date NOT NULL,
  `mapel_id` int NOT NULL,
  `kelas` enum('A','B') NOT NULL,
  `materi` varchar(255) NOT NULL,
  `keterangan` text,
  `guru_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `jurnal`
--

INSERT INTO `jurnal` (`id`, `tanggal`, `mapel_id`, `kelas`, `materi`, `keterangan`, `guru_id`, `created_at`) VALUES
(1, '2025-12-23', 1, 'A', 'Wudhu', '-', 1, '2025-12-23 16:41:22'),
(2, '2025-12-23', 1, 'A', 'Wudhu', '-', 1, '2025-12-23 16:43:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mapel`
--

CREATE TABLE `mapel` (
  `id` int NOT NULL,
  `nama_mapel` varchar(100) NOT NULL,
  `kode_mapel` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `mapel`
--

INSERT INTO `mapel` (`id`, `nama_mapel`, `kode_mapel`) VALUES
(1, 'Fiqih', 'FIQ'),
(2, 'Nahwu', 'NHW'),
(3, 'Tahfidz', 'TFZ');

-- --------------------------------------------------------

--
-- Struktur dari tabel `psb_pendaftar`
--

CREATE TABLE `psb_pendaftar` (
  `id` int NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `nama_orang_tua` varchar(100) NOT NULL,
  `nomor_orang_tua` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status_verifikasi` enum('pending','verified','rejected') DEFAULT 'pending',
  `tanggal_daftar` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `psb_pendaftar`
--

INSERT INTO `psb_pendaftar` (`id`, `nama_lengkap`, `alamat`, `nama_orang_tua`, `nomor_orang_tua`, `username`, `email`, `password`, `status_verifikasi`, `tanggal_daftar`) VALUES
(1, 'Abidzar Dzakwan Sahudi', 'Surabaya', 'Ibu', '089601261250', 'kaizer', 'abidzardzakwan36@gmail.com', '$2y$10$3onM0EDkwCFczdbOmE1njuEfLLBTfCbGoA0.Al1LGijYm2WpiVF9a', 'pending', '2025-12-23 15:08:57'),
(2, 'Albany Raffa Assyukura', 'Bojonegoro', 'Ayah', '083111280866', 'albany', 'albany@gmail.com', '$2y$10$gb/kKaK0kiY5/N15SDT7q.2suPvQhh1goTXv/4CG55Ji4pwHf8Wl.', 'verified', '2025-12-23 16:03:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `santri`
--

CREATE TABLE `santri` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `nis` varchar(20) DEFAULT NULL,
  `nama_santri` varchar(100) NOT NULL,
  `nama_orang_tua` varchar(100) DEFAULT NULL,
  `nomor_orang_tua` varchar(20) DEFAULT NULL,
  `kelas` varchar(20) DEFAULT NULL,
  `alamat` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `santri`
--

INSERT INTO `santri` (`id`, `user_id`, `nis`, `nama_santri`, `nama_orang_tua`, `nomor_orang_tua`, `kelas`, `alamat`) VALUES
(1, 3, '998877', 'Moh. Faiz Haikal', 'ayah', '0895336414713', 'A', 'Surabaya'),
(2, 4, NULL, 'Albany Raffa Assyukura', 'Ayah', '083111280866', 'A', 'Bojonegoro');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','guru','user') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'superadmin', 'superadmin@gmail.com', '$2y$10$MMOBnJUo3CvCJ2Y34ZnyvukFG2znKSyD.eA9057.7vzKItwevbDse', 'admin', '2025-12-23 09:17:06'),
(2, 'ust Zakky', 'Zakky@gmail.com', '$2y$10$m5/AHWa2w0xxirSTbMyzhOhzbygF69xOObBrAChS17sOBUY2ENjta', 'guru', '2025-12-23 09:17:06'),
(3, 'Haikal', 'haikal@gmail.com', '$2y$10$cihbrKjdoY66BZSgkvY3QeKFMMc5KQ5xcZliw8IV/0KnqFnhppqEa', 'user', '2025-12-23 09:17:06'),
(4, 'albany', 'albany@gmail.com', '$2y$10$gb/kKaK0kiY5/N15SDT7q.2suPvQhh1goTXv/4CG55Ji4pwHf8Wl.', 'user', '2025-12-23 16:13:13');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jurnal_id` (`jurnal_id`),
  ADD KEY `santri_id` (`santri_id`);

--
-- Indeks untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nip` (`nip`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indeks untuk tabel `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_mapel` (`kode_mapel`);

--
-- Indeks untuk tabel `psb_pendaftar`
--
ALTER TABLE `psb_pendaftar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `santri`
--
ALTER TABLE `santri`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nis` (`nis`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `psb_pendaftar`
--
ALTER TABLE `psb_pendaftar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `santri`
--
ALTER TABLE `santri`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD CONSTRAINT `absensi_ibfk_1` FOREIGN KEY (`jurnal_id`) REFERENCES `jurnal` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `absensi_ibfk_2` FOREIGN KEY (`santri_id`) REFERENCES `santri` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `guru`
--
ALTER TABLE `guru`
  ADD CONSTRAINT `guru_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jurnal`
--
ALTER TABLE `jurnal`
  ADD CONSTRAINT `jurnal_ibfk_1` FOREIGN KEY (`mapel_id`) REFERENCES `mapel` (`id`);

--
-- Ketidakleluasaan untuk tabel `santri`
--
ALTER TABLE `santri`
  ADD CONSTRAINT `santri_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
