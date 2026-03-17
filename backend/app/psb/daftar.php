<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../vendor/autoload.php';
require_once '../config/Database.php';
require_once '../../src/Models/Pendaftar.php';

use App\Models\Pendaftar;

$dbInstance = new Database();
$db = $dbInstance->getConnection();

if (!$db) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal."]);
    exit;
}

$pendaftar = new Pendaftar($db);

// Gunakan isset untuk mendeteksi kiriman FormData
if (isset($_POST['username']) && isset($_POST['nama_lengkap'])) {
    try {
        // Path Folder Upload
        $target_dir = "../../uploads/";
        if (!is_dir($target_dir . "kk")) mkdir($target_dir . "kk", 0777, true);
        if (!is_dir($target_dir . "bukti_bayar")) mkdir($target_dir . "bukti_bayar", 0777, true);

        // --- Proses Upload KK ---
        $file_kk_name = null;
        if (!empty($_FILES['file_kk']['name'])) {
            $ext_kk = pathinfo($_FILES['file_kk']['name'], PATHINFO_EXTENSION);
            $file_kk_name = "KK_" . date('Ymd_His') . "_" . uniqid() . "." . $ext_kk;
            move_uploaded_file($_FILES['file_kk']['tmp_name'], $target_dir . "kk/" . $file_kk_name);
        }

        // --- Proses Upload Bukti Bayar ---
        $file_bukti_name = null;
        if (!empty($_FILES['file_bukti_bayar']['name'])) {
            $ext_bukti = pathinfo($_FILES['file_bukti_bayar']['name'], PATHINFO_EXTENSION);
            $file_bukti_name = "PAY_" . date('Ymd_His') . "_" . uniqid() . "." . $ext_bukti;
            move_uploaded_file($_FILES['file_bukti_bayar']['tmp_name'], $target_dir . "bukti_bayar/" . $file_bukti_name);
        }

        // --- Mapping Data (Gunakan Null Coalescing ?? untuk menghindari undefined) ---
        $data = new stdClass();
        $data->nama_lengkap    = $_POST['nama_lengkap'] ?? '';
        $data->alamat          = $_POST['alamat'] ?? '';
        $data->nama_orang_tua  = $_POST['nama_orang_tua'] ?? '';
        $data->nomor_orang_tua = $_POST['nomor_orang_tua'] ?? '';
        $data->username        = $_POST['username'] ?? '';
        $data->email           = $_POST['email'] ?? '';
        $data->password        = $_POST['password'] ?? '';
        $data->file_kk         = $file_kk_name;
        $data->file_bukti_bayar = $file_bukti_name;

        if ($pendaftar->create($data)) {
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Pendaftaran berhasil dikirim! Mohon tunggu verifikasi admin."
            ]);
        } else {
            throw new Exception("Gagal menyimpan ke database. Cek apakah username/email sudah digunakan.");
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap atau format salah."]);
}