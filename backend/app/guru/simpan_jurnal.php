<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");
require_once '../config/Database.php';
require_once '../../src/Services/WhatsappService.php';

use App\Services\WhatsappService;

$db = (new Database())->getConnection();
$wa = new WhatsappService();
$input = file_get_contents("php://input");
$data = json_decode($input);
if (!empty($data->absensi) && !empty($data->mapel_id)) {
    try {
        $db->beginTransaction();

        // 1. Ambil Nama Mapel untuk keperluan pesan WA
        $qMapel = "SELECT nama_mapel FROM mapel WHERE id = ?";
        $stmtMapel = $db->prepare($qMapel);
        $stmtMapel->execute([$data->mapel_id]);
        $mapel = $stmtMapel->fetch(PDO::FETCH_ASSOC);
        $namaMapel = $mapel ? $mapel['nama_mapel'] : 'Mata Pelajaran';

        // 2. Simpan ke tabel Jurnal
        $qJurnal = "INSERT INTO jurnal (tanggal, mapel_id, kelas, materi, keterangan, guru_id) VALUES (?, ?, ?, ?, ?, ?)";
        $stmtJurnal = $db->prepare($qJurnal);
        $stmtJurnal->execute([
            $data->tanggal,
            $data->mapel_id,
            $data->kelas,
            $data->materi,
            $data->keterangan,
            $data->guru_id
        ]);

        $jurnalId = $db->lastInsertId();

        // 3. Simpan ke tabel Absensi & Kirim WA
        $qAbsen = "INSERT INTO absensi (jurnal_id, santri_id, status) VALUES (?, ?, ?)";
        $stmtAbsen = $db->prepare($qAbsen);

        // Query untuk ambil data orang tua santri
        $qSantri = "SELECT nama_santri, nama_orang_tua, nomor_orang_tua FROM santri WHERE id = ?";
        $stmtSantri = $db->prepare($qSantri);

        foreach ($data->absensi as $absen) {
            // Simpan ke database
            $stmtAbsen->execute([
                $jurnalId,
                $absen->santri_id,
                $absen->status
            ]);

            // Ambil detail santri untuk kirim WA
            $stmtSantri->execute([$absen->santri_id]);
            $s = $stmtSantri->fetch(PDO::FETCH_ASSOC);

            if ($s && !empty($s['nomor_orang_tua'])) {
                // Tentukan label status dan emoji
                $statusEmoji = '✅';
                $statusLabel = strtoupper($absen->status);

                if($absen->status == 'izin') $statusEmoji = '✉️';
                if($absen->status == 'sakit') $statusEmoji = '🤒';
                if($absen->status == 'alpha') $statusEmoji = '❌';

                // Susun Pesan WA
                $pesan = "{$statusEmoji} *LAPORAN KEHADIRAN SANTRI*\n\n" .
                    "Assalamu'alaikum Wr. Wb.\n" .
                    "Bapak/Ibu *{$s['nama_orang_tua']}*,\n\n" .
                    "Menginfokan kehadiran Ananda:\n" .
                    "Nama: *{$s['nama_santri']}*\n" .
                    "Kelas: *{$data->kelas}*\n" .
                    "Mapel: *{$namaMapel}*\n" .
                    "Status: *{$statusLabel}*\n" .
                    "Tanggal: " . date('d-m-Y', strtotime($data->tanggal)) . "\n\n" .
                    "Materi Hari Ini:\n_{$data->materi}_\n\n" .
                    "Demikian informasi ini kami sampaikan. Syukron.";

                // Kirim pesan via service
                $wa->kirimPesan($s['nomor_orang_tua'], $pesan);
            }
        }

        $db->commit();
        echo json_encode(["status" => "success", "message" => "Jurnal & Absensi berhasil disimpan serta notifikasi WA terkirim!"]);

    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
}