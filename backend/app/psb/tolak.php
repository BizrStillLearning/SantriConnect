<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); exit();
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

if (!empty($data->id) && !empty($data->alasan)) {
    // Panggil Service
    $result = $psbService->tolakPendaftaran($data->id, $data->alasan);

    if ($result['status']) {
        $p = $result['data'];

        // Kirim Notifikasi Penolakan via WA
        $pesan = "❌ *PENDAFTARAN DITOLAK*\n\n" .
            "Mohon maaf, pendaftaran Ananda *{$p['nama_lengkap']}* belum dapat kami setujui.\n\n" .
            "*Alasan:* {$data->alasan}\n\n" .
            "Silakan lakukan pendaftaran ulang dengan data/berkas yang benar. Terima kasih.";

        $waResponse = $wa->kirimPesan($p['nomor_orang_tua'], $pesan);

        echo json_encode([
            "status" => "success",
            "message" => "Pendaftaran ditolak dan data dihapus.",
            "wa_status" => json_decode($waResponse)
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $result['message']]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID atau Alasan tidak boleh kosong."]);
}