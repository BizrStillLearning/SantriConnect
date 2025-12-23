<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Penanganan Preflight Request (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../../src/Models/Pendaftar.php';

use App\Models\Pendaftar;

// Inisialisasi Database
$dbInstance = new Database();
$db = $dbInstance->getConnection();

if (!$db) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal."]);
    exit;
}

$pendaftar = new Pendaftar($db);

// Ambil input JSON
$data = json_decode(file_get_contents("php://input"));


if (
    !empty($data->nama_lengkap) &&
    !empty($data->username) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    if ($pendaftar->create($data)) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Pendaftaran berhasil dikirim! Mohon tunggu verifikasi admin."
        ]);
    } else {
        http_response_code(503);
        echo json_encode(["status" => "error", "message" => "Gagal menyimpan pendaftaran (Mungkin username/email sudah ada)."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap. Semua field wajib diisi."]);
}