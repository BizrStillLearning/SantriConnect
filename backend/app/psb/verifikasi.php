<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/Database.php';
require_once '../../src/Services/PSBService.php';
require_once '../../src/Services/WhatsappService.php';

use App\Services\PSBService;
use App\Services\WhatsappService;

$db = (new Database())->getConnection();
$psbService = new PSBService($db);
$wa = new WhatsappService();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    // Panggil Service untuk olah data
    $result = $psbService->verifikasiDanPindahkan($data->id);

    if ($result['status']) {
        $pendaftar = $result['data'];
        $nisBaru = $result['nis'];

        $namaUpper = strtoupper($pendaftar['nama_lengkap']);
        $linkMaps = "https://maps.app.goo.gl/2p3E89dPeaQ1ni4h6";
        $passInfo = "Sesuai yang dibuat saat mendaftar";

        $pesanWA = "✅ *VERIFIKASI BERHASIL*\n\n" .
            "Pendaftaran Ananda *{$namaUpper}* telah disetujui.\n\n" .
            "🆔 NIS: *{$nisBaru}*\n" .
            "👤 Username: *{$pendaftar['username']}*\n" .
            "🔑 Password: *{$passInfo}*\n\n" .
            "----------------------------------\n" .
            "📝 *INFO DAFTAR ULANG*\n" .
            "1. Silakan datang ke kantor pesantren pada jam kerja (08.00 - 15.00).\n" .
            "2. Membawa fotokopi KK & Akta Kelahiran.\n" .
            "3. Melakukan pelunasan biaya administrasi awal.\n\n" .
            "📍 *LOKASI PESANTREN*\n" .
            "{$linkMaps}\n" .
            "----------------------------------\n\n" .
            "Silakan login ke Dashboard Santri untuk memantau absensi dan perkembangan Ananda.\n" .
            "Terima kasih.";

        // Kirim WA
        $waResponse = $wa->kirimPesan($pendaftar['nomor_orang_tua'], $pesanWA);

        echo json_encode([
            "status" => "success",
            "message" => "Santri berhasil diverifikasi dengan NIS: $nisBaru",
            "nis" => $nisBaru,
            "wa_status" => json_decode($waResponse)
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $result['message']]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID Pendaftar tidak ditemukan."]);
}